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

import { getAllInnovators } from "@/app/admin/innovator/action";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface InnovatorItem {
  id: string | number;
  email: string;
  nama: string;
  kontak?: string | null;
  deskripsi?: string | null;
  lokasi?:string | null;
  created_at: string;
}

export default function TableInnovator() {
  const [data, setData] = useState<InnovatorItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const innovators = await getAllInnovators();
      setData(innovators);
    } catch (err) {
      console.error("Error fetching innovators:", err);
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
      <CardHeader className="bg-blue-50 border-b">
        <CardTitle className="text-xl font-semibold text-blue-600">
          Daftar Inovator
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0 mx-4">
        {loading ? (
          <div className="text-center py-6 text-gray-500">Loading...</div>
        ) : data.length === 0 ? (
          <div className="text-center py-6 text-gray-500 italic">
            Belum ada data inovator.
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="text-gray-700">Nama</TableHead>
                <TableHead className="text-gray-700">Kontak</TableHead>
                <TableHead className="text-gray-700">Deskripsi</TableHead>
                <TableHead className="text-gray-700">Tanggal</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {data.map((item) => (
                <TableRow key={item.id} className="hover:bg-blue-50/40">
                  <TableCell className="text-gray-800">{item.nama}</TableCell>
                  <TableCell className="text-gray-700">
                    {item.kontak ?? "—"}
                  </TableCell>
                  <TableCell className="text-gray-700">
                    {item.deskripsi ?? "—"}
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
