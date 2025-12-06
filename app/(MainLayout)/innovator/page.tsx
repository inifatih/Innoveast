"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Loader2, Locate, Mail, Phone, User } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import { getPublicInnovators } from "./action"; // ⬅️ Sesuaikan path ini

// --- Tipe Data dari getPublicInnovators() ---
export interface InnovatorItem {
  id: string | number;
  email: string;
  nama: string;
  kontak: string | null;
  deskripsi: string | null;
  lokasi: string | null;
  created_at: string;
}

type SortOption = "relevance" | "name";

export default function InnovatorsPage() {
  const [innovators, setInnovators] = useState<InnovatorItem[]>([]);
  const [loading, setLoading] = useState(true);
  
  // STATE FILTERING & SORTING
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortOption>("relevance");

  // Panggil Function getPublicInnovators
  useEffect(() => {
    const loadInnovators = async () => {
        // [A] set loading true
        setLoading(true); 
        try {
            const data = await getPublicInnovators();
            setInnovators(data);
        } catch (err) {
            console.error("Gagal mengambil data inovator:", err);
            setInnovators([]);
        } finally {
            // [B] set loading false
            setLoading(false); 
        }
    };

    loadInnovators(); 

}, []); // Dependency array kosong untuk hanya dijalankan saat mount

  // LOGIKA FILTERING DAN SORTING
  const filteredInnovators = useMemo(() => {
      let list = innovators.slice();
      
      // 1. Filtering (Pencarian)
      if (query.trim()) {
          const q = query.trim().toLowerCase();
          list = list.filter(
              (e) =>
                  // Cari di Nama
                  e.nama.toLowerCase().includes(q) ||
                  // Cari di Email
                  e.email.toLowerCase().includes(q) ||
                  // Cari di Deskripsi
                  e.deskripsi?.toLowerCase().includes(q) ||
                  // Cari di Lokasi
                  e.lokasi?.toLowerCase().includes(q)
          );
      }

      // 2. Sorting
      if (sort === "name") {
          // Urutkan berdasarkan nama (A-Z)
          list.sort((a, b) => a.nama.localeCompare(b.nama));
      } else if (sort === "relevance") {
          // Relevansi di sini berarti urutan created_at terbaru (Default API)
          // Jadi, tidak perlu disortir ulang jika API sudah mengurutkannya.
          // Namun, jika ada filtering, kita bisa mengembalikan urutan created_at default:
          list.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      }
      
      return list;
  }, [innovators, query, sort]);
  // ---------------------------------------

  // ... (Loader dan EmptyState Components)

  if (loading) {
      return (
          <div className="w-full py-20 text-center text-lg font-medium text-teal-600">
              <Loader2 className="animate-spin inline-block w-6 h-6 mr-2" /> Sedang memuat daftar inovator...
          </div>
      );
  }
  
  // Render UI
  return (
      <main>
          {/* ... Hero Section ... */}
          <section className="relative w-full h-[300px] sm:h-[400px] overflow-hidden">
              <Image src="/images/Acer1.jpg" alt="Innovator Experts Cover" fill className="object-cover brightness-75" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
                  <h1 className="text-4xl sm:text-5xl font-bold mb-3 drop-shadow-md">Daftar Inovator</h1>
                  <p className="text-lg sm:text-xl max-w-2xl drop-shadow-sm">
                      Temukan pakar dan inovator terkemuka yang siap berkolaborasi.
                  </p>
              </div>
          </section>
          <div className="max-w-full mx-4 px-4 flex flex-col md:flex-row gap-8 mt-10 mb-20">
            {/* ===================== */}
            {/* SIDEBAR (Filter UI) */}
            {/* ===================== */}
            <aside className="md:col-span-1">
                <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-200 w-full sticky top-4">
                    <h3 className="text-lg font-bold text-teal-700 mb-4">Pencarian & Filter</h3>
                    
                    {/* SEARCH INPUT */}
                    <div>
                        <label className="text-sm font-medium text-slate-700">Cari Inovator</label>
                        <input
                            type="search"
                            placeholder="Cari nama, email, atau deskripsi..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="w-full mt-1 rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:ring-2 focus:ring-teal-300"
                        />
                    </div>
                    
                    {/* SORTING SELECT */}
                    <div className="mt-5">
                        <label className="text-sm font-medium text-slate-700">Urutkan</label>
                        <select
                            value={sort}
                            onChange={(e) => setSort(e.target.value as SortOption)}
                            className="w-full mt-1 rounded-lg border border-gray-300 px-3 py-2"
                        >
                            <option value="relevance">Terbaru (Relevansi)</option>
                            <option value="name">Nama (A-Z)</option>
                        </select>
                    </div>
                    
                    {/* TAGS (Disederhanakan) */}
                    <div className="mt-6">
                        <label className="text-sm font-medium text-slate-700">Bidang Keahlian</label>
                        <p className="text-xs text-gray-500 mt-2">Filter tag dinonaktifkan karena data keahlian belum tersedia dari API.</p>
                    </div>
                </div>
            </aside>

              
            {/* ===================== */}
            {/* RIGHT CONTENT (Innovator Cards) */}
            {/* ===================== */}
            <main className="md:col-span-3">
                <h2 className="text-4xl font-extrabold text-teal-700">Discover Innovator Experts</h2>
                <p className="mt-2 text-slate-600 max-w-2xl text-justify leading-relaxed">
                    Menampilkan {filteredInnovators.length} hasil.
                </p>

                {filteredInnovators.length === 0 && (
                      <div className="p-10 mt-8 text-center border rounded-lg bg-white text-gray-500">
                          <h3 className="text-xl font-semibold">Tidak ada inovator yang cocok.</h3>
                          <p className="mt-2">Coba periksa kembali kata kunci pencarian Anda.</p>
                      </div>
                )}

                {/* GRID CARD SHADCN UI */}
                <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredInnovators.map((item) => (
                        <Card
                            key={item.id}
                            className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col"
                        >
                            {/* ... (Konten Card sama seperti sebelumnya) ... */}
                            <div className="relative w-full h-40 bg-gray-100 flex items-center justify-center">
                                <User className="w-16 h-16 text-gray-400" />
                            </div>
                            
                            <CardHeader className="py-4">
                                <CardTitle className="text-2xl font-extrabold text-[#1A1333] mb-1">
                                    {item.nama}
                                </CardTitle>
                                <CardDescription className="flex items-center text-sm text-gray-600">
                                    <Locate className="w-4 h-4 mr-2 text-teal-600" />
                                    {item.lokasi || "Lokasi tidak tersedia"}
                                </CardDescription>
                            </CardHeader>
                            
                            <CardContent className="grow">
                                <h4 className="text-sm font-semibold mb-2 text-teal-700">Tentang Inovator:</h4>
                                <p className="text-sm text-gray-700 line-clamp-4 min-h-20">
                                    {item.deskripsi || "Deskripsi profil belum diisi oleh inovator."}
                                </p>
                                
                                <div className="mt-4 pt-3 border-t border-gray-100 space-y-2">
                                    <div className="flex items-center text-sm text-gray-700">
                                        <Mail className="w-4 h-4 mr-2 text-teal-600" />
                                        <span className="truncate">{item.email}</span>
                                    </div>
                                    {item.kontak && (
                                        <div className="flex items-center text-sm text-gray-700">
                                            <Phone className="w-4 h-4 mr-2 text-teal-600" />
                                            <span>{item.kontak}</span>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                            
                            <CardFooter className="pt-4 text-xs text-gray-500">
                                <Clock className="w-3 h-3 mr-1" />
                                Bergabung pada: {new Date(item.created_at).toLocaleDateString("id-ID")}
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </main>
          </div>
      </main>
  );
}