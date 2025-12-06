"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { createCarousel } from "@/app/admin/carousel/action";
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
import { Textarea } from "../ui/textarea";

// ---------------------------
// ZOD SCHEMA
// ---------------------------
const CarouselSchema = z.object({
  judul: z.string().optional(),
  subjudul: z.string().optional(),
  redirect_url: z.string().optional(),
  order_index: z.number(),
  is_active: z.boolean(),
  image: z.any().optional(),
});

type CarouselForm = z.infer<typeof CarouselSchema>;

export default function AddCarousel() {
  const [status, setStatus] = useState<"" | "success" | "error">("");

  const form = useForm<CarouselForm>({
		resolver: zodResolver(CarouselSchema),
		defaultValues: {
      judul: "",
      subjudul: "",
      redirect_url: "",
			order_index: 0, 
			is_active: true,
		},
	});

  // ---------------------------
  // SUBMIT HANDLER
  // ---------------------------
  const onSubmit = async (values: CarouselForm) => {
    try {
      const formData = new FormData();
      formData.append("judul", values.judul || "");
      formData.append("subjudul", values.subjudul || "");
      formData.append("redirect_url", values.redirect_url || "");
      formData.append("order_index", values.order_index.toString());

      formData.append("is_active", "false");

      if (values.image) {
        formData.append("imageFile", values.image);
      }

      await createCarousel(formData);

      setStatus("success");
      form.reset();
      window.location.reload();
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <Card className="w-full border-gray-200 bg-white shadow-xl rounded-xl">
      <CardHeader className="bg-orange-50 shadow-sm">
        <CardTitle className="text-orange-600 text-xl font-semibold">
          Tambahkan Carousel Baru
        </CardTitle>
      </CardHeader>

      <CardContent className="mt-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* KOLOM KIRI */}
              <div className="space-y-6">

                {/* JUDUL */}
                <FormField
                  control={form.control}
                  name="judul"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Judul</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Masukkan judul"
                          className="border border-gray-400 focus:ring-orange-400 focus:border-none rounded-md transition-colors"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* REDIRECT URL */}
                <FormField
                  control={form.control}
                  name="redirect_url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Redirect URL</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://contoh.com"
                          className="border border-gray-400 focus:ring-orange-400 focus:border-none rounded-md transition-colors"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* ORDER INDEX */}
                <FormField
                  control={form.control}
                  name="order_index"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Urutan Tampilan</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          className="border border-gray-400 focus:ring-orange-400 focus:border-none rounded-md transition-colors"
                          placeholder="0"
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

              </div>

              {/* KOLOM KANAN */}
              <div className="space-y-6">

                {/* SUBJUDUL */}
                <FormField
                  control={form.control}
                  name="subjudul"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subjudul</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Subjudul (opsional)"
                          className="border border-gray-400 focus:ring-orange-400 focus:border-none rounded-md transition-colors"
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
                      <FormLabel>Gambar Carousel</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept="image/*"
                          className="border border-gray-400 focus:ring-orange-400 focus:border-none rounded-md transition-colors"
                          onChange={(e) => field.onChange(e.target.files?.[0])}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

              </div>
            </div>

            <div className="flex justify-end mt-6">
              <Button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white px-6">
                Simpan
              </Button>

              <div className="pt-2 ml-4">
                {status === "success" && (
                  <p className="text-green-600 font-medium">Carousel berhasil disimpan!</p>
                )}
                {status === "error" && (
                  <p className="text-red-600 font-medium">Gagal menyimpan data!</p>
                )}
              </div>
            </div>

          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
