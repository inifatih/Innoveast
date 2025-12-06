"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { createNewCategory } from "@/app/admin/categories/action";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// ---- Schema Zod ----
const FormSchema = z.object({
  nama_kategori: z.string().min(1, "Nama kategori wajib diisi"),
  deskripsi: z.string().optional(),
});

type FormValues = z.infer<typeof FormSchema>;

export default function AddCategoriesForm() {
  const [status, setStatus] = useState("");

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      nama_kategori: "",
      deskripsi: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    setStatus("Processing...");
    const result = await createNewCategory(values);
    setStatus(result.message ?? "");
  };

  return (
    <Card className="w-full border-gray-200 bg-white shadow-xl rounded-xl">
      <CardHeader className="bg-blue-50 border-b">
        <CardTitle className="text-orange-600 text-xl font-semibold">
          Tambah Kategori Baru
        </CardTitle>
      </CardHeader>

      <CardContent className="mt-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Nama Kategori */}
              <FormField
                control={form.control}
                name="nama_kategori"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-800">Nama Kategori</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-gray-50 focus-visible:ring-blue-500"
                        placeholder="Contoh: Teknologi, Pertanian"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-gray-500">
                      Masukkan nama kategori
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Deskripsi */}
              <FormField
                control={form.control}
                name="deskripsi"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-800">Deskripsi</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-gray-50 focus-visible:ring-blue-500"
                        placeholder="Deskripsi kategori (opsional)"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-gray-500">
                      Berikan penjelasan singkat tentang kategori
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

            </div>

            <Button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-6"
            >
              Simpan Kategori
            </Button>
          </form>
        </Form>

        {status && (
          <p className="mt-4 text-sm text-gray-700">{status}</p>
        )}
      </CardContent>
    </Card>
  );
}
