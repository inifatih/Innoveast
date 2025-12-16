// app/admin/layout.tsx
import { ProfileSidebar } from "@/components/profile/ProfileSidebar";
import Image from "next/image";
import { ReactNode } from "react";

export default function ProfileLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Sidebar */}
      <aside className="absolute inset-y-0 left-0 z-20">
        <ProfileSidebar />
      </aside>

      {/* Main content */}
      <main className="flex-1 relative">
        {/* Hero */}
        <section className="relative w-full h-[300px] sm:h-[400px] overflow-hidden">
          <Image
            src="/images/newsHero.png"
            alt="Innovation Cover"
            fill
            className="object-cover brightness-75"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
            <h1 className="text-4xl sm:text-5xl font-bold mb-3 drop-shadow-md">Profil</h1>
            <p className="text-lg sm:text-xl max-w-2xl drop-shadow-sm">
              Kelola informasi profil inovator Anda di sini
            </p>
          </div>
        </section>
        {children}
      </main>
    </div>
  );
}


