"use server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function getPublicInnovators() {
  const { data: profiles, error } = await supabaseAdmin
    .from("Profiles")
    .select("*")
    .eq("is_admin", false)
    .order("created_at", { ascending: false });

  if (error) throw error;

  // Ambil email untuk setiap profile
  const mapped = await Promise.all(
    profiles.map(async (p) => {
      console.log("Profile:", p.id, "user_id:", p.user_id);
      let email = "—";
      if (p.user_id) {
        const { data: userData, error: userErr } = await supabaseAdmin.auth.admin.getUserById(p.user_id);
        console.log("UserData:", userData, "Error:", userErr);
        if (!userErr && userData?.user) {
          email = userData.user.email ?? "—";
        }
      } else {
        console.log("user_id kosong, tidak bisa ambil email!")
      }
      return {
        id: p.id,
        email,
        nama: p.nama ?? "—",
        kontak: p.kontak ?? "—",
        deskripsi: p.deskripsi ?? "—",
        lokasi: p.lokasi ?? "—",
        created_at: p.created_at,
      };
    })
  );

  console.log("Final mapped innovators:", mapped);

  return mapped;
}
