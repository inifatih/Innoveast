"use server";
import { createClient } from "@/lib/supabase/server";

// CREATE NEW CATEGORY
export async function createNewCategory(values: { nama_kategori: string; deskripsi?: string }) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("Categories")
    .insert({
      nama_kategori: values.nama_kategori,
      deskripsi: values.deskripsi ?? null,
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating category:", error);
    return { success: false, error: error.message };
  }

  return { success: true, data, message: "Kategori berhasil ditambahkan!" };
}

// GET CATEGORY FROM TABLE CATEGORIES
export async function getCategories() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("Categories")
    .select("id, nama_kategori, deskripsi")
    .order("nama_kategori", { ascending: true });

  if (error) {
    console.error("Error fetching categories:", error);
    return [];
  }

  return data.map((cat) => ({
    id: cat.id,
    nama_kategori: cat.nama_kategori,
    deskripsi: cat.deskripsi
  }));
}