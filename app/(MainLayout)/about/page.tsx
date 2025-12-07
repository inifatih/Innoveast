"use client";

import AutoBreadcrumb from "@/components/AutoBreadcrumb";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function AboutPage() {
  const [fade, setFade] = useState(true);

  const textContent = `ORBIT Jatim (Organisasi Repositori dan Jembatan Inovasi Teknologi) adalah platform digital terintegrasi yang mengakselerasi komersialisasi produk inovasi dengan mempertemukan inventor, industri, investor, dan pemangku kebijakan dalam ekosistem kolaboratif yang terukur. Terdapat tiga fitur utama ORBIT Jatim, yaitu:
1. Innovation Portfolio Management System: katalog komprehensif produk inovasi dengan dokumentasi lengkap, spesifikasi teknis, dan status IPR yang terverifikasi.
2. Innovation Matching Feature: mencocokkan kebutuhan spesifik industri dengan solusi inovasi yang telah dikurasi oleh BRIDA Jawa Timur.
3. Pusat Informasi Ekosistem Inovasi: menyediakan update event, berita terkini, dan insight perkembangan inovasi regional untuk mendukung keputusan strategis stakeholder.`;

  const imageSrc = "/images/Acer1.jpg";

  // Auto fade effect
  useEffect(() => {
    setFade(true);
  }, []);

  return (
    <main>
      {/* ================= COVER ================= */}
      <section className="relative w-full h-80 sm:h-[420px] overflow-hidden shadow-xl border-b">
        <Image src="/images/Acer1.jpg" alt="About Cover" fill className="object-cover brightness-75" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold drop-shadow-lg">About Orbit Jatim</h1>
          <p className="text-lg sm:text-xl max-w-2xl mt-3 drop-shadow">
            Temukan visi dan perjalanan kami dalam membangun ekosistem inovasi Indonesia.
          </p>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 my-8">
        <AutoBreadcrumb />
      </div>

      {/* ================== MODERN PROFESSIONAL SECTION ================= */}
      <section className="py-20 justify-center hidden md:flex">
        <div className="w-11/12 max-w-6xl grid md:grid-cols-2 gap-12 items-center">
          {/* Text Left */}
          <div className={`transition-opacity duration-700 ${fade ? "opacity-100" : "opacity-0"}`}>
            <h2 className="text-3xl font-bold mb-6">Tentang ORBIT Jatim</h2>
            <p className="text-gray-700 text-justify leading-relaxed whitespace-pre-line">{textContent}</p>
          </div>

          {/* Image Right */}
          <div className={`relative w-full h-[350px] sm:h-[420px] rounded-xl overflow-hidden shadow-lg transition-opacity duration-700 ${fade ? "opacity-100" : "opacity-0"}`}>
            <Image
              src={imageSrc}
              alt="Orbit Jatim"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* MOBILE VIEW */}
      <section className="md:hidden py-12 px-4">
        <div className="flex flex-col gap-8">
          <div className="transition-opacity duration-700 opacity-100">
            <h2 className="text-3xl font-bold mb-6">Tentang ORBIT Jatim</h2>
            <p className="text-gray-700 text-justify leading-relaxed whitespace-pre-line">{textContent}</p>
          </div>
          <div className="relative w-full h-[250px] rounded-xl overflow-hidden shadow-lg">
            <Image
              src={imageSrc}
              alt="Orbit Jatim"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50 text-center mx-auto">
        <h2 className="text-3xl font-bold mb-4">Orang-Orang Kami</h2>
        <p className="text-gray-700 text-lg text-center leading-relaxed">
          Tim adalah kekuatan utama kami. Mereka yang menghidupkan inovasi.
        </p>
      </section>

      <section className="py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Tim Kami</h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
          {["Anggota 1", "Anggota 2", "Anggota 3", "Anggota 4", "Anggota 5"].map((name, i) => (
            <TeamCard key={i} name={name} role="Divisi / Jabatan" />
          ))}
        </div>
      </section>
    </main>
  );
}

/* ================= CARD TEAM ================= */
function TeamCard({ name, role }: { name: string; role: string }) {
  return (
    <div className="text-center hover:-translate-y-1 transition duration-300">
      <div className="w-32 h-32 mx-auto rounded-full bg-gray-300 shadow-lg"></div>
      <h3 className="font-semibold text-gray-900 mt-4">{name}</h3>
      <p className="text-gray-600 text-sm">{role}</p>
    </div>
  );
}

 
