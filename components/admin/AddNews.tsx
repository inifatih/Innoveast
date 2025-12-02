"use client";

import { createNews } from "@/app/admin/news/action";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

// ---------------------------
// ZOD SCHEMA
// ---------------------------
const NewsSchema = z.object({
  judul_news: z.string().min(1, "Isi judul berita"),
  category_news: z.string().min(1, "Isi kategori berita"),
  tanggal_news: z.string(),
  deskripsi_news: z.string().min(1, "Isi deskripsi berita"),
  penulis_news: z.string().min(1, "Isi penulis berita"),
  image: z.any().optional(),
});

type NewsFormInput = z.infer<typeof NewsSchema>;

export default function AddNews() {
  const [status, setStatus] = useState<"success" | "error" | "">("");
    
  // form handler
  const form = useForm<NewsFormInput>({
    resolver: zodResolver(NewsSchema),
    defaultValues: {
      judul_news: "",
      category_news: "",
      tanggal_news: "", // string
      deskripsi_news: "",
      penulis_news: "",
    },
  });

  // submit handler
  const onSubmit = async (values: NewsFormInput) => {
    try {
      const formData = new FormData();

      formData.append("judul_news", values.judul_news);
      formData.append("category_news", values.category_news);
      formData.append("tanggal_news", values.tanggal_news); // string "YYYY-MM-DD"
      formData.append("deskripsi_news", values.deskripsi_news);
      formData.append("penulis_news", values.penulis_news);

      if(values.image) {
        formData.append("imageFile", values.image)
      }

      await createNews(formData);

      setStatus("success");
      // Reset form
      form.reset();
      // Reload halaman
      window.location.reload();
    } catch (err) {
      console.error("Gagal membuat berita:", err);
      setStatus("error");
    }
};


  return (
    <Card className="w-full border-orange-300 bg-white shadow-md rounded-xl">
      <CardHeader className="bg-orange-50 border-b">
        <CardTitle className="text-orange-600 text-xl font-semibold">Tambah Berita</CardTitle>
      </CardHeader>

      <CardContent className="my-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Judul */}
              <FormField
                control={form.control}
                name="judul_news"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Judul Berita</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Masukkan judul berita"
                        className="bg-white border-gray-300"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Masukan judul berita yang dibuat
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Kategori */}
              <FormField
                control={form.control}
                name="category_news"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kategori Berita</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Masukkan kategori"
                        className="bg-white border-gray-300"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Masukan kategori berita yang dibuat
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Tanggal */}
              <FormField
                control={form.control}
                name="tanggal_news"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tanggal Berita</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        className="bg-white border-gray-300"
                        {...field}
                        value={field.value ? new Date(field.value).toISOString().split("T")[0] : ""}
                        onChange={(e) => field.onChange(e.target.value)}
                      />
                    </FormControl>
                    <FormDescription>
                      Masukan tanggal berita yang dibuat
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />


              {/* Deskripsi */}
              <FormField
                control={form.control}
                name="deskripsi_news"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Deskripsi Berita</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Masukkan deskripsi berita"
                        className="bg-white border-gray-300"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Masukan deskripsi berita yang dibuat
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Penulis */}
              <FormField
                control={form.control}
                name="penulis_news"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Penulis Berita</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Masukkan nama penulis"
                        className="bg-white border-gray-300"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Masukan penulis berita yang dibuat
                    </FormDescription>
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
                      <FormLabel>Gambar Berita</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept="image/*"
                          className="bg-white border-gray-300"
                          onChange={(e) => field.onChange(e.target.files?.[0])}
                        />
                      </FormControl>
                      <FormDescription>
                        Masukan gambar berita
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
            </div>
            <div className="text-right">
              {/* Button */}
              <div className="px-4">
                <Button
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-600 text-white px-6"
                >
                  Simpan
                </Button>
                
                {/* Status message */}
                <div>
                  {status === "success" && (
                    <p className="text-green-600 font-medium">Berita berhasil disimpan</p>
                  )}
                  {status === "error" && (
                    <p className="text-red-600 font-medium">Gagal menyimpan berita</p>
                  )}
                </div>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
