"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

interface Innovation {
  id: number;
  title: string;
  description: string;
  categories: string[];
  problem: string;
  approach: string;
  stage: string;
  impact: string[];
  usecase: string[];
  developer: string;
}

const dummyData: Innovation[] = [
  {
    id: 1,
    title: "Mesin Sortir Otomatis",
    description: "Sistem sortir barang otomatis dengan sensor, conveyor tracking, dan machine vision.",
    categories: ["Logistik", "Otomasi"],
    problem: "Sortir manual menyebabkan antrian logistik dan human error yang tinggi.",
    approach: "Menggunakan kamera vision, conveyor otomatis, dan klasifikasi real-time.",
    stage: "Pilot project berjalan pada gudang logistik regional.",
    impact: ["Akurasi sortir naik hingga 40%", "Kecepatan proses meningkat 2x", "Efisiensi tenaga kerja meningkat"],
    usecase: ["Sortir paket e-commerce", "Distribusi barang gudang", "Inbound–outbound logistic"],
    developer: "BRIDA Jawa Timur",
  },
  {
    id: 2,
    title: "AI Prediksi Kerusakan Mesin",
    description: "AI yang memonitor getaran mesin dan memprediksi potensi kerusakan sebelum terjadi.",
    categories: ["AI", "Maintenance"],
    problem: "Downtime mendadak menyebabkan kerugian pada lini produksi.",
    approach: "Analisis getaran, suhu, dan suara mesin menggunakan machine learning.",
    stage: "Prototype tested — siap integrasi.",
    impact: ["Mengurangi downtime hingga 25%", "Maintenance lebih efisien", "Diagnosis kerusakan lebih cepat"],
    usecase: ["Pabrik otomotif", "Pabrik manufaktur", "Industri kimia dan tekstil"],
    developer: "ITS Surabaya",
  },
  {
    id: 3,
    title: "Inovasi Pengolahan Air Limbah",
    description: "Teknologi eco-friendly yang memurnikan limbah cair industri secara efisien.",
    categories: ["Lingkungan", "Kimia"],
    problem: "Limbah cair industri mencemari sungai dan meningkatkan biaya pengolahan.",
    approach: "Kombinasi filtrasi biomaterial dan reaktor katalitik rendah energi.",
    stage: "Telah diimplementasikan pada skala kecil UKM kimia.",
    impact: ["Biaya pengolahan turun 30%", "Penurunan COD & BOD hingga 70%", "Proses lebih ramah lingkungan"],
    usecase: ["Industri kimia", "Pengolahan limbah kota", "Pabrik tekstil"],
    developer: "Universitas Airlangga",
  },
  {
    id: 4,
    title: "Robot Pengepakan Barang",
    description: "Robot industri yang mempercepat proses pengepakan barang dengan akurasi tinggi.",
    categories: ["Robotik", "Manufaktur"],
    problem: "Pengepakan manual lambat, tidak konsisten, dan memakan banyak tenaga kerja.",
    approach: "Robot manipulator + AI placement untuk penataan barang.",
    stage: "Sudah digunakan di beberapa pabrik manufaktur.",
    impact: ["Produktivitas naik 3x", "Error pengepakan turun 60%", "Operasional lebih stabil"],
    usecase: ["Pabrik manufaktur", "Pabrik FMCG", "Gudang distribusi"],
    developer: "Politeknik Elektronika Negeri Surabaya (PENS)",
  },
];

export default function DetailPage() {
  const params = useParams();
  const id = Number(params.id);

  const item = dummyData.find((d) => d.id === id);

  if (!item) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6 text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-700">Inovasi Tidak Ditemukan</h1>
        <Link
          href="/sistempencocokan"
          className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
        >
          Kembali ke Pencarian
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">

      {/* HERO */}
      <section className="w-full py-16 md:py-20 bg-linear-to-br from-indigo-700 via-purple-700 to-pink-700 text-white text-center shadow-xl px-4">
        <h1 className="text-3xl md:text-5xl font-extrabold">
          Detail Hasil Pencocokan
        </h1>
        <p className="text-base md:text-lg opacity-90 mt-3">
          Informasi mendalam berdasarkan kecocokan inovasi
        </p>
      </section>

      <div className="max-w-5xl mx-auto px-4 md:px-6 mt-10 md:mt-14">

        <div className="bg-white shadow-2xl rounded-2xl md:rounded-3xl p-6 md:p-10 border border-gray-100">

          {/* TITLE */}
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-snug">
            {item.title}
          </h2>

          {/* CATEGORIES */}
          <div className="mt-5 md:mt-6 flex flex-wrap gap-2 md:gap-3">
            {item.categories.map((c) => (
              <span
                key={c}
                className="px-3 md:px-4 py-1.5 md:py-2 bg-indigo-100 text-indigo-700 rounded-full font-medium text-xs md:text-sm"
              >
                {c}
              </span>
            ))}
          </div>

          {/* DESCRIPTION */}
          <p className="mt-5 md:mt-6 text-gray-700 text-base md:text-lg leading-relaxed">
            {item.description}
          </p>

          {/* PROBLEM */}
          <div className="mt-8 md:mt-10">
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">Masalah yang Diselesaikan</h3>
            <p className="text-gray-700 text-sm md:text-base">{item.problem}</p>
          </div>

          {/* APPROACH */}
          <div className="mt-6">
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">Pendekatan / Teknologi Utama</h3>
            <p className="text-gray-700 text-sm md:text-base">{item.approach}</p>
          </div>

          {/* STAGE */}
          <div className="mt-6">
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">Tahap Implementasi</h3>
            <p className="text-gray-700 text-sm md:text-base">{item.stage}</p>
          </div>

          {/* IMPACT */}
          <div className="mt-8 md:mt-10">
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3">Impact yang Terukur</h3>
            <ul className="list-disc pl-5 text-gray-700 space-y-1 text-sm md:text-base">
              {item.impact.map((i, idx) => (
                <li key={idx}>{i}</li>
              ))}
            </ul>
          </div>

          {/* USE CASE */}
          <div className="mt-8 md:mt-10">
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3">Contoh Penggunaan</h3>
            <ul className="list-disc pl-5 text-gray-700 space-y-1 text-sm md:text-base">
              {item.usecase.map((u, idx) => (
                <li key={idx}>{u}</li>
              ))}
            </ul>
          </div>

          {/* DEVELOPER */}
          <div className="mt-10 bg-gray-50 border border-gray-300 p-5 md:p-6 rounded-2xl">
            <h3 className="text-lg md:text-xl font-bold text-gray-800">Pengembang</h3>
            <p className="text-gray-700 mt-2 text-sm md:text-base">{item.developer}</p>
          </div>

          {/* CTA BUTTONS */}
          <div className="mt-10 md:mt-12 flex flex-col sm:flex-row gap-4">
            <button className="w-full sm:w-auto px-6 py-3 bg-indigo-600 text-white rounded-xl shadow hover:bg-indigo-700 transition text-sm md:text-base">
              Hubungi Pengembang
            </button>

            <button className="w-full sm:w-auto px-6 py-3 bg-gray-900 text-white rounded-xl shadow hover:bg-black transition text-sm md:text-base">
              Lihat Inovasi Serupa
            </button>
          </div>

          {/* BACK */}
          <div className="mt-12 md:mt-14 flex justify-center">
            <Link
              href="/sistempencocokan"
              className="px-6 md:px-8 py-3 md:py-4 bg-blue-600 text-white rounded-full text-base md:text-lg font-semibold shadow-lg hover:bg-blue-700 transition"
            >
              ← Kembali ke Sistem Matching
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}