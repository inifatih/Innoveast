"use client";

import { History, Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface Innovation {
  id: number;
  title: string;
  description: string;
  categories: string[];
}

const dummyData: Innovation[] = [
  { id: 12, title: "Kampung Semanggi", description: "Inovasi Kampung Semanggi merupakan upaya pelestarian kuliner khas Surabaya sekaligus strategi pemberdayaan masyarakat melalui pengembangan kampung wisata, kampung edukasi, dan diversifikasi produk Semanggi. Program ini bertujuan meningkatkan ekonomi warga, mengangkat UMKM lokal, serta menjaga keberlanjutan budaya dan lingkungan.", categories: ["Logistik", "Otomasi"] },
  { id: 13, title: "ASIAP Abon Ikan Asap Sebagai Inovasi SustainableDevelopment Goals (SDGs) Dalam Konsep GreenEconomy Berbasis Ekologi Di Kenjeran Surabaya", description: "Inovasi pengolahan ikan asap Kenjeran menjadi abon bernilai tambah tinggi, berdaya simpan panjang, ramah lingkungan, dan memperkuat ekonomi pesisir berbasis SDGs.", categories: ["AI", "Maintenance"] },
  { id: 14, title: "Pemanfaatan Limbah Kulit Nanas sebagai POC untuk Peningkatan Produksi Padi	", description: "Inovasi ini mengolah limbah kulit nanas menjadi pupuk organik cair (POC) kaya enzim, vitamin, dan unsur hara untuk meningkatkan kualitas dan kuantitas hasil panen padi, sekaligus mengurangi ketergantungan petani terhadap pupuk kimia.", categories: ["Lingkungan", "Kimia"] },
  { id: 15, title: "JANJI CINTA, (Jajanan Jeli Inovatif kaya Colagen Aktivator, Protein, Vitamin C, A, Trace Mineral dan Anti Oksidan)-MORIGLOW BITES. Paduan Teknologi dan KearIfan Lokal untuk Kesehatan dan Perekonomian yang Lebih Berdaya.", description: "JANJI CINTA – Moriglow Bites adalah jelly superfood berbahan kelor dengan nilai nutrisi tinggi dan potensi pasar besar (kesehatan, pangan fungsional, dan oleh-oleh premium). Produk ini menawarkan margin tinggi, bahan baku murah, dan permintaan pasar meningkat untuk suplemen alami.", categories: ["Robotik", "Manufaktur"] },
  { id: 16, title: '"MIKOPLUS" Tameng dan Penerobos di Sistem Perakaran Tanaman', description: "MIKOPLUS adalah inovasi pupuk organik plus berbasis jamur Mikoriza yang berfungsi sebagai tameng dan penerobos pada sistem perakaran tanaman. Produk ini meningkatkan ketahanan tanaman terhadap kekeringan, menekan biaya pupuk kimia, serta memperbaiki kesuburan tanah secara berkelanjutan.", categories: ["Robotik", "Manufaktur"] },
  { id: 17, title: "Dari Sereh Wangi ke Deodoran Spray: Inovasi Berkelanjutan untuk Kesehatan dan Kewirausahaan", description: "“Dari Sereh Wangi ke Deodoran Spray” adalah inovasi deodoran alami berbasis tawas dan minyak sereh wangi untuk mengatasi bau badan remaja sekaligus menciptakan peluang kewirausahaan berkelanjutan bagi siswa SMKN 1 Kalitengah. Produk ini memanfaatkan herbal lokal Lamongan yang melimpah dan aman untuk kulit, dengan proses produksi sederhana, murah, dan skalabel.", categories: ["Robotik", "Manufaktur"] },
  { id: 18, title: "LONTARVERSE: Inovasi Sirkular Milenial Berbasis Pemberdayaan untuk Energi Terbarukan, Pangan Lokal, dan Desa Masa Depan", description: "LONTARVERSE adalah gerakan inovasi sirkular milenial yang menggabungkan energi terbarukan, pangan lokal, dan desa masa depan dalam satu ekosistem berkelanjutan. Terinspirasi dari gaya LegendTrend, LONTARVERSE menghadirkan narasi futuristik berbasis kearifan lokal—mengubah potensi pohon lontar menjadi energi, pangan, dan nilai ekonomi kreatif yang relevan bagi generasi muda.", categories: ["Robotik", "Manufaktur"] },
  { id: 19, title: "Bricket Dari Limbah Kopi", description: "Inovasi ini mengolah limbah kopi (kayu, kulit, daun) di lingkungan SDN Gelang 07—yang sebelumnya tidak termanfaatkan—menjadi briket biomassa sebagai energi alternatif terbarukan. Berbasis pendidikan lingkungan, inovasi ini menyasar pembelajaran praktis, kebersihan lingkungan, serta model ekonomi sirkular sederhana yang dapat direplikasi.", categories: ["Robotik", "Manufaktur"] },
];

// ------------------------------
// FUZZY MATCHING
// ------------------------------
const normalize = (text: string) =>
  text.toLowerCase().replace(/[^a-z0-9 ]/g, "");

const levenshtein = (a: string, b: string) => {
  const m = a.length, n = b.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] =
        a[i - 1] === b[j - 1]
          ? dp[i - 1][j - 1]
          : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  return dp[m][n];
};

