import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { createClient } from "@/lib/supabase/server";
import "@/styles/globals.css";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // ❗ Jika belum login → lempar ke login
  if (!user) redirect("/");

  // ❗ Ambil role dari profiles
  const { data: profile } = await supabase
    .from("Profiles")
    .select("is_admin")
    .eq("user_id", user.id)
    .single();

  // ❗ Jika bukan admin → tendang ke halaman utama
  if (!profile?.is_admin) {
    redirect("/");
  }

  return (
    <div className="flex h-screen">
      <AdminSidebar />

      <main className="ml-48 w-full p-6 max-w-[90%]">
        {children}
      </main>
    </div>
  );
}
