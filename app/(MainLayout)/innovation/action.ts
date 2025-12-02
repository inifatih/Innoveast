"use server";

import { createClient } from "@/lib/supabase/server";

// ============= GET ALL INNOVATIONS =============
export async function getPublicInnovations() {
  const supabase = await createClient();

  const { data, error } = await supabase 
    .from("Innovations")
    .select(`
      id,
      created_at,
      nama_inovasi,
      deskripsi_inovasi,
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
      deskripsi_inovasi: item.deskripsi_inovasi,
      asal_inovasi: item.asal_inovasi,
      created_at: item.created_at,
      image_url: publicURL,
    };
  });

  return mapped;
}

// ============= GET SINGLE INNOVATION =============
export async function getInnovationById(id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("Innovations")
    .select(`
      id,
      nama_inovasi,
      deskripsi_inovasi,
      asal_inovasi,
      image_path,
      created_at
    `)
    .eq("id", id)
    .single();

  if (error) throw error;

  const image_url = data.image_path
    ? supabase.storage.from("assets").getPublicUrl(data.image_path).data.publicUrl
    : "/images/default.jpg";

  return {
    id: data.id,
    title: data.nama_inovasi,
    desc: data.deskripsi_inovasi,
    category: data.asal_inovasi || "Uncategorized",
    image: image_url,
    created_at: data.created_at,
  };
}
