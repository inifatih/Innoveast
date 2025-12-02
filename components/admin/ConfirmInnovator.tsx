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
import { useEffect, useState } from "react";

import { approveInnovator, getPendingInnovators, rejectInnovator } from "@/app/admin/innovator/action";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// ---- Interface Data ----
export interface PendingInnovator {
  id: number;
  email: string;
  nama?: string;
  kontak?: string;
  lokasi?: string;
  deskripsi?: string;
  created_at: string;
}

export default function ConfirmInnovator() {
  const [data, setData] = useState<PendingInnovator[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch data
  const loadData = async () => {
    try {
      setLoading(true);
      const result = await getPendingInnovators();
      setData(result);
    } catch (err) {
      console.error("Error loading pending innovator:", err);
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
    await approveInnovator(id);
    loadData();
  };

  const handleReject = async (id: number) => {
    await rejectInnovator(id);
    loadData();
  };

  return (
    <Card className="w-full border rounded-xl shadow-sm bg-white mt-6">
      <CardHeader className="bg-orange-50 border-b">
        <CardTitle className="text-xl font-semibold text-orange-600">
          Konfirmasi Inovator
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0 mx-4">
        {loading ? (
          <div className="text-center py-6 text-gray-500">Loading...</div>
        ) : data.length === 0 ? (
          <div className="text-center py-6 text-gray-500 italic">
            Tidak ada inovator yang menunggu persetujuan.
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="text-gray-700">Nama</TableHead>
                <TableHead className="text-gray-700">Email</TableHead>
                <TableHead className="text-gray-700">Kontak</TableHead>
                <TableHead className="text-gray-700">Lokasi</TableHead>
                <TableHead className="text-gray-700">Deskripsi</TableHead>
                <TableHead className="text-gray-700">Tanggal</TableHead>
                <TableHead className="text-gray-700 text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {data.map((item) => (
                <TableRow
                  key={item.id}
                  className="hover:bg-orange-50/40 transition-colors"
                >
                  <TableCell className="text-gray-800">
                    {item.nama ?? "—"}
                  </TableCell>
                  <TableCell className="text-gray-700">
                    {item.email}
                  </TableCell>
                  <TableCell className="text-gray-700">
                    {item.kontak ?? "—"}
                  </TableCell>
                  <TableCell className="text-gray-700">
                    {item.lokasi ?? "—"}
                  </TableCell>
                  <TableCell className="text-gray-700 max-w-[200px] truncate">
                    {item.deskripsi ?? "—"}
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {new Date(item.created_at).toLocaleDateString("id-ID")}
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
