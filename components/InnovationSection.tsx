"use client"
// components/Section1.tsx
import { getPublicInnovations } from "@/app/(MainLayout)/innovation/action";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export interface InnovationItem {
  id: string | number;
  nama_inovasi: string;
  overview: string;
  features?: string;
  potential_application?: string;
  unique_value?: string;
  asal_inovasi?: string;
  created_at: string;
  profiles?: { id: string; nama: string } | null;

  // Kolom baru
  image_url?: string | null;
}

export type NewsList = InnovationItem[];

export default function InnovationSection() {

  // Fetch data langsung di server
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<InnovationItem[]>([]); 

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getPublicInnovations();
      setData(data);
      // Ambil hanya 4 TERBARU
      // Urutkan berdasarkan tanggal terbaru → lama
      const sorted = data.sort(
        (a: InnovationItem, b: InnovationItem) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );

      // Ambil hanya 4 teratas
      setData(sorted.slice(0, 4));
    } catch (err) {
      console.error("Error fetching innovations:", err);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Truncate jika terlalu panjang > 100 char
  const truncate = (text: string, max: number) => {
    if (!text) return "";
    return text.length > max ? text.substring(0, max) + "..." : text;
  };


  if (loading) {
    return (
      <div className="w-full py-10 text-center text-lg font-medium text-gray-600">
        Sedang memuat inovasi...
      </div>
    );
  }

  return (
    <section className="w-full py-20 bg-white">
      <div className="max-w-11/12 mx-auto">
        <h2 className="text-4xl font-bold tracking-tight text-[#1A1333] mb-12">
          <Link href="/news" className="hover:underline">
            Inovasi Terbaru
          </Link>
          
        </h2>

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            {data.length === 0 ? (
              <p className="text-gray-500">No tech offers found.</p>
            ) : (
              data.map((item) => (
                <Card
                  key={item.id}
                  className="overflow-hidden border-0 shadow-none hover:shadow-2xl transition-shadow duration-300"
                >
                  <Link
                    key={item.id}
                    href={`/innovation/${item.id}`}
                  >
                    {/* Image */}
                    <div className="relative w-full h-56">
                      {item.image_url && (
                        <Image
                          src={item.image_url}
                          alt={item.nama_inovasi}
                          fill
                          className="object-cover"
                        />
                      )}
                    </div>
                    {/* Header */}
                    <CardHeader className="py-4">
                      <CardTitle className="text-lg font-semibold text-[#1A1333]">
                        {truncate(item.nama_inovasi, 100)}
                      </CardTitle>
                    </CardHeader>
                    {/* Content */}
                    <CardContent>
                      <h3 className="text-lg font-semibold text-gray-900">
                        
                      </h3>

                      {/* Kategori Inovasi */}
                      {/* <p className="text-sm text-gray-500 mb-2">{item.category}</p> */}
                      {/* Overview Inovasi */}
                      <p className="text-gray-700 text-sm">
                        {truncate(item.overview, 100)}
                      </p>
                    </CardContent>
                  </Link>
                </Card>
              ))
            )}
          </div>
      </div>
    </section>
  )
}

