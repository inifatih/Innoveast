"use server";

import { createClient } from "@/lib/supabase/server";
import nodemailer from "nodemailer";
import { z } from "zod";

// Schema Input
const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  nama: z.string(),
  kontak: z.string().optional(),
  deskripsi: z.string().optional(),
  lokasi: z.string().optional(),
});

export async function registerPending(values: unknown) {
  const supabase = await createClient();

  // Validasi input
  const parsed = RegisterSchema.safeParse(values);
  if (!parsed.success) {
    return {
      success: false,
      message: "Data tidak valid",
      errors: parsed.error.flatten(),
    };
  }

  const { email, nama, kontak, deskripsi, lokasi } = parsed.data;

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
    .from("pending_profiles")
    .select("id")
    .eq("email", email)
    .maybeSingle();

  if (existingPending) {
    return {
      success: false,
      message: "Email sudah menunggu persetujuan admin.",
    };
  }

  // 3️⃣ Insert ke pending_profiles
  const { error: insertError } = await supabase.from("pending_profiles").insert({
    email,
    nama,
    kontak,
    deskripsi,
    lokasi,
    status: "pending",
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
      subject: "Pendaftaran Inovator Baru",
      html: `
      <div style="font-family: Arial">
        <h2>Pendaftar Baru Menunggu Validasi</h2>

        <p><strong>Nama:</strong> ${nama}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Kontak:</strong> ${kontak ?? "-"}</p>
        <p><strong>Deskripsi:</strong> ${deskripsi ?? "-"}</p>
        <p><strong>Lokasi:</strong> ${lokasi ?? "-"}</p>

        <p>Silakan buka dashboard admin untuk melakukan approval.</p>
      </div>
      `,
    });
  } catch (err) {
    console.error("Email Error:", err);
    // Not fatal → tetap success
  }

  return {
    success: true,
    message: "Registrasi berhasil! Menunggu persetujuan admin.",
  };
}
