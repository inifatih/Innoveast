"use client";

import { getPublicInnovations } from "@/app/(MainLayout)/innovation/action";
import { History, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface InnovationItem {
  id: number;
  nama_inovasi: string;
  overview: string;
  features: string;
  potential_application: string;
  unique_value: string;
  asal_inovasi: string;
  created_at: string;
  images: string[];
  categories: (string | null)[];
  social: {
    tiktok: string | null;
    instagram: string | null;
    youtube: string | null;
  };
}


// =============================
// Normalizer
// =============================
const normalize = (t: string): string =>
  t.toLowerCase().replace(/[^a-z0-9 ]/g, "");

// =============================
// Levenshtein for fuzzy
// =============================
const levenshtein = (a: string, b: string): number => {
  const m = a.length, n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () =>
    Array(n + 1).fill(0)
  );

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] =
        a[i - 1] === b[j - 1]
          ? dp[i - 1][j - 1]
          : 1 + Math.min(
              dp[i - 1][j],
              dp[i][j - 1],
              dp[i - 1][j - 1]
            );
    }
  }
  return dp[m][n];
};

const fuzzyWordMatch = (text: string, word: string): boolean =>
  text.includes(word) ||
  text.split(" ").some((w: string) => levenshtein(w, word) <= 1);


// =============================
// ⭐ SMART SEMANTIC SEARCH
// =============================
function semanticSearch(
  query: string,
  data: InnovationItem[]
): (InnovationItem & { score: number })[] {

  const q = normalize(query);
  const words = q.split(" ").filter((w) => w.length > 2);

  const isSpecific = words.length >= 2;

  return data
    .map((item: InnovationItem) => {
      const title = normalize(item.nama_inovasi);
      const desc = normalize(item.overview);
      const feature = normalize(item.features ?? "");
      const potential = normalize(item.potential_application ?? "");
      const unique = normalize(item.unique_value ?? "");
      const asal = normalize(item.asal_inovasi ?? "");
      const cats = normalize(item.categories.join(" "));

      let score = 0;

      words.forEach((w: string) => {
        // title
        if (title.includes(w)) score += isSpecific ? 70 : 40;
        else if (fuzzyWordMatch(title, w)) score += isSpecific ? 40 : 25;

        // overview/desc
        if (desc.includes(w)) score += isSpecific ? 60 : 35;
        else if (fuzzyWordMatch(desc, w)) score += isSpecific ? 30 : 15;

        // features, potential, unique value, asal inovasi
        const meta = `${feature} ${potential} ${unique} ${asal} ${cats}`;
        if (meta.includes(w)) score += isSpecific ? 45 : 25;
      });

      // Penalti
      if (isSpecific) {
        const joined = `${title} ${desc} ${feature} ${potential} ${unique} ${asal} ${cats}`;
        const missing = words.filter((w) => !joined.includes(w));
        score -= missing.length * 20;
      }

      return { ...item, score };
    })
    .filter((i) => i.score > 10)
    .sort((a, b) => b.score - a.score);
}

// =============================
// COMPONENT UI
// =============================
export default function SistemPencocokanPage() {
  const [search, setSearch] = useState("");
  const [focus, setFocus] = useState(false);
  const [data, setData] = useState<InnovationItem[]>([]);

  // ============= Fetch Supabase Data ============
  useEffect(() => {
    async function load(): Promise<void> {
      const raw = await getPublicInnovations();

      // Sesuaikan dengan struktur semanticSearch()
      const mapped: InnovationItem[] = raw.map((item) => ({
        id: item.id,
        nama_inovasi: item.nama_inovasi,
        overview: item.overview ?? "",
        features: item.features ?? "",
        potential_application: item.potential_application ?? "",
        unique_value: item.unique_value ?? "",
        asal_inovasi: item.asal_inovasi ?? "",
        created_at: item.created_at,
        social: item.social,

        // ambil gambar pertama saja
        images: item.images ?? [],
        categories: item.categories ?? [],
      }));

      setData(mapped);
    }

    load();
  }, []);

  const filtered = search.trim() ? semanticSearch(search, data) : [];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">

      {/* HERO */}
      <section className="relative w-full py-20 sm:py-28 bg-linear-to-br from-blue-700 via-indigo-700 to-purple-700 text-white text-center">
        <h1 className="text-3xl sm:text-5xl font-extrabold px-4">
          Sistem Matching Industri & Inovasi
        </h1>
        <p className="text-sm sm:text-lg mt-4 opacity-90 px-6">
          Ketik kebutuhan Anda — sistem akan mencocokkan inovasi paling relevan secara otomatis.
        </p>
      </section>

      {/* SEARCH */}
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
            placeholder="Cari inovasi seperti 'pengolahan limbah', 'energi', 'pangan'..."
            className="w-full py-2 text-base sm:text-lg outline-none"
            value={search}
            onFocus={() => setFocus(true)}
            onBlur={() => setTimeout(() => setFocus(false), 200)}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* AUTOCOMPLETE */}
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
                  <span className="text-sm sm:text-base">{item.nama_inovasi}</span>
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

        {search.trim() !== "" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {filtered.map((item) => (
              <Link
                key={item.id}
                href={`/innovation/${item.id}`}
                className="
                  p-5 sm:p-6 rounded-3xl bg-white shadow-lg border border-gray-100
                  hover:shadow-2xl hover:-translate-y-2 transition-all duration-300
                  backdrop-blur-xl bg-opacity-80 hover:scale-[1.02]
                "
              >
                <h3 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-3 text-indigo-700">
                  {item.nama_inovasi}
                </h3>

                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.overview}
                </p>

                <div className="flex flex-wrap gap-2 mt-4">
                  {item.categories.map((c) => (
                    <span
                      key={c}
                      className="text-xs bg-linear-to-r from-indigo-200 to-indigo-300 
                        text-indigo-700 px-3 py-1 rounded-full font-medium"
                    >
                      {c}
                    </span>
                  ))}
                </div>

                {item.images && (
                  <Image
                    src={item.images[0]}
                    alt={item.nama_inovasi}
                    className="mt-4 rounded-xl w-full h-40 object-cover"
                  />
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
