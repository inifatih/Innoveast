"use server";
import { createClient } from "@/lib/supabase/server";

// ============= GET USER'S INNOVATIONS =============
type CategoryItem = {
  nama_kategori: string | null;
};
type InnovationCategoryJoin = {
  Categories: CategoryItem | CategoryItem[] | null;
};

export async function getUserInnovations() {
  const supabase = await createClient();

  // Ambil user yang sedang login
  const { data: authData } = await supabase.auth.getUser();
  if (!authData.user) {
    console.warn("User not logged in");
    return [];
  }

  const userUuid = authData.user.id;

  // Cari profile yang terkait dengan UUID user
  const { data: profiles, error: profileError } = await supabase
    .from("Profiles")
    .select("id")
    .eq("user_id", userUuid)
    .limit(1)
    .single();

  if (profileError) {
    console.error("Error fetching profile:", profileError.message);
    return [];
  }

  const profileId = profiles.id; // ini yang cocok dengan id_inovator di Innovations

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
      facebook_url,
      web_url,
      Profiles(id, nama),
      Innovation_categories (
        Categories(nama_kategori)
      ),
      Innovation_images(image_path)
    `)
    .eq("id_inovator", profileId) // filter sesuai user yang login
    .order("created_at", { ascending: false });

  if (error) throw error;

  const mapped = data.map((item) => {
    const images =
        item.Innovation_images?.map((img) =>
        supabase.storage.from("assets").getPublicUrl(img.image_path).data.publicUrl
        ) || [];

    const categories =
        (item.Innovation_categories as InnovationCategoryJoin[] | null)
        ?.flatMap((catJoin) => {
            const cats = catJoin.Categories;
            if (!cats) return [];
            return Array.isArray(cats) ? cats : [cats];
        })
        .map((cat) => cat.nama_kategori)
        .filter((name): name is string => !!name) || []; // ← filter null/undefined

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
        facebook: item.facebook_url,
        web: item.web_url,
      },
      images,
      categories,
    };
  });

  return mapped;
}

// Ambil data inovasi sebelumnya
export async function getInnovationForEdit(innovationId: number) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("Innovations")
    .select(`
      id,
      overview,
      features,
      potential_application,
      unique_value,
      tiktok_url,
      instagram_url,
      youtube_url,
      facebook_url,
      web_url,
      Innovation_images (
        id,
        image_path
      )
    `)
    .eq("id", innovationId)
    .single();

  if (error) throw error;

  const images =
    data?.Innovation_images?.map((img) => ({
      id: img.id,
      path: img.image_path,
      url: supabase.storage
        .from("assets")
        .getPublicUrl(img.image_path).data.publicUrl,
    })) ?? [];

  return {
    id: data.id,
    overview: data.overview ?? "",
    features: data.features ?? "",
    potential_application: data.potential_application ?? "",
    unique_value: data.unique_value ?? "",
    tiktok_url: data.tiktok_url ?? "",
    instagram_url: data.instagram_url ?? "",
    youtube_url: data.youtube_url ?? "",
    facebook_url: data.facebook_url ?? "",
    web_url: data.web_url ?? "",
    images, // 👈 SELALU array object siap UI
  };
}



// Request Update Innovation
export async function submitInnovationUpdateRequest(
  innovationId: number,
  updatedData: Partial<{
    overview: string;
    features: string;
    potential_application: string;
    unique_value: string;
    tiktok_url: string;
    instagram_url: string;
    youtube_url: string;
    facebook_url: string;
    web_url: string;
    images: (File | string)[]; // bisa File atau path lama
  }>
) {
  const supabase = await createClient();

  // AUTH
  // Ambil user
  const { data: authData, error: authError } = await supabase.auth.getUser();
  if (authError) throw authError;
  if (!authData?.user) throw new Error("User not logged in");

  // PROFILE
  // Ambil profile ID user
  const { data: profile, error: profileError } = await supabase
    .from("Profiles")
    .select("id")
    .eq("user_id", authData.user.id)
    .single();

  if (profileError) throw profileError;
  if (!profile) throw new Error("Profile not found for current user");

  // UPLOAD IMAGES
  // --- Upload file image baru ke Supabase Storage ---
  const imagePaths: string[] = [];

  if (updatedData.images?.length) {
    for (const img of updatedData.images) {
      // ---- image lama (path string) ----
      if (typeof img === "string") {
        if (img.trim() !== "") imagePaths.push(img);
        continue;
      }

      // ---- image baru (File) ----
      if (!(img instanceof File) || img.size === 0) continue;

      const ext = img.name.split(".").pop();
      const fileName = `${crypto.randomUUID()}.${ext}`;
      const filePath = `Innovations/${innovationId}/${fileName}`;

      // 🔑 FIX UTAMA: File → Buffer
      const buffer = Buffer.from(await img.arrayBuffer());

      const { error: uploadError } = await supabase.storage
        .from("assets")
        .upload(filePath, buffer, {
          contentType: img.type,
          upsert: false,
        });

      if (uploadError) throw uploadError;

      imagePaths.push(filePath);
    }
  }

  // PAYLOAD
  const payload = {
    ...updatedData,
    images: imagePaths,
  };

  // INSERT REQUEST UPDATE
  const { data, error } = await supabase
    .from("InnovationUpdates")
    .insert({
      id_innovations: innovationId,
      id_innovator: profile.id,
      updated_data: payload,
      status: "pending",
      submitted_at: new Date(),
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

