"use server";

import { createClient } from "@/lib/supabase/server";

type CategoryItem = {
  nama_kategori: string | null;
};

type InnovationCategoryJoin = {
  Categories: CategoryItem | CategoryItem[] | null;
};

// ============= GET ALL INNOVATIONS =============
export async function getPublicInnovations() {
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
      tiktok_url,
      instagram_url,
      youtube_url,
      Profiles(id, nama),

      Innovation_categories (
        Categories(nama_kategori)
      ),

      Innovation_images(image_path)
    `)
    .order("created_at", { ascending: false });

  if (error) throw error;

  const mapped = data.map((item) => {
    const images =
      item.Innovation_images?.map((img) =>
        supabase.storage.from("assets").getPublicUrl(img.image_path).data.publicUrl
      ) || [];

    const categories =
      (item.Innovation_categories as InnovationCategoryJoin [] | null)
        ?.flatMap((catJoin) => {
          const cats = catJoin.Categories;
          if (!cats) return [];
          return Array.isArray(cats) ? cats : [cats];
        })
        .map((cat) => cat.nama_kategori)
        .filter((name) => Boolean(name)) || [];


    return {
      id: item.id,
      nama_inovasi: item.nama_inovasi,
      overview: item.overview,
      features: item.features,
      potential_application: item.potential_application,
      unique_value: item.unique_value,
      asal_inovasi: item.asal_inovasi,
      created_at: item.created_at,
      social: {
        tiktok: item.tiktok_url,
        instagram: item.instagram_url,
        youtube: item.youtube_url,
      },
      images,
      categories,
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
      overview,
      features,
      potential_application,
      unique_value,
      asal_inovasi,
      created_at,
      Innovation_images(image_path)
    `)
    .eq("id", id)
    .single();

  if (error) throw error;

  const filePath =
    data.Innovation_images?.[0]?.image_path || null;

  const image_url = filePath
    ? supabase.storage.from("assets").getPublicUrl(filePath).data.publicUrl
    : "/images/default.jpg";

  return {
    id: data.id,
    title: data.nama_inovasi,
    overview: data.overview,
    features: data.features,
    potential_application: data.potential_application,
    unique_value: data.unique_value,
    category: data.asal_inovasi || "Uncategorized",
    image: image_url,
    created_at: data.created_at,
  };
}

