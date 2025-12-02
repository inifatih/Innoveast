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