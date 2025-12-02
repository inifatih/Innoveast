"use server";

import { supabaseAdmin } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const FormSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  is_admin: z.boolean(),

  nama: z.string().optional(),
  kontak: z.string().optional(),
  lokasi: z.string().optional(),
  deskripsi: z.string().optional(),
});

// ADMIN FORM
export async function createNewUser(values: z.infer<typeof FormSchema>) {
  const parsed = FormSchema.safeParse(values);
  if (!parsed.success) {
    return { success: false, message: "Input tidak valid" };
  }

  const data = parsed.data;

  try {
    // 1. Buat user auth dengan service_role
    const { data: userData, error: createError } =
      await supabaseAdmin.auth.admin.createUser({
        email: data.email,
        password: data.password,
        email_confirm: true,
      });

    if (createError || !userData?.user) {
      return { success: false, message: createError?.message };
    }

    const userId = userData.user.id;

    // 2. Insert ke table profiles dengan supabase server (RLS ON)
    const { error: profileError } = await supabaseAdmin.from("profiles").insert({
      id: userId,
      is_admin: data.is_admin,
      nama: data.nama || null,
      kontak: data.kontak || null,
      lokasi: data.lokasi || null,
      deskripsi: data.deskripsi || null,
    });

    if (profileError) {
      return { success: false, message: profileError.message };
    }

    return { success: true, message: "User berhasil dibuat" };
  } catch (err) {
    console.error("Create user error:", err);
    return { success: false, message: "Terjadi kesalahan di server" };
  }
}

// =====  ===== ===== ===== ===== ===== =====
// APPROVE INNOVATOR FROM -> PENDING PROFILES
// =====  ===== ===== ===== ===== ===== =====

// ===== APPROVE INNOVATOR ===== //
export async function approveInnovator(id: number) {
  console.log("SERVER ACTION EXECUTED");

  const { data: pending, error: errPending } = await supabaseAdmin
    .from("pending_profiles")
    .select("*")
    .eq("id", id)
    .single();

  if (errPending || !pending) {
    return { success: false, message: "Data pending tidak ditemukan." };
  }

  const { email, password, nama, kontak, lokasi, deskripsi } = pending;

  // CREATE AUTH USER
  const { data: authUser, error: authErr } =
    await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

  if (authErr || !authUser?.user) {
    return { success: false, message: authErr?.message };
  }

  const userId = authUser.user.id;

  // INSERT PROFILE
  const { error: insertErr } = await supabaseAdmin.from("profiles").insert({
    id: userId,
    nama,
    kontak,
    lokasi,
    deskripsi,
    is_admin: false,
  });

  if (insertErr) {
    return { success: false, message: insertErr.message };
  }

  // UPDATE PENDING
  const { error: updateErr } = await supabaseAdmin
    .from("pending_profiles")
    .update({
      user_id: userId,
      status: "approved",
    })
    .eq("id", id);

  if (updateErr) {
    return { success: false, message: updateErr.message };
  }
  revalidatePath("/admin/innovation")

  return { success: true };
}





// =====  ===== ===== ===== ===== ===== =====
// REJECT INNOVATOR FROM -> PENDING PROFILES
// =====  ===== ===== ===== ===== ===== =====
export async function rejectInnovator(id: number) {
  await supabaseAdmin.from("pending_profiles").delete().eq("id", id);

  return { success: true, message: "Pendaftar ditolak & dihapus." };
}




// Menampilkan Inovator di Confirm Innovator
// GET PENDING INNOVATORS
export async function getPendingInnovators() {
  const { data, error } = await supabaseAdmin
    .from("pending_profiles")
    .select("*")
    .eq("status", "pending")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error getPendingInnovators:", error);
    return [];
  }

  return data;
}


// Menampilkan Inovator Table Inovator
// GET INNOVATORS
export async function getAllInnovators() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("is_admin", false)
    .order("created_at", { ascending: false });

  if (error) throw error;

  // Map supaya frontend lebih mudah
  const mapped = data.map(item => ({
    id: item.id,
    email: item.email,
    nama: item.nama,
    kontak: item.kontak,
    deskripsi: item.deskripsi,
    lokasi: item.lokasi,
    created_at: item.created_at,
    profiles: Array.isArray(item.profiles) ? item.profiles[0] ?? null : item.profiles ?? null, // ambil object pertama jika ada
  }));

  return mapped;
}
