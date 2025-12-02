"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { createInnovation, getInovators } from "@/app/admin/innovation/action";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";

// ---------------------------
// ZOD SCHEMA
// ---------------------------
const InnovationSchema = z.object({
  nama_inovasi: z.string().min(1, "Nama inovasi wajib diisi"),
  asal_inovasi: z.string(),
  deskripsi_inovasi: z.string().min(1, "Deskripsi wajib diisi"),
  inovator: z.string().min(1, "Pilih inovator"),
  image: z.any().optional(), // file tidak divalidasi oleh zod
});


type InnovationForm = z.infer<typeof InnovationSchema>;


export default function AddInnovation() {
  const [status, setStatus] = useState<"success" | "error" | "">("");

  // form handling
  const form = useForm<InnovationForm>({
    resolver: zodResolver(InnovationSchema),
    defaultValues: {
      nama_inovasi: "",
      asal_inovasi: "",
      deskripsi_inovasi: "",
      inovator: "",
    },
  });

  // Ambil data inovator untuk bagian dropdown
  const [innovators, setInnovators] = useState<
    {id: string; name:string }[]
  >([]);

  useEffect(() => {
    async function loadData() {
      const result = await getInovators();
      setInnovators(result);
    }
    loadData();
  }, []);

  // submit handling
  const onSubmit = async (values: InnovationForm) => {
    try {
      const formData = new FormData();
      formData.append("nama_inovasi", values.nama_inovasi);
      formData.append("asal_inovasi", values.asal_inovasi);
      formData.append("deskripsi_inovasi", values.deskripsi_inovasi);
      formData.append("id_inovator", values.inovator);

      if (values.image) {
        formData.append("imageFile", values.image);
      }

      await createInnovation(formData);

      setStatus("success");
      // Reset form setelah submit
      form.reset();
      // Reload halaman agar table ter-refresh
      window.location.reload()
    } catch (err) {
      console.error("Gagal membuat inovasi:", err);
      setStatus("error");
    }
  };


  return (
    <Card className="w-full border rounded-xl shadow-sm bg-white">
      <CardHeader className="bg-orange-50 border-b">
        <CardTitle className="text-xl font-semibold text-orange-600">
          Tambahkan Inovasi
        </CardTitle>
      </CardHeader>

      <CardContent className="mt-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>

            {/* GRID 2 KOLOM */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* KOLOM KIRI */}
              <div className="space-y-6">

                {/* NAMA INOVASI */}
                <FormField
                  control={form.control}
                  name="nama_inovasi"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-800">Nama Inovasi</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Masukkan nama inovasi"
                          className="bg-gray-50 focus-visible:ring-orange-500"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* ASAL INOVASI */}
                <FormField
                  control={form.control}
                  name="asal_inovasi"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-800">Asal Inovasi</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Contoh: Kota Malang"
                          className="bg-gray-50 focus-visible:ring-orange-500"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* DROPDOWN INOVATOR */}
                <FormField
                  control={form.control}
                  name="inovator"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-800">Inovator</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-gray-50 focus-visible:ring-orange-500">
                            <SelectValue placeholder="Pilih inovator" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {innovators.map((inv) => (
                            <SelectItem key={inv.id} value={inv.id}>
                              {inv.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

              </div>

              {/* KOLOM KANAN */}
              <div className="space-y-6">

                {/* TEXTAREA DESKRIPSI */}
                <FormField
                  control={form.control}
                  name="deskripsi_inovasi"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-800">Deskripsi Inovasi</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Masukkan deskripsi inovasi secara lengkap"
                          className="bg-gray-50 min-h-[200px] focus-visible:ring-orange-500"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* UPLOAD GAMBAR */}
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-800">Gambar Inovasi</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept="image/*"
                          className="bg-gray-50"
                          onChange={(e) => field.onChange(e.target.files?.[0])}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* TOMBOL SUBMIT */}
            <div className="flex justify-end mt-6">
              <Button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 text-white px-6"
              >
                Simpan
              </Button>
              {/* Status message */}
              <div className="pt-2">
                {status === "success" && (
                  <p className="text-green-600 font-medium">Inovasi berhasil disimpan!</p>
                )}
                {status === "error" && (
                  <p className="text-red-600 font-medium">Gagal menyimpan inovasi!</p>
                )}
              </div>
            </div>

          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
