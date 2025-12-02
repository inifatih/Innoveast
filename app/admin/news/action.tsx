"use server";

import { createClient } from "@/lib/supabase/server";

// Create
export async function createNews(formData: FormData) {
  const supabase = await createClient();

  const judul_news = formData.get("judul_news") as string;
  const category_news = formData.get("category_news") as string;
  const tanggal_news = formData.get("tanggal_news") as string;
  const deskripsi_news = formData.get("deskripsi_news") as string;
  const penulis_news = formData.get("penulis_news") as string;
  const imageFile = formData.get("imageFile") as File | null;

  let image_path = null;

  // === UPLOAD IMAGE JIKA ADA ===
  if (imageFile) {
    const ext = imageFile.name.split(".").pop();
    const fileName = `${crypto.randomUUID()}.${ext}`;
    const filePath = `News/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("assets")
      .upload(filePath, imageFile, {
        contentType: imageFile.type,
      });

    if (uploadError) throw uploadError;

    image_path = filePath; // simpan ke DB
  }

  // === INSERT KE DB ===
  const { data, error } = await supabase
    .from("News")
    .insert([
      {
        judul_news,
        category_news,
        tanggal_news,
        deskripsi_news,
        penulis_news,
        image_path, // kolom baru di DB
      },
    ])
    .select();

  if (error) throw error;

  return data;
}


// Read / Get All News
export async function getAllNews() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("News")
    .select(
      `
        id,
        judul_news,
        category_news,
        tanggal_news,
        deskripsi_news,
        penulis_news,
        image_path,
        created_at
      `
    )
    .order("created_at", { ascending: false });

  if (error) throw error;

  // Generate Public URL
  return data.map((item) => {
    const image_url = item.image_path
      ? supabase.storage.from("assets").getPublicUrl(item.image_path).data.publicUrl
      : null;

    return {
      ...item,
      image_url,
    };
  });
}





