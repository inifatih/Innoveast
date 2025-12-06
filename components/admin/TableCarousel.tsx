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

import { getAllCarousel, updateCarouselStatus } from "@/app/admin/carousel/action";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import Image from "next/image";
import { Label } from "../ui/label";

// Struktur data carousel
export interface CarouselItem {
  id: string;
  created_at: string;
  judul?: string | null;
  subjudul?: string | null;
  redirect_url?: string | null;
  order_index?: number;
  is_active?: boolean;

  // Kolom baru
  image_url?: string | null;
}

export default function TableCarousel() {
  const [data, setData] = useState<CarouselItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const items = await getAllCarousel();
      setData(items);
    } catch (err) {
      console.error("Error fetching carousel data:", err);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleToggle = async (id: string, current: boolean | undefined) => {
    setUpdating(id);

    try {
      await updateCarouselStatus(id, !current);
      // update UI tanpa harus reload seluruh table
      setData((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, is_active: !current } : item
        )
      );
    } catch (err) {
      console.error("Update status failed:", err);
    } finally {
      setUpdating(null);
    }
  };

  return (
    <Card className="w-full border-gray-200 bg-white shadow-xl rounded-xl mt-6">
      <CardHeader className="bg-orange-50 shadow-sm">
        <CardTitle className="text-orange-600 text-xl font-semibold">
          Daftar Carousel
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0 mx-4">
        {loading ? (
          <div className="text-center py-6 text-gray-500">Loading...</div>
        ) : data.length === 0 ? (
          <div className="text-center py-6 text-gray-500 italic">
            Belum ada data carousel.
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="text-gray-700">Gambar</TableHead>
                <TableHead className="text-gray-700">Judul</TableHead>
                <TableHead className="text-gray-700">Subjudul</TableHead>
                <TableHead className="text-gray-700">Link</TableHead>
                <TableHead className="text-gray-700">Urutan</TableHead>
                <TableHead className="text-gray-700">Status</TableHead>
                <TableHead className="text-gray-700">Dibuat</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {data.map((item) => (
                <TableRow key={item.id} className="hover:bg-orange-50/40">
                  {/* Gambar */}
                  <TableCell>
                    {item.image_url ? (
                      <Image
                        src={item.image_url}
                        alt={item.judul ?? "—"}
                        width={48}
                        height={48}
                        className="h-12 w-12 object-cover rounded-md border"
                      />
                    ) : (
                      "—"
                    )}
                  </TableCell>

                  <TableCell className="text-gray-800">
                    {item.judul ?? "—"}
                  </TableCell>

                  <TableCell className="text-gray-700">
                    {item.subjudul ?? "—"}
                  </TableCell>

                  <TableCell className="text-blue-600 underline">
                    {item.redirect_url ?? "—"}
                  </TableCell>

                  <TableCell className="text-gray-700">
                    {item.order_index ?? "0"}
                  </TableCell>

                  {/* ACTIVE STATUS SWITCH */}
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id={`carousel-${item.id}`}
                        checked={item.is_active ?? false}
                        disabled={updating === item.id}
                        onCheckedChange={() => handleToggle(item.id, item.is_active)}
                        className={`
                          h-6 w-11 rounded-full border transition-all

                          ${item.is_active 
                            ? "bg-green-500 border-green-600" 
                            : "bg-gray-200 border-gray-300"
                          }

                          ${updating === item.id ? "opacity-50 cursor-not-allowed" : ""}

                          [&>span]:h-5 [&>span]:w-5 [&>span]:rounded-full [&>span]:bg-white [&>span]:shadow 
                          [&>span]:transition-transform [&>span]:duration-200

                          ${item.is_active 
                            ? "[&>span]:translate-x-5" 
                            : "[&>span]:translate-x-0"
                          }
                        `}
                      />
                      <Label className="font-light">{item.is_active? "Active" : "Not Active"}</Label>
                    </div>
                  </TableCell>




                  <TableCell className="text-gray-600">
                    {item.created_at
                      ? new Date(item.created_at).toLocaleDateString("id-ID")
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