const fuzzyIncludes = (text: string, keyword: string) => {
  if (text.includes(keyword)) return true;
  return text.split(" ").some((w) => levenshtein(w, keyword) <= 2);
};

export default function SistemPencocokanPage() {
  const [search, setSearch] = useState("");
  const [focus, setFocus] = useState(false);

  const filtered =
    search.trim().length === 0
      ? []
      : dummyData.filter((item) => {
          const q = normalize(search).trim();
          const keywords = q.split(" ").filter((k) => k.length > 1);

          const fullText =
            normalize(item.title) +
            " " +
            normalize(item.description) +
            " " +
            normalize(item.categories.join(" "));

          return keywords.some((key) => fuzzyIncludes(fullText, key));
        });

  return (
    <div className="min-h-screen bg-gray-50 pb-20">

      {/* HERO */}
      <section
        className="
        relative w-full 
        py-20 sm:py-28 
        bg-linear-to-br from-blue-700 via-indigo-700 to-purple-700 
        text-white text-center
      ">
        <h1 className="text-3xl sm:text-5xl font-extrabold px-4">
          Sistem Matching Industri & Inovasi
        </h1>

        <p className="text-sm sm:text-lg mt-4 opacity-90 px-6">
          Ketik kebutuhan Anda — AI akan mencocokkan inovasi yang paling relevan.
        </p>
      </section>

      {/* SEARCH BOX */}
      <div className="max-w-3xl mx-auto -mt-10 sm:-mt-12 px-4 relative">
        <div
          className={`
            bg-white shadow-xl rounded-full flex items-center 
            px-4 sm:px-6 py-3 sm:py-4 
            border border-gray-200 transition-all duration-300
            ${focus ? "ring-4 ring-blue-300/40 scale-[1.02]" : ""}
          `}
        >
          <Search className="text-gray-400 w-5 h-5 sm:w-6 sm:h-6 mr-3 sm:mr-4" />

          <input
            type="text"
            placeholder="Cari inovasi seperti 'AI', 'Robotik', 'Logistik'..."
            className="w-full py-2 text-base sm:text-lg outline-none"
            value={search}
            onFocus={() => setFocus(true)}
            onBlur={() => setTimeout(() => setFocus(false), 200)}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* GOOGLE-LIKE SUGGESTIONS */}
        {focus && search.trim() !== "" && (
          <div className="absolute mt-3 w-full bg-white shadow-xl rounded-2xl border border-gray-200 py-2 z-20">
            {filtered.length === 0 ? (
              <div className="px-4 py-3 text-gray-500 text-sm">
                Tidak ada hasil yang cocok
              </div>
            ) : (
              filtered.map((item) => (
                <Link
                  key={item.id}
                  href={`/matching/${item.id}`}
                  className="px-4 py-3 hover:bg-gray-100 cursor-pointer flex items-center gap-3"
                >
                  <History className="w-4 h-4 text-gray-400" />
                  <span className="text-sm sm:text-base">{item.title}</span>
                </Link>
              ))
            )}
          </div>
        )}
      </div>

      {/* RESULTS */}
      <div className="max-w-5xl mx-auto mt-14 sm:mt-20 px-4">
        {search && filtered.length > 0 && (
          <h2 className="text-lg sm:text-xl mb-6 text-gray-700">
            Hasil pencarian untuk: <strong>{search}</strong>
          </h2>
        )}

        {/* SHOW CARDS ONLY AFTER SEARCH */}
        {search.trim() !== "" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {filtered.map((item) => (
              <Link
                key={item.id}
                href={`/innovation/${item.id}`}
                className="
                  p-5 sm:p-6 
                  rounded-3xl bg-white shadow-lg border border-gray-100
                  hover:shadow-2xl hover:-translate-y-2 
                  transition-all duration-300
                  backdrop-blur-xl bg-opacity-80 
                  hover:scale-[1.02]
                "
              >
                <h3 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-3 text-indigo-700">
                  {item.title}
                </h3>

                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-4">
                  {item.categories.map((c) => (
                    <span
                      key={c}
                      className="
                        text-xs bg-linear-to-r from-indigo-200 to-indigo-300 
                        text-indigo-700 px-3 py-1 rounded-full font-medium
                      "
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}