// app/admin/innovation/action.ts
"use server";
import { createClient } from "@/lib/supabase/server";

// --- 1. Fetch Pending Updates ---
// --- 1. Fetch Pending Updates ---
export async function getPendingInnovationUpdates() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("InnovationUpdates")
    .select(`
      id,
      id_innovations,
      id_innovator,
      updated_data,
      status,
      submitted_at,
      Innovations:Innovations!id_innovations (
        id,
        nama_inovasi
      ),
      Profiles:Profiles!id_innovator (
        id,
        nama
      )
    `)
    .eq("status", "pending")
    .order("submitted_at", { ascending: true });

  if (error) throw error;
  if (!data) return [];

  const mapped = data.map((item) => {
    const rawImages = item.updated_data?.images;

    const images: { path: string; url: string }[] =
      Array.isArray(rawImages)
        ? rawImages
            .filter((p): p is string => typeof p === "string" && p !== "")
            .map((path) => ({
              path,
              url: supabase.storage
                .from("assets")
                .getPublicUrl(path).data.publicUrl,
            }))
        : [];

    return {
      ...item,
      updated_data: {
        ...item.updated_data,
        images, // [{ path, url }]
      },
    };
  });

  return mapped;
}

// --- 2. Approve Update ---
export async function approveInnovationUpdate(updateId: number) {
  const supabase = await createClient();

  // Ambil update
  const { data: update, error } = await supabase
    .from("InnovationUpdates")
    .select("*")
    .eq("id", updateId)
    .single();

  if (error) throw error;
  if (!update) throw new Error("Update not found");

  const updatedData = update.updated_data;

  // Update tabel Innovations
  const { error: updateError } = await supabase
    .from("Innovations")
    .update({
      overview: updatedData.overview,
      features: updatedData.features,
      potential_application: updatedData.potential_application,
      unique_value: updatedData.unique_value,
      tiktok_url: updatedData.tiktok_url,
      instagram_url: updatedData.instagram_url,
      youtube_url: updatedData.youtube_url,
      facebook_url: updatedData.facebook_url,
      web_url: updatedData.web_url,
    })
    .eq("id", update.id_innovations);

  if (updateError) throw updateError;

  // Update gambar jika ada
  if (updatedData.images && updatedData.images.length > 0) {
    // Hapus gambar lama (opsional)
    await supabase
      .from("Innovation_images")
      .delete()
      .eq("id_innovations", update.id_innovations);

    // Insert gambar baru
    const imageInserts = updatedData.images.map((imgPath: string) => ({
      id_innovations: update.id_innovations,
      image_path: imgPath,
    }));

    const { error: imgError } = await supabase
      .from("Innovation_images")
      .insert(imageInserts);

    if (imgError) throw imgError;
  }

  // Update status di InnovationUpdates
  const { error: statusError } = await supabase
    .from("InnovationUpdates")
    .update({
      status: "approved",
      approved_at: new Date(),
    })
    .eq("id", updateId);

  if (statusError) throw statusError;

  return { success: true };
}

// --- 3. Reject Update ---
export async function rejectInnovationUpdate(updateId: number) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("InnovationUpdates")
    .update({
      status: "rejected",
      approved_at: new Date(),
    })
    .eq("id", updateId);

  if (error) throw error;

  return { success: true };
}
