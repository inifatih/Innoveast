"use server";
import { createClient } from "@/lib/supabase/server";

// ============= FETCH QUESTIONS BY CURRENT INOVATOR =============

export interface Question {
  id: number;
  id_inovasi: number;
  id_inovator: number;
  nama_lengkap: string;
  instansi: string;
  telp: string;
  email: string;
  preferensi_komunikasi: string;
  subjek: string;
  pesan: string;
  status: string;
  created_at: string;
}

// Fungsi untuk mengambil pertanyaan dari database berdasarkan inovator yang sedang login
export async function fetchQuestionsForCurrentInovator() {
  const supabase = await createClient();

  // 1️⃣ Ambil user login
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    console.warn("User not logged in");
    return [];
  }

  // 2️⃣ Ambil Profiles.id berdasarkan auth.user.id
  const { data: profile, error: profileError } = await supabase
    .from("Profiles")
    .select("id")
    .eq("user_id", user.id)
    .single();

  if (profileError || !profile) {
    console.error("Profile not found:", profileError);
    return [];
  }

  // 3️⃣ Ambil Questions berdasarkan id_inovator (Profiles.id)
  const { data: questions, error } = await supabase
    .from("Questions")
    .select("*")
    .eq("id_inovator", profile.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching questions:", error);
    return [];
  }

  return questions ?? [];
}

// ============= MARK QUESTION AS READ =============
export async function markQuestionAsRead(questionId: number) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("Questions")
    .update({ status: "sudah dibaca" })
    .eq("id", questionId);

  if (error) throw error;
}
