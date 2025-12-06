"use server";

import { createClient } from "@/lib/supabase/server";

export async function createInnovation(formData: FormData) {
  const supabase = await createClient();

  // Ambil data umum
  const nama_inovasi = formData.get("nama_inovasi") as string;
  const asal_inovasi = formData.get("asal_inovasi") as string;
  const overview = formData.get("overview") as string;
  const features = formData.get("features") as string;
  const potential_application = formData.get("potential_application") as string;
  const unique_value = formData.get("unique_value") as string;
  const id_inovator = formData.get("id_inovator") as string;

  // Sosial media
  const tiktok_url = formData.get("tiktok_url") as string | null;
  const instagram_url = formData.get("instagram_url") as string | null;
  const youtube_url = formData.get("youtube_url") as string | null;

  // Categories sebagai string[]
  const categoryNames = formData.getAll("categories") as string[];

  // Multiple images
  const imageFiles = formData.getAll("images") as File[];

  // 1. Insert Innovations
  const { data: innovation, error: insertError } = await supabase
    .from("Innovations")
    .insert({
      nama_inovasi,
      asal_inovasi,
      overview,
      features,
      potential_application,
      unique_value,
      id_inovator,
      tiktok_url,
      instagram_url,
      youtube_url,
    })
    .select()
    .single();

  if (insertError) throw insertError;

  const innovationId = innovation.id;

  // 2. Ambil ID kategori dari nama
  let categoryIds: number[] = [];
  if (categoryNames.length > 0) {
    const { data: categoryData, error: catError } = await supabase
      .from("Categories")
      .select("id")
      .in("nama_kategori", categoryNames);

    if (catError) throw catError;
    categoryIds = categoryData?.map((c) => c.id) ?? [];
  }

  // 3. Insert ke tabel relasi Innovation_categories
  if (categoryIds.length > 0) {
    const categoryRows = categoryIds.map((id_categories) => ({
      id_innovations: innovationId,
      id_categories,
    }));

    const { error: categoryError } = await supabase
      .from("Innovation_categories")
      .insert(categoryRows);

    if (categoryError) throw categoryError;
  }

  // 4. Upload images
  for (const file of imageFiles) {
    if (!file || file.size === 0) continue;

    const fileExt = file.name.split(".").pop();
    const fileName = `${crypto.randomUUID()}.${fileExt}`;
    const filePath = `Innovations/${innovationId}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("assets")
      .upload(filePath, file, { contentType: file.type });

    if (uploadError) throw uploadError;

    const { error: imgInsertError } = await supabase
      .from("Innovation_images")
      .insert({
        id_innovations: innovationId,
        image_path: filePath,
      });

    if (imgInsertError) throw imgInsertError;
  }

  return innovation;
}


// GET INNOVATORS FROM TABLE PROFILES WHERE IS_ADMIN == FALSE
export async function getInovators() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("Profiles")
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
type CategoryItem = {
  nama_kategori: string | null;
};

type InnovationCategoryJoin = {
  Categories: CategoryItem | CategoryItem[] | null;
};


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
        
    const innovator = Array.isArray(item.Profiles) ? item.Profiles[0] : item.Profiles;

    return {
      id: item.id,
      nama_inovasi: item.nama_inovasi,
      overview: item.overview,
      features: item.features,
      potential_application: item.potential_application,
      unique_value: item.unique_value,
      asal_inovasi: item.asal_inovasi,
      created_at: item.created_at,

      innovator: {
        id: innovator?.id || null,
        nama: innovator?.nama || null,
      },

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