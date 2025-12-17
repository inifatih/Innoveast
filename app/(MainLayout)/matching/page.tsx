"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function InovasiMatchingPage() {
  return (
    <div className="w-full">
      {/* ================= HERO SECTION ================= */}
      <section className="relative w-full bg-linear-to-br from-[#031A26] via-[#053B44] to-[#0A6C71] text-white overflow-hidden">
        {/* Large soft circles for depth */}
        <div className="absolute -right-40 -top-40 w-[780px] h-[780px] bg-[#37B8C3]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-56 -bottom-60 w-[560px] h-[560px] bg-[#0A6C71]/12 rounded-full blur-2xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-10 items-center relative z-10">

          {/* LEFT: text + actions */}
          <div className="pr-0 md:pr-6 text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4">
              Sistem Pencocokan Inovasi
            </h1>
            <h2 className="text-lg sm:text-xl text-[#C4F1F6] mb-6">
              Menghubungkan kebutuhan industri dengan inovasi terverifikasi
            </h2>

            <p className="text-base sm:text-lg text-[#E2FAFD] max-w-md mx-auto md:mx-0 leading-relaxed">
              Analisis kebutuhan, pencocokan berbasis atribut teknologi & kategori, dan rekomendasi yang mudah ditindaklanjuti semua dalam satu platform.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link href="/sistemPencocokan">
                <Button className="bg-[#37B8C3] text-[#031A26] font-semibold hover:bg-[#4CD6DF] px-6 py-4 rounded-lg">
                  Mulai Pencocokan
                </Button>
              </Link>

              <Link href="/innovation">
                <Button variant="outline" className="border-[#C4F1F6] text-white hover:bg-white/10 px-6 py-4 rounded-lg">
                  Daftar Inovasi
                </Button>
              </Link>
            </div>

            {/* small feature chips */}
            <div className="mt-6 flex flex-wrap justify-center md:justify-start gap-3">
              <span className="px-3 py-1 text-sm bg-[#031A26]/30 border border-[#37B8C3]/20 rounded-full">Analisis Kebutuhan</span>
              <span className="px-3 py-1 text-sm bg-[#031A26]/30 border border-[#37B8C3]/20 rounded-full">Database Inovasi</span>
              <span className="px-3 py-1 text-sm bg-[#031A26]/30 border border-[#37B8C3]/20 rounded-full">Rekomendasi Tepat</span>
            </div>
          </div>

          {/* RIGHT: layered mockups */}
          <div className="relative w-full flex justify-center md:justify-end items-center mt-10 md:mt-0">
            <div className="relative w-[320px] h-[220px] sm:w-[500px] sm:h-80 md:w-[760px] md:h-[480px]">
              {/* BACK LAYER */}
              <div className="absolute left-2 top-0 w-[320px] h-[180px] sm:w-[500px] sm:h-[280px] md:w-[700px] md:h-[360px] transform -rotate-2 rounded-2xl overflow-hidden shadow-2xl border border-white/5">
                <Image
                  src="/images/News.png"
                  alt="Mockup Back - dashboard"
                  fill
                  style={{ objectFit: "cover" }}
                  className="opacity-85"
                />
              </div>

              {/* MIDDLE LAYER */}
              <div className="absolute right-4 top-4 w-[260px] h-40 sm:w-[460px] sm:h-[260px] md:w-[560px] md:h-80 transform rotate-1 rounded-2xl overflow-hidden shadow-2xl border border-white/8">
                <Image
                  src="/images/marketplace.png"
                  alt="Mockup Middle - chart"
                  fill
                  style={{ objectFit: "cover" }}
                  className="opacity-95"
                />
              </div>

              {/* FRONT LAYER */}
              <div className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-[280px] h-40 sm:w-[480px] sm:h-[260px] md:w-[620px] md:h-[350px] transform translate-y-0 rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-white">
                <Image
                  src="/images/Carosel1.jpg"
                  alt="Mockup Front - monitor"
                  fill
                  style={{ objectFit: "cover" }}
                  className="object-top"
                />
                <div className="absolute left-1/2 -translate-x-1/2 -bottom-7 w-[140px] h-8 sm:w-[200px] sm:h-10 rounded-b-xl bg-[#031A26]/70 shadow-lg border border-white/5" />
              </div>

              {/* decorative small dots */}
              <div className="absolute right-12 top-2 w-2 h-2 sm:w-3 sm:h-3 bg-[#C4F1F6]/70 rounded-full blur-sm" />
              <div className="absolute right-6 bottom-6 w-2.5 h-2.5 sm:w-4 sm:h-4 bg-[#37B8C3]/50 rounded-full blur-sm" />
            </div>
          </div>
        </div>

        {/* bottom wave */}
        <svg
          className="absolute bottom-0 left-0 w-full"
          viewBox="0 0 1440 220"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#ffffff"
            d="M0,128L60,138.7C120,149,240,171,360,176C480,181,600,171,720,149.3C840,128,960,96,1080,85.3C1200,75,1320,85,1380,90.7L1440,96V320H0Z"
          />
        </svg>
      </section>

      {/* ================= ABOUT SECTION ================= */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-[#053B44]">Apa itu Fasilitas Pencocokan Inovasi (Innovation Matching)?</h2>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
            Fasilitas Pencocokan Inovasi adalah fitur yang menghubungkan kebutuhan industri
            dengan inovasi yang tersedia di katalog kami. Dengan sistem cerdas,
            kebutuhan industri dapat dicocokkan dengan solusi inovatif yang paling relevan.
          </p>
        </div>
      </section>

      {/* ================= FEATURES SECTION ================= */}
      <section className="py-16 sm:py-20 bg-[#F4FBFC]">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-[#053B44] mb-10 sm:mb-14">
            Fitur Utama
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-10">
            <div className="p-6 bg-white rounded-xl shadow text-center border border-[#0A6C71]/10">
              <h3 className="text-lg sm:text-xl font-semibold mb-3 text-[#0A6C71]">Analisis Kebutuhan</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Sistem mengurai kebutuhan industri dan memetakan karakteristik solusinya.
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl shadow text-center border border-[#0A6C71]/10">
              <h3 className="text-lg sm:text-xl font-semibold mb-3 text-[#0A6C71]">Database Inovasi</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Ratusan inovasi terverifikasi siap dicocokkan berdasarkan kategori dan teknologi.
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl shadow text-center border border-[#0A6C71]/10">
              <h3 className="text-lg sm:text-xl font-semibold mb-3 text-[#0A6C71]">Rekomendasi Tepat</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Sistem dapat memberikan daftar inovasi yang paling relevan dengan kebutuhan industri.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-[#053B44] mb-10 sm:mb-14">
            Cara Kerja Sistem Pencocokan
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-10 text-center">
            {[
              { step: "1", title: "Input Kebutuhan", desc: "Industri mengisi form kebutuhan solusi." },
              { step: "2", title: "Analisis Sistem", desc: "Sistem memetakan karakteristik kebutuhan secara otomatis." },
              { step: "3", title: "Pencocokan Data", desc: "Sistem membandingkan kebutuhan dengan database inovasi." },
              { step: "4", title: "Rekomendasi", desc: "Hasil rekomendasi inovasi yang paling sesuai." },
            ].map(({ step, title, desc }) => (
              <div key={step}>
                <div className="text-3xl sm:text-4xl font-bold text-[#0A6C71] mb-3 sm:mb-4">{step}</div>
                <h3 className="font-semibold text-lg sm:text-xl">{title}</h3>
                <p className="mt-1 sm:mt-2 text-gray-600 text-sm sm:text-base">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA SECTION ================= */}
      <section className="py-16 sm:py-20 bg-[#053B44] text-white">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
            Mulai Hubungkan Kebutuhan Anda
          </h2>

          <p className="text-base sm:text-lg text-[#C4F1F6] mb-6 sm:mb-10">
            Baik Anda industri atau inovator—sistem pencocokan siap mempercepat kolaborasi inovasi.
          </p>

          <Link href="/sistemPencocokan">
            <Button className="bg-[#37B8C3] text-[#031A26] font-bold px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg hover:bg-[#4CD6DF]">
              Gunakan Sistem Pencocokan
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}