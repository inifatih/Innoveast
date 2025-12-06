"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { getCategories } from "@/app/admin/categories/action";
import { useEffect, useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Struktur category sesuai getCategories()
export interface CategoryItem {
  id: string | number;
  nama_kategori: string;
  deskripsi: string;
}


export default function TableCategories() {
  const [data, setData] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const categories = await getCategories();
      setData(categories);
    } catch (err) {
      console.error("Error fetching categories:", err);
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
          Daftar Kategori Inovasi
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0 mx-4">
        {loading ? (
          <div className="text-center py-6 text-gray-500">Loading...</div>
        ) : data.length === 0 ? (
          <div className="text-center py-6 text-gray-500 italic">
            Belum ada kategori.
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="text-gray-700">Nama Kategori</TableHead>
                <TableHead className="text-gray-700">Deskripsi</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {data.map((item) => (
                <TableRow key={item.id} className="hover:bg-blue-50/40">
                  <TableCell className="text-gray-800">
                    {item.nama_kategori}
                  </TableCell>
                  <TableCell className="text-gray-800">
                    {item.deskripsi}
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
