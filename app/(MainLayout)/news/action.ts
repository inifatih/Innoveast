"use server";

import { createClient } from "@/lib/supabase/server";

// Read / Get All News
export async function getPublicNews() {
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

export async function getPublicNewsById(id: string) {
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
    .eq("id", id)
    .single(); // <-- data akan berbentuk object, bukan array

  if (error) throw error;

  // Convert image_path → image_url
  const image_url = data.image_path
    ? supabase.storage
        .from("assets")
        .getPublicUrl(data.image_path).data.publicUrl
    : null;

  // Return object sesuai tipe NewsItem
  return {
    ...data,
    image_url,
  };
}

