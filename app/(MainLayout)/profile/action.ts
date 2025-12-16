"use server";

import { supabaseAdmin } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function getMyProfile() {
  // 1️⃣ ambil user login dari session
  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error("User belum login");
  }

  // 2️⃣ ambil profile berdasarkan user_id
  const { data: profile, error } = await supabaseAdmin
    .from("Profiles")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (error) throw error;

  // 3️⃣ ambil email dari auth.users
  let email = "—";
  const { data: userData, error: userErr } =
    await supabaseAdmin.auth.admin.getUserById(user.id);

  if (!userErr && userData?.user) {
    email = userData.user.email ?? "—";
  }

  // 4️⃣ mapping hasil (rapi & konsisten)
  let image_url: string | null = null;

  if (profile.image_path) {
    image_url = supabaseAdmin.storage
      .from("assets")
      .getPublicUrl(profile.image_path).data.publicUrl;
  }

  return {
    id: profile.id,
    user_id: profile.user_id,
    email,
    nama: profile.nama ?? "—",
    kontak: profile.kontak ?? "—",
    deskripsi: profile.deskripsi ?? "—",
    lokasi: profile.lokasi ?? "—",
    image_url,
    created_at: profile.created_at,
  };
}

// UPDATE PROFILE (mirip updateInnovation)
export async function updateProfile(formData: FormData) {
  const supabase = await createClient();

  // 1️⃣ Ambil user login
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (!user || authError) {
    throw new Error("Unauthorized");
  }

  // 2️⃣ Ambil field dari FormData
  const nama = formData.get("nama") as string;
  const kontak = formData.get("kontak") as string;
  const lokasi = formData.get("lokasi") as string;
  const deskripsi = formData.get("deskripsi") as string;

  // (opsional) avatar baru
  const avatarFile = formData.get("avatar") as File | null;

  // 3️⃣ Jika ada avatar baru → upload (TANPA preview)
  let image_path: string | undefined;

  if (avatarFile && avatarFile.size > 0) {
    const ext = avatarFile.name.split(".").pop();
    const filePath = `Avatars/${user.id}.${ext}`;

    const { error: uploadError } = await supabaseAdmin.storage
      .from("assets")
      .upload(filePath, avatarFile, {
        upsert: true,
        contentType: avatarFile.type,
      });

    if (uploadError) throw uploadError;

    image_path = filePath;
  }

  // 4️⃣ Update Profiles
  const { data: profile, error } = await supabaseAdmin
    .from("Profiles")
    .update({
      nama,
      kontak,
      lokasi,
      deskripsi,
      ...(image_path !== undefined ? { image_path } : {}),
    })
    .eq("user_id", user.id)
    .select()
    .single();

  if (error) throw error;

  // 5️⃣ Revalidate
  revalidatePath("/admin/data-diri");

  return profile;
}
