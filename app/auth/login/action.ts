"use server";

import { createClient } from "@/lib/supabase/server";

export async function actionSignIn({
  email,
  password,
}: {
  email: string;
  password: string;
}) {

  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  // SUCCESS — RETURN WAJIB ADA
  return {
    success: true,
    message: "Login berhasil",
    user: data.user,
  };
}
