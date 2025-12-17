"use client"
import { getPublicNews } from "@/app/(MainLayout)/news/action";
// components/Section1.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
export interface NewsItem {
  id: string | number;
  judul_news: string;
  category_news: string;
  tanggal_news: string; // atau Date jika kamu parsing
  deskripsi_news: string;
  penulis_news: string;
  image_url: string | null;
  created_at: string; // atau Date
}

export type NewsList = NewsItem[];

export default function NewsSection() {

  // Fetch data langsung di server
  const [news, setNews] = useState<NewsItem[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNews = async () => {
      setLoading(true);
      try {
        const data = await getPublicNews();

        // Urutkan berdasarkan tanggal terbaru → lama
        const sorted = data.sort(
          (a: NewsItem, b: NewsItem) =>
            new Date(b.tanggal_news).getTime() - new Date(a.tanggal_news).getTime()
        );

        // Ambil hanya 4 teratas
        setNews(sorted.slice(0, 4));
      } catch (err) {
        console.error("Gagal mengambil data news:", err);
      }
      setLoading(false);
    };

    loadNews();
  }, []);


  if (loading) {
    return (
      <div className="w-full py-10 text-center text-lg font-medium text-gray-600">
        Sedang memuat berita...
      </div>
    );
  }

  return (
    <section className="w-full py-20 bg-white">
      <div className="max-w-11/12 mx-auto">
        <h2 className="text-4xl font-bold tracking-tight text-[#1A1333] mb-12">
          <Link href="/news" className="hover:underline">
            Berita Seputar Inovasi
          </Link>
          
        </h2>

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {news.map((item) => (
            <Card
              key={item.id}
              className="overflow-hidden border-0 shadow-none hover:shadow-2xl transition-shadow duration-300"
            >
              <Link
                key={item.id}
                href={`/news/${item.id}`}
              >
                <div className="relative w-full h-56">
                  {item.image_url && (
                    <Image
                      src={item.image_url}
                      alt={item.judul_news}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
                <CardHeader className="py-4">
                  <CardTitle className="text-lg font-semibold text-[#1A1333]">
                    {item.judul_news}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-3">
                    {item.deskripsi_news}
                  </p>
                  <p className="text-xs text-gray-400">
                    {new Date(item.tanggal_news).toLocaleString("id-ID", {
                      timeZone: "Asia/Jakarta",
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}{" "}
                    | {item.penulis_news}
                  </p>

                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
