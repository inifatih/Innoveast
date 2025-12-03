"use client";

import { getPublicNewsById } from "@/app/(MainLayout)/news/action";
import Image from "next/image";
import { useParams } from "next/navigation";
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

export default function NewsDetailPage() {
  const { id } = useParams();

  const [news, setNews] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDetail = async () => {
      const data = await getPublicNewsById(String(id));
      setNews(data);
      setLoading(false);
    };
    loadDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="w-full py-10 text-center text-lg font-medium text-gray-600">
        Sedang memuat berita...
      </div>
    );
  }

  if (!news) {
    return (
      <div className="w-full py-10 text-center text-lg font-medium text-gray-600">
        Berita tidak ditemukan.
      </div>
    );
  }

  return (
    <main className="flex flex-col w-full pb-20">
      {/* HERO IMAGE */}
      <section className="relative w-full h-[300px] sm:h-[400px] overflow-hidden">
        {news.image_url && (
          <Image
            src={news.image_url}
            alt={news.judul_news}
            fill
            className="object-cover"
          />
        )}
      </section>

      {/* CONTENT */}
      <section className="max-w-9xl mx-auto px-6 sm:px-8 mt-10">
        {/* TITLE */}
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-4">
          {news.judul_news}
        </h1>

        {/* META */}
        <div className="flex items-center gap-3 text-gray-500 text-sm mb-8">
          <p>
            {new Date(news.tanggal_news).toLocaleString("id-ID", {
              timeZone: "Asia/Jakarta",
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </p>
          <span className="w-1 h-1 rounded-full bg-gray-400" />
          <p>{news.penulis_news}</p>
        </div>

        {/* BODY */}
        <article className="prose prose-gray max-w-none leading-relaxed text-[17px] text-gray-800">
          {news.deskripsi_news
            .split("\n\n")
            .map((para: string, idx: number) => (
              <p key={idx} className="mb-4">
                {para}
              </p>
            ))}
        </article>
      </section>
    </main>
  );
}
