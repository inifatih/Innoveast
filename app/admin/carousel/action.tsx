"use server";

import { createClient } from "@/lib/supabase/server";

// ======================================================
// CREATE CAROUSEL
// ======================================================
export async function createCarousel(formData: FormData) {
  const supabase = await createClient();

  const judul = formData.get("judul") as string;
  const subjudul = formData.get("subjudul") as string;
  const redirect_url = formData.get("redirect_url") as string;
  const order_index = Number(formData.get("order_index"));
  const is_active = formData.get("is_active") === "true";
  const imageFile = formData.get("imageFile") as File | null;

  let image_path = null;

  // UPLOAD GAMBAR
  if (imageFile) {
    const fileExt = imageFile.name.split(".").pop();
    const fileName = `${crypto.randomUUID()}.${fileExt}`;
    const filePath = `Carousel/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("assets")
      .upload(filePath, imageFile, {
        contentType: imageFile.type,
      });

    if (uploadError) throw uploadError;
    image_path = filePath;
  }

  // INSERT KE DATABASE
  const { data, error } = await supabase
    .from("Carousel")
    .insert({
      judul,
      subjudul,
      redirect_url,
      order_index,
      is_active,
      image_path,
    })
    .select();

  if (error) throw error;

  return data;
}

// ======================================================
// UPDATE IS_ACTIVE
// ======================================================
export async function updateCarouselStatus(id: string, isActive: boolean) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("Carousel")
    .update({ is_active: isActive })
    .eq("id", id);

  if (error) throw new Error(error.message);

  return { success: true };
}


// ======================================================
// GET ALL CAROUSEL
// ======================================================
export async function getAllCarousel() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("Carousel")
    .select("*")
    .order("order_index", { ascending: true });

  if (error) throw error;

  const mapped = data.map((item) => {
    const publicURL = item.image_path
      ? supabase.storage.from("assets").getPublicUrl(item.image_path).data.publicUrl
      : null;

    return {
      id: item.id,
      judul: item.judul,
      subjudul: item.subjudul,
      order_index: item.order_index,
      is_active: item.is_active,
      image_path: item.image_path,
      redirect_url: item.redirect_url,
      created_at: item.created_at,
      image_url: publicURL,
    };
  });

  return mapped;
}
