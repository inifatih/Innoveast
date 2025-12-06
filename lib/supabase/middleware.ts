import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value }) =>
            supabaseResponse.cookies.set(name, value)
          );
        },
      },
    }
  );

  // ❗ Tetap wajib ada supaya session tidak error
  const { data } = await supabase.auth.getClaims();
  const session = data?.claims;

  // =====================================================
  // 1. Jika path bukan /admin → allow
  // =====================================================
  const isAdminPath = request.nextUrl.pathname.startsWith("/admin");
  if (!isAdminPath) {
    return supabaseResponse;
  }

  // =====================================================
  // 2. Kalau path admin tapi user tidak login
  // =====================================================
  if (!session) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  // =====================================================
  // 3. Ambil role admin dari profiles
  // =====================================================
  const { data: profile, error: profileError } = await supabase
    .from("Profiles")
    .select("is_admin")
    .eq("user_id", session.sub)
    .single();

  // Jika gagal ambil profile / tidak ada profile → tidak boleh masuk
  if (profileError || !profile) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  // =====================================================
  // 4. Jika BUKAN admin → redirect ke forbidden
  // =====================================================
  if (!profile.is_admin) {
    const url = request.nextUrl.clone();
    url.pathname = "/"; // atau "/"
    return NextResponse.redirect(url);
  }

  // =====================================================
  // 5. Jika admin → lanjutkan request ke /admin/*
  // =====================================================
  return supabaseResponse;
}
