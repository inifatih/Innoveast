"use server";

import { createClient } from "@/lib/supabase/server";

// Create
export async function createEvent(formData: FormData) {
  const supabase = await createClient();

  // Ambil nilai dari FormData
  const judul_event = formData.get("judul_event") as string;
  const category_event = formData.get("category_event") as string;
  const tanggal_event = formData.get("tanggal_event") as string;
  const lokasi_event = formData.get("lokasi_event") as string;
  const deskripsi_event = formData.get("deskripsi_event") as string;
  const imageFile = formData.get("imageFile") as File | null;

  let image_path = null;

  // Jika ada file gambar → upload ke storage
  if (imageFile) {
    const fileExt = imageFile.name.split(".").pop();
    const fileName = `${crypto.randomUUID()}.${fileExt}`;
    const filePath = `Events/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("assets")
      .upload(filePath, imageFile, {
        contentType: imageFile.type,
      });

    if (uploadError) throw uploadError;
    image_path = filePath;
  }

  const { data, error } = await supabase
    .from("Events")
    .insert([
      {
        judul_event,
        category_event,
        tanggal_event,
        lokasi_event,
        deskripsi_event,
        image_path
      },
    ])
    .select();

  if (error) throw error;
  return data;
}

// Read / Get All Event
export async function getAllEvent() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("Events")
    .select(
      `
        id,
        judul_event,
        category_event,
        tanggal_event,
        deskripsi_event,
        lokasi_event,
        created_at,
        image_path
      `
    )
    .order("created_at", { ascending: false });

  if (error) throw error;

  const mapped = data.map((item) => {
    const publicURL = item.image_path
      ? supabase.storage.from("assets").getPublicUrl(item.image_path).data.publicUrl
      : null;

    return {
      id: item.id,
      created_at: item.created_at,
      judul_event: item.judul_event,
      category_event: item.category_event,
      tanggal_event: item.tanggal_event,
      deskripsi_event: item.deskripsi_event,
      image_url: publicURL,
    };
  });

  return mapped;
}




