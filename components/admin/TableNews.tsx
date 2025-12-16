"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";

import { getAllNews } from "@/app/admin/news/action";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export interface NewsItem {
  id: string | number;
  judul_news: string;
  category_news?: string | null;
  tanggal_news?: string | null;
  deskripsi_news?: string | null;
  penulis_news?: string | null;
  created_at: string;

  // Kolom baru
  image_url?: string | null;
}

export default function TableNews() {
  const [data, setData] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const news = await getAllNews();
      setData(news as NewsItem[]);
    } catch (err) {
      console.error("Error fetching news:", err);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Card className="w-full border-gray-200 bg-white shadow-xl rounded-xl mt-6">
      <CardHeader className="bg-orange-50 shadow-sm">
        <CardTitle className="text-orange-600 text-xl font-semibold">
          Daftar Berita
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0 mx-4">
        {loading ? (
          <div className="text-center py-6 text-gray-500">Loading...</div>
        ) : data.length === 0 ? (
          <div className="text-center py-6 text-gray-500 italic">
            Belum ada berita.
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="text-gray-700">Gambar</TableHead>
                <TableHead className="text-gray-700">Judul</TableHead>
                <TableHead className="text-gray-700">Kategori</TableHead>
                <TableHead className="text-gray-700">Deskripsi</TableHead>
                <TableHead className="text-gray-700">Penulis</TableHead>
                <TableHead className="text-gray-700">Tanggal</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {data.map((item) => (
                <TableRow key={item.id} className="hover:bg-purple-50/40">
                  {/* Kolom Gambar */}
                  <TableCell>
                    {item.image_url ? (
                      <Image
                        src={item.image_url}
                        alt={item.judul_news}
                        width={48}
                        height={48}
                        className="h-12 w-12 object-cover rounded-md border"
                      />
                    ) : (
                      "—"
                    )}
                  </TableCell>

                  <TableCell className="text-gray-800">
                    {item.judul_news}
                  </TableCell>

                  <TableCell className="text-gray-700">
                    {item.category_news ?? "—"}
                  </TableCell>

                  <TableCell className="max-w-[200px] whitespace-normal wrap-break-word text-gray-700">
                    {item.deskripsi_news ?? "—"}
                  </TableCell>

                  <TableCell className="text-gray-700">
                    {item.penulis_news ?? "—"}
                  </TableCell>

                  <TableCell className="text-gray-600">
                    {item.tanggal_news
                      ? new Date(item.tanggal_news).toLocaleDateString("id-ID")
                      : "—"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
