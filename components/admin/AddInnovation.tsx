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
  overview: z.string().min(1, "Deskripsi wajib diisi"),
  features: z.string().min(1, "Deskripsi wajib diisi"),
  potential_application: z.string().min(1, "Deskripsi wajib diisi"),
  unique_value: z.string().min(1, "Deskripsi wajib diisi"),
  inovator: z.string().min(1, "Pilih inovator"),
  image: z.any().optional(), // file tidak divalidasi oleh zod
});

type InnovationForm = z.infer<typeof InnovationSchema>;

export default function AddInnovation() {
  const [status, setStatus] = useState<"success" | "error" | "">("");
  const [showWarning, setShowWarning] = useState(false);


  // form handling
  const form = useForm<InnovationForm>({
    resolver: zodResolver(InnovationSchema),
    defaultValues: {
      nama_inovasi: "",
      asal_inovasi: "",
      overview: "",
      features: "",
      potential_application: "",
      unique_value: "",
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
      formData.append("overview", values.overview);
      formData.append("features", values.features);
      formData.append("potential_application", values.potential_application);
      formData.append("unique_value", values.unique_value);
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
    <Card className="w-full border-gray-200 bg-white shadow-xl rounded-xl">
      <CardHeader className="bg-orange-50 border-b">
        <CardTitle className="text-xl font-semibold text-orange-600">
          Tambahkan Inovasi
        </CardTitle>
      </CardHeader>

      <CardContent className="mt-4">
        <Form {...form}>
          <form
            onSubmit={async (e) => {
              e.preventDefault();

              // trigger validasi semua field
              const isValid = await form.trigger();

              // jika tidak valid tampilkan warning
              if (!isValid) {
                setShowWarning(true);
                return;
              }

              setShowWarning(false);

              // jalankan fungsi submit asli
              form.handleSubmit(onSubmit)(e);
            }}
          >

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
                          placeholder="Contoh: Kota Surabaya"
                          className="bg-gray-50 focus-visible:ring-orange-500"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex flex-col md:flex-row gap-4">
                  <div className="w-full md:w-1/2">
                    {/* DROPDOWN INOVATOR */}
                    <FormField
                      control={form.control}
                      name="inovator"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-800">Inovator</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger
                                className="
                                  bg-white
                                  border 
                                  hover:border-orange-500 
                                  focus:border-orange-600 
                                  focus:ring-2 focus:ring-orange-300
                                  rounded-lg 
                                  shadow-sm 
                                  transition-all 
                                  duration-200
                                "
                              >
                                <SelectValue placeholder="Pilih inovator" />
                              </SelectTrigger>
                            </FormControl>

                            <SelectContent
                              className="
                                bg-white 
                                border border-gray-200 
                                shadow-lg
                                rounded-lg
                              "
                            >
                              {innovators.map((inv) => (
                                <SelectItem
                                  key={inv.id}
                                  value={inv.id}
                                  className="
                                    cursor-pointer
                                    px-3 py-2
                                    rounded-md
                                    transition-colors
                                    duration-150
                                    hover:bg-orange-50 
                                    hover:text-orange-700
                                    data-[state=checked]:bg-orange-100
                                    data-[state=checked]:text-orange-800
                                  "
                                >
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
                  <div className="w-full md:w-1/2">
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

                {/* Overview */}
                <FormField
                  control={form.control}
                  name="overview"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-800">Overview</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Masukkan keseluruhan inovasi secara lengkap"
                          className="bg-gray-50 min-h-[150px] focus-visible:ring-orange-500"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* KOLOM KANAN */}
              <div className="space-y-6">

                {/* Features */}
                <FormField
                  control={form.control}
                  name="features"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-800">Features</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Masukkan fitur dari inovasi secara lengkap"
                          className="bg-gray-50 min-h-[100px] focus-visible:ring-orange-500"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Potential Application */}
                <FormField
                  control={form.control}
                  name="potential_application"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-800">Potential Application</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Masukkan potensial dari inovasi secara lengkap"
                          className="bg-gray-50 min-h-[100px] focus-visible:ring-orange-500"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Unique Value */}
                <FormField
                  control={form.control}
                  name="unique_value"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-800">Unique Value</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Masukkan nilai keunikan inovasi secara lengkap"
                          className="bg-gray-50 min-h-[100px] focus-visible:ring-orange-500"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

              </div>
            </div>

            {/* TOMBOL SUBMIT */}

            {showWarning && (
              <div className="mb-4 p-3 rounded-lg bg-red-100 border border-red-300 text-red-800 text-sm">
                ⚠️ Masih ada form yang belum diisi. Silakan lengkapi semua kolom yang wajib diisi.
              </div>
            )}
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
