"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

import {
  approveInnovationUpdate,
  getPendingInnovationUpdates,
  rejectInnovationUpdate,
} from "@/app/admin/request-update/action";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// ---- Interfaces ----
export interface PendingInnovationUpdate {
  id: number;
  id_innovations: number;
  id_innovator: number;
  updated_data: {
    overview?: string;
    features?: string;
    potential_application?: string;
    unique_value?: string;
    tiktok_url?: string;
    instagram_url?: string;
    youtube_url?: string;
    facebook_url?: string;
    web_url?: string;
    images?: {
      path: string;
      url: string;
    }[];
  };
  status: string;
  submitted_at: string;
  Innovations: {
    id: number;
    nama_inovasi: string;
  };
  Profiles: {
    id: number;
    nama: string;
  };
}

type PendingUpdateRaw = {
  id: number;
  id_innovations: number;
  id_innovator: number;
  updated_data: PendingInnovationUpdate["updated_data"];
  status: string;
  submitted_at: string;
  Innovations?: 
    | { id: number; nama_inovasi: string }
    | { id: number; nama_inovasi: string }[];
  Profiles?: 
    | { id: number; nama: string }
    | { id: number; nama: string }[];
};


// ---- Main Page ----
export default function ConfirmInnovationUpdates() {
  const [data, setData] = useState<PendingInnovationUpdate[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      setLoading(true);

      const result = await getPendingInnovationUpdates();
      console.log("Raw pending updates:", result);

      if (!result) {
        setData([]);
        return;
      }

      // Mapping agar sesuai interface
      const mappedData: PendingInnovationUpdate[] = result.map((item: PendingUpdateRaw) => ({
          id: item.id,
          id_innovations: item.id_innovations,
          id_innovator: item.id_innovator,
          updated_data: item.updated_data,
          status: item.status,
          submitted_at: item.submitted_at,

          Innovations: Array.isArray(item.Innovations)
            ? item.Innovations[0]
            : item.Innovations ?? {
                id: 0,
                nama_inovasi: "",
              },

          Profiles: Array.isArray(item.Profiles)
            ? item.Profiles[0]
            : item.Profiles ?? {
                id: 0,
                nama: "",
              },
        })
      );

      setData(mappedData); // ✅ INI YANG KURANG
    } catch (err) {
      console.error("Error loading pending updates:", err);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);


  // --- Action Handlers ---
  const handleApprove = async (id: number) => {
    await approveInnovationUpdate(id);
    loadData();
  };

  const handleReject = async (id: number) => {
    await rejectInnovationUpdate(id);
    loadData();
  };

  return (
    <Card className="w-full border-gray-200 bg-white shadow-xl rounded-xl">
      <CardHeader className="bg-blue-50 shadow-sm">
        <CardTitle className="text-blue-600 text-xl font-semibold">
          Persetujuan Update Inovasi
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0 mx-4">
        {loading ? (
          <div className="text-center py-6 text-gray-500">Loading...</div>
        ) : data.length === 0 ? (
          <div className="text-center py-6 text-gray-500 italic">
            Tidak ada update inovasi yang menunggu persetujuan.
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="text-gray-700">Gambar Inovasi</TableHead>
                <TableHead className="text-gray-700">Nama Inovasi</TableHead>
                <TableHead className="text-gray-700">Pengirim</TableHead>
                <TableHead className="text-gray-700">Update Overview</TableHead>
                <TableHead className="text-gray-700">Update Features</TableHead>
                <TableHead className="text-gray-700">Update Potential Application</TableHead>
                <TableHead className="text-gray-700">Update Unique Value</TableHead>
                <TableHead className="text-gray-700">Tanggal</TableHead>
                <TableHead className="text-gray-700 text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {data.map((item) => (
                <TableRow
                  key={item.id}
                  className="hover:bg-blue-50/40 transition-colors"
                >
                  
                  {/* Kolom Gambar */}
                  <TableCell>
                    <ImageCell images={item.updated_data.images} alt={item.Innovations.nama_inovasi} />
                  </TableCell>

                  <TableCell className="max-w-[200px] whitespace-normal wrap-break-word text-gray-700">
                    {item.Innovations.nama_inovasi}
                  </TableCell>
                  
                  <TableCell className="text-black">
                    {item.Profiles.nama}
                  </TableCell>

                  <TableCell className="text-gray-700 max-w-[200px] truncate">
                    <div
                      dangerouslySetInnerHTML={{ __html: item.updated_data.overview ?? "—"}}
                      style={{
                        paddingLeft: "1.5rem", // agar ul/ol terlihat menjorok
                        listStyleType: "initial", // ul = disc, ol = decimal
                        whiteSpace: "pre-wrap", // untuk line break
                      }}
                    /> 
                  </TableCell>
                  <TableCell className="text-gray-700 max-w-[200px] truncate">
                    <div
                      dangerouslySetInnerHTML={{ __html: item.updated_data.features ?? "—"}}
                      style={{
                        paddingLeft: "1.5rem", // agar ul/ol terlihat menjorok
                        listStyleType: "initial", // ul = disc, ol = decimal
                        whiteSpace: "pre-wrap", // untuk line break
                      }}
                    /> 
                  </TableCell>
                  <TableCell className="text-gray-700 max-w-[200px] truncate">
                    <div
                      dangerouslySetInnerHTML={{ __html: item.updated_data.potential_application ?? "—"}}
                      style={{
                        paddingLeft: "1.5rem", // agar ul/ol terlihat menjorok
                        listStyleType: "initial", // ul = disc, ol = decimal
                        whiteSpace: "pre-wrap", // untuk line break
                      }}
                    /> 
                  </TableCell>
                  <TableCell className="text-gray-700 max-w-[200px] truncate">
                    <div
                      dangerouslySetInnerHTML={{ __html: item.updated_data.unique_value?? "—"}}
                      style={{
                        paddingLeft: "1.5rem", // agar ul/ol terlihat menjorok
                        listStyleType: "initial", // ul = disc, ol = decimal
                        whiteSpace: "pre-wrap", // untuk line break
                      }}
                    /> 
                  </TableCell>

                  <TableCell className="text-gray-600">
                    {new Date(item.submitted_at).toLocaleDateString("id-ID")}
                  </TableCell>

                  {/* ACTION BUTTONS */}
                  <TableCell className="text-right space-x-2">
                    <Button
                      size="sm"
                      className="bg-green-600 hover:bg-green-700 text-white"
                      onClick={() => handleApprove(item.id)}
                    >
                      Setujui
                    </Button>

                    <Button
                      size="sm"
                      variant="destructive"
                      className="bg-red-600 hover:bg-red-700 text-white"
                      onClick={() => handleReject(item.id)}
                    >
                      Tolak
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


interface ImageItem {
  path: string;
  url: string;
}

interface ImageCellProps {
  images?: ImageItem[];
  alt?: string;
}

function ImageCell({ images = [], alt = "Gambar" }: ImageCellProps) {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(0);

  if (images.length === 0) return <>—</>;

  const prevImage = () =>
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  const nextImage = () =>
    setCurrent((prev) => (prev + 1) % images.length);

  return (
    <div className="relative inline-block">
      {/* Thumbnail */}
      <div
        className="flex gap-2 cursor-pointer items-center"
        onClick={() => setOpen(true)}
      >
        <Image
          src={images[0].url}
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
              src={images[current].url}
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
            {images.map((img, idx) => (
              <span
                key={img.path}
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

