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

import { getAllInnovations } from "@/app/admin/innovation/action";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

interface InnovationItem {
  id: number;
  nama_inovasi: string;
  overview: string;
  features: string;
  potential_application: string;
  unique_value: string;
  asal_inovasi: string;
  created_at: string;
  // inovator dari Profiles Table
  innovator: {
    id: string | null;
    nama: string | null;
  };
  // kumpulan image url dari array
  images: string[];
  // kategori lebih dari 1
  categories: (string | null)[];
  // sosmed
  social: {
    tiktok: string | null;
    instagram: string | null;
    youtube: string | null;
  };
}

export default function TableInnovation() {
  const [data, setData] = useState<InnovationItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch data
  const fetchData = async () => {
    setLoading(true);
    try {
      const innovations = await getAllInnovations();
      setData(innovations);
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

  const handleEdit = (id: number) => {
    console.log("Edit ID:", id);
    // misal redirect ke halaman edit
    router.push(`/admin/innovation/edit/${id}`);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Apakah Anda yakin ingin menghapus inovasi ini?")) return;
    try {
      await deleteInnovationById(id); // sesuaikan dengan fungsi delete di action
      fetchData(); // refresh data setelah delete
    } catch (err) {
      console.error("Error deleting innovation:", err);
    }
  };

  return (
    <Card className="w-full border-gray-200 bg-white shadow-xl rounded-xl mt-6">
      <CardHeader className="bg-orange-50 shadow-sm">
        <CardTitle className="text-orange-600 text-xl font-semibold">
          Daftar Inovasi
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0 mx-4">
        {loading ? (
          <div className="text-center py-6 text-gray-500">Loading...</div>
        ) : data.length === 0 ? (
          <div className="text-center py-6 text-gray-500 italic">Belum ada data inovasi.</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="text-gray-700">Gambar</TableHead>
                <TableHead className="text-gray-700">Nama Inovasi</TableHead>
                <TableHead className="text-gray-700">Kategori</TableHead>
                <TableHead className="text-gray-700">Overview</TableHead>
                <TableHead className="text-gray-700">Features</TableHead>
                <TableHead className="text-gray-700">Potential Application</TableHead>
                <TableHead className="text-gray-700">Unique Value</TableHead>
                <TableHead className="text-gray-700">Asal</TableHead>
                <TableHead className="text-gray-700">Inovator</TableHead>
                <TableHead className="text-gray-700">Sosial Media</TableHead>
                <TableHead className="text-gray-700">Tanggal</TableHead>
                <TableHead className="text-gray-700">Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {data.map((item) => (
                <TableRow key={item.id} className="hover:bg-orange-50/40">
                  
                  {/* Kolom Gambar */}
                  <TableCell>
                    <ImageCell images={item.images} alt={item.nama_inovasi} />
                  </TableCell>


                  <TableCell className="text-gray-800">{item.nama_inovasi}</TableCell>
                  <TableCell className="text-gray-800">
                    {item.categories && item.categories.length > 0 ? (
                      <ul className="list-disc list-inside space-y-0.5">
                        {item.categories.map((cat, idx) => (
                          <li key={idx}>{cat}</li>
                        ))}
                      </ul>
                    ) : (
                      "—"
                    )}
                  </TableCell>                  
                  <TableCell className="text-gray-700">{htmlToText(item.overview) ?? "—"}</TableCell>
                  <TableCell className="text-gray-700">{htmlToText(item.features) ?? "—"}</TableCell>
                  <TableCell className="text-gray-700">{htmlToText(item.potential_application) ?? "—"}</TableCell>
                  <TableCell className="text-gray-700">{htmlToText(item.unique_value) ?? "—"}</TableCell>
                  <TableCell className="text-gray-700">{item.asal_inovasi ?? "—"}</TableCell>
                  <TableCell className="text-gray-700">{item.innovator?.nama ?? "—"}</TableCell>
                  <TableCell className="text-gray-700"><SocialCell social={item.social}/></TableCell>
                  <TableCell className="text-gray-600">
                    {item.created_at
                      ? new Date(item.created_at).toLocaleDateString("id-ID")
                      : "—"}
                  </TableCell>

                  {/* Kolom action */}
                  {/* Kolom Action */}
                  <TableCell className="flex gap-2">
                    <Button
                      onClick={() => handleEdit(item.id)}
                      className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDelete(item.id)}
                      className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm"
                    >
                      Delete
                    </Button>
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

// Image Cell
import { ChevronLeft, ChevronRight } from "lucide-react";


interface ImageCellProps {
  images?: string[];
  alt?: string;
}

export function ImageCell({ images = [], alt = "Gambar" }: ImageCellProps) {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(0);

  if (images.length === 0) return <>—</>;

  const prevImage = () => setCurrent((prev) => (prev - 1 + images.length) % images.length);
  const nextImage = () => setCurrent((prev) => (prev + 1) % images.length);

  return (
    <div className="relative inline-block">
      {/* Thumbnail */}
      <div
        className="flex gap-2 cursor-pointer items-center"
        onClick={() => setOpen((prev) => !prev)}
      >
        <Image
          src={images[0]}
          alt={alt}
          width={48}
          height={48}
          className="h-12 w-12 object-cover rounded-md"
        />
        {images.length > 1 && (
          <span className="absolute top-0 right-0 -translate-x-1/4 -translate-y-1/4 bg-orange-500 text-white text-xs font-semibold px-1.5 py-0.5 rounded-full shadow-md">
            +{images.length - 1}
          </span>
        )}
      </div>

      {/* Inline Dialog */}
      {open && (
        <div className="mt-2 bg-white shadow-2xl rounded-xl p-4 w-[600px] max-w-full">
          {/* Header */}
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold">{alt}</h3>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-500 hover:text-gray-700 text-2xl"
              onClick={() => setOpen(false)}
            >
              ×
            </Button>
          </div>

          {/* Carousel */}
          <div className="relative flex items-center justify-center bg-gray-100 h-[400px]">
            <Image
              src={images[current]}
              alt={`${alt} ${current + 1}`}
              width={600}
              height={400}
              className="object-contain w-full h-full"
            />

            {images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/30 hover:bg-white/50"
                  onClick={prevImage}
                >
                  <ChevronLeft className="w-6 h-6" />
                </Button>
                <Button
                  variant="ghost"
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/30 hover:bg-white/50"
                  onClick={nextImage}
                >
                  <ChevronRight className="w-6 h-6" />
                </Button>
              </>
            )}
          </div>

          {/* Dots */}
          <div className="flex justify-center items-center gap-2 mt-2">
            {images.map((_, idx) => (
              <span
                key={idx}
                className={`w-2 h-2 rounded-full cursor-pointer transition-colors ${
                  idx === current ? "bg-orange-500" : "bg-gray-300"
                }`}
                onClick={() => setCurrent(idx)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}


import router from "next/router";
import type { ComponentType, SVGProps } from "react";
import { FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";
import { Button } from "../ui/button";


interface SocialCellProps {
  social: {
    tiktok: string | null;
    instagram: string | null;
    youtube: string | null;
  };
}

export function SocialCell({ social }: SocialCellProps) {
  const { tiktok, instagram, youtube } = social;

  // Cek apakah semua sosial media kosong
  const allEmpty = !tiktok && !instagram && !youtube;
  if (allEmpty) return <>—</>;

  const renderLink = (
    url: string | null,
    Icon: ComponentType<SVGProps<SVGSVGElement>>,
  ) => {
    if (!url) return null;
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1 text-sm text-gray-600 hover:underline"
      >
        <Icon className="w-4 h-4" />
        <span>{url}</span>
      </a>
    );
  };

  return (
    <div className="flex flex-col gap-1">
      {renderLink(tiktok, FaTiktok)}
      {renderLink(instagram, FaInstagram)}
      {renderLink(youtube, FaYoutube)}
    </div>
  );
}

// Helper
function htmlToText(html: string) {
  if (!html) return "";
  const tmp = document.createElement("div");
  tmp.innerHTML = html;
  return tmp.textContent || "";
}

