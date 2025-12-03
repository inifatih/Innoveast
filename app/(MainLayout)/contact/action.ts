"use server";

import { createClient } from "@/lib/supabase/server";
import nodemailer from "nodemailer";
import { z } from "zod";

// Schema Input
const contactSchema = z.object({
  nama_lengkap: z.string().min(2, "Nama lengkap dibutuhkan"),
  asal_organisasi: z.string().optional(),
  email: z.string().email("Alamat email dibutuhkan"),
  telepon: z.string().min(5, "Nomor telepon dibutuhkan"),
  subjek: z.string().min(2, "Subjek dibutuhkan"),
  pesan: z.string().min(10, "Pesan dibutuhkan"),
});

export async function messagePending(values: unknown) {
  const supabase = await createClient();

  // Validasi input
  const parsed = contactSchema.safeParse(values);
  if (!parsed.success) {
    return {
      success: false,
      message: "Data tidak valid",
      errors: parsed.error.flatten(),
    };
  }

  const { email, nama_lengkap, asal_organisasi, telepon, subjek, pesan } = parsed.data;

  // 1️⃣ Cek apakah email sudah terdaftar di auth.users
  const { data: authUser } = await supabase.auth.admin.listUsers();

  const existInAuth = authUser.users.find((u) => u.email === email);

  if (existInAuth) {
    return {
      success: false,
      message: "Email telah terdaftar.",
    };
  }

  // 2️⃣ Cek apakah sudah ada pending sebelumnya
  const { data: existingPending } = await supabase
    .from("Messages")
    .select("id")
    .eq("email", email)
    .maybeSingle();

  if (existingPending) {
    return {
      success: false,
      message: "Email sudah menunggu persetujuan admin.",
    };
  }

  // 3️⃣ Insert ke Messages
  const { error: insertError } = await supabase.from("Messages").insert({
    email,
    nama_lengkap,
    asal_organisasi,
    telepon,
    subjek,
    pesan,
  });

  if (insertError) {
    console.error("Insert Error:", insertError);
    return {
      success: false,
      message: "Gagal menyimpan data.",
    };
  }

  // 4️⃣ Kirim email ke admin
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER!,
        pass: process.env.EMAIL_PASS!,
      },
    });

    await transporter.sendMail({
      from: `"Notifikasi Sistem" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_ADMIN ?? process.env.EMAIL_USER!, // admin email
      subject: "Pesan Baru",
      html: `
      <div style="font-family: Arial">
        <h2>Detail Pesan</h2>

        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Nama Lengkap:</strong> ${nama_lengkap}</p>
        <p><strong>Asal Organisasi:</strong> ${asal_organisasi}</p>
        <p><strong>Nomor Telepon:</strong> ${telepon ?? "-"}</p>
        <p><strong>Subjek:</strong> ${subjek ?? "-"}</p>
        <p><strong>Pesan:</strong> ${pesan ?? "-"}</p>

        <p>Silakan berikan jawaban melalui nomor telepon yang tertera.</p>
      </div>
      `,
    });
  } catch (err) {
    console.error("Email Error:", err);
    // Not fatal → tetap success
  }

  return {
    success: true,
    message: "Pesan Terkirim! Silakan Menunggu Jawaban Selanjutnya.",
  };
}
