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

import { getAllEvent } from "@/app/admin/events/action";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

// Interface harus sesuai dengan server action
export interface EventItem {
  id: string | number;
  judul_event: string;
  category_event?: string | null;
  tanggal_event?: string | null;
  deskripsi_event?: string | null;
  lokasi_event?: string | null;
  created_at: string;

  // Kolom baru
  image_url?: string | null;
}

export default function TableEvent() {
  const [data, setData] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const events = await getAllEvent();
      setData(events);
    } catch (err) {
      console.error("Error fetching events:", err);
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
      <CardHeader className="bg-green-50 border-b">
        <CardTitle className="text-xl font-semibold text-green-600">
          Daftar Event
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0 mx-4">
        {loading ? (
          <div className="text-center py-6 text-gray-500">Loading...</div>
        ) : data.length === 0 ? (
          <div className="text-center py-6 text-gray-500 italic">
            Belum ada event.
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="text-gray-700">Gambar</TableHead>
                <TableHead className="text-gray-700">Judul Event</TableHead>
                <TableHead className="text-gray-700">Kategori</TableHead>
                <TableHead className="text-gray-700">Deskripsi</TableHead>
                <TableHead className="text-gray-700">Tanggal Event</TableHead>
                <TableHead className="text-gray-700">Lokasi</TableHead>
                <TableHead className="text-gray-700">Tanggal Input</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {data.map((item) => (
                <TableRow key={item.id} className="hover:bg-green-50/40">
                  {/* Kolom Gambar */}
                  <TableCell>
                    {item.image_url ? (
                      <Image
                        src={item.image_url}
                        alt={item.judul_event}
                        width={48}
                        height={48}
                        className="h-12 w-12 object-cover rounded-md border"
                      />
                    ) : (
                      "—"
                    )}
                  </TableCell>

                  <TableCell className="text-gray-800">
                    {item.judul_event}
                  </TableCell>

                  <TableCell className="text-gray-700">
                    {item.category_event ?? "—"}
                  </TableCell>

                  <TableCell className="text-gray-700">
                    {item.deskripsi_event ?? "—"}
                  </TableCell>

                  <TableCell className="text-gray-700">
                    {item.tanggal_event
                      ? new Date(item.tanggal_event).toLocaleDateString("id-ID")
                      : "—"}
                  </TableCell>

                  <TableCell className="text-gray-700">
                    {item.lokasi_event ?? "—"}
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
