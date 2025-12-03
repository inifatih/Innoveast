"use server";

import { createClient } from "@/lib/supabase/server";

export async function createInnovation(formData: FormData) {
  const supabase = await createClient();

  // Ambil nilai dari FormData
  const nama_inovasi = formData.get("nama_inovasi") as string;
  const asal_inovasi = formData.get("asal_inovasi") as string;
  const overview = formData.get("overview") as string;
  const features = formData.get("features") as string;
  const potential_application = formData.get("potential_application") as string;
  const unique_value = formData.get("unique_value") as string;
  const id_inovator = formData.get("id_inovator") as string;
  const imageFile = formData.get("imageFile") as File | null;

  let image_path = null;

  // Jika ada file gambar → upload ke storage
  if (imageFile) {
    const fileExt = imageFile.name.split(".").pop();
    const fileName = `${crypto.randomUUID()}.${fileExt}`;
    const filePath = `Innovations/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("assets")
      .upload(filePath, imageFile, {
        contentType: imageFile.type,
      });

    if (uploadError) throw uploadError;
    image_path = filePath;
  }

  // Insert ke tabel innovations
  const { data, error } = await supabase
    .from("Innovations")
    .insert({
      nama_inovasi,
      asal_inovasi,
      overview,
      features,
      potential_application,
      unique_value,
      id_inovator,
      image_path, // tambahkan kolom ini di DB
    })
    .select();

  if (error) throw error;

  return data;
}

// GET INNOVATORS FROM TABLE PROFILES WHERE IS_ADMIN == FALSE
export async function getInovators() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("profiles")
    .select("id, nama")
    .eq("is_admin", false)
    .order("nama", { ascending: true });

  if (error) {
    console.error("Error fetching inovators:", error);
    return [];
  }

  return data.map((item) => ({
    id: item.id,
    name: item.nama ?? ""
  }));
}

// READ INNOVATION (Fetch into Table)
// tipe asli yang dikembalikan Supabase join profiles
export async function getAllInnovations() {
  const supabase = await createClient();

  const { data, error } = await supabase 
    .from("Innovations")
    .select(`
      id,
      created_at,
      nama_inovasi,
      overview,
      features,
      potential_application,
      unique_value,
      asal_inovasi,
      id_inovator,
      image_path,
      profiles(id, nama)
    `)
    .order("created_at", { ascending: false });

  if (error) throw error;

  const mapped = data.map((item) => {
    const publicURL = item.image_path
      ? supabase.storage.from("assets").getPublicUrl(item.image_path).data.publicUrl
      : null;

    return {
      id: item.id,
      nama_inovasi: item.nama_inovasi,
      overview: item.overview,
      features: item.features,
      potential_application: item.potential_application,
      unique_value: item.unique_value,
      asal_inovasi: item.asal_inovasi,
      created_at: item.created_at,
      image_url: publicURL,
    };
  });

  return mapped;
}







