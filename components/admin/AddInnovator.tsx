"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { createNewUser } from "@/app/admin/innovator/action";
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
  email: z.string().email(),
  password: z.string(),
  is_admin: z.boolean().catch(false),

  nama: z.string().optional(),
  kontak: z.string().optional(),
  lokasi: z.string().optional(),
  deskripsi: z.string().optional(),
});

type FormValues = z.infer<typeof FormSchema>;

export default function AddInnovator() {
  const [status, setStatus] = useState("");

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
      is_admin: false,
      nama: "",
      kontak: "",
      lokasi: "",
      deskripsi: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    setStatus("Processing...");
    const result = await createNewUser(values);
    setStatus(result.message ?? "");
  };

  return (
    <Card className="w-full border-gray-200 bg-white shadow-xl rounded-xl">
      <CardHeader className="bg-orange-50 border-b">
        <CardTitle className="text-orange-600 text-xl font-semibold">
          Tambah Inovator Baru
        </CardTitle>
      </CardHeader>

      <CardContent className="mt-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-800">Email</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-gray-50 focus-visible:ring-orange-500"
                        placeholder="Email pengguna"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-gray-500">
                      Masukkan email inovator
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-800">Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="*********"
                        className="bg-gray-50 focus-visible:ring-orange-500"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-gray-500">
                      Password minimal 6 karakter
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Nama */}
              <FormField
                control={form.control}
                name="nama"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-800">Nama</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-gray-50 focus-visible:ring-orange-500"
                        placeholder="Nama lengkap"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-gray-500">
                      Masukkan nama inovator
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Kontak */}
              <FormField
                control={form.control}
                name="kontak"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-800">Kontak</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-gray-50 focus-visible:ring-orange-500"
                        placeholder="08xxxxxxxxxx"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-gray-500">
                      Masukkan nomor telepon
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Lokasi */}
              <FormField
                control={form.control}
                name="lokasi"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-800">Lokasi</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-gray-50 focus-visible:ring-orange-500"
                        placeholder="Lokasi inovator"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-gray-500">
                      Masukkan domisili inovator
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
                        className="bg-gray-50 focus-visible:ring-orange-500"
                        placeholder="Deskripsi inovator"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-gray-500">
                      Berikan informasi singkat mengenai inovator
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white px-6"
            >
              Daftarkan Inovator
            </Button>
          </form>
        </Form>

        {status && (
          <p className="mt-4 text-sm text-gray-700">
            {status}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
