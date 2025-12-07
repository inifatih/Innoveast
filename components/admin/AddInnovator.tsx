"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { createNewUser } from "@/app/admin/innovator/action";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Eye, EyeOff } from "lucide-react";

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
  const [showPassword, setShowPassword] = useState(false);


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
      <CardHeader className="bg-orange-50 shadow-sm">
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
                        className="border border-gray-400 focus:ring-orange-400 focus:border-none rounded-md transition-colors"
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
                      <div className="relative">
                        <Input {...field} type={showPassword ? "text" : "password"} placeholder="••••••••" className="border border-gray-400 focus:ring-orange-400 focus:border-none rounded-md transition-colors"/>
                        <Button type="button" className="absolute inset-y-0 right-0 px-3 flex items-center text-sm text-gray-500" onClick={() => setShowPassword(!showPassword)}>
                          {showPassword ? (
                            <Eye className="h-4 w-4"/>
                          ) : (
                            <EyeOff className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
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
                        className="border border-gray-400 focus:ring-orange-400 focus:border-none rounded-md transition-colors"
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
                        className="border border-gray-400 focus:ring-orange-400 focus:border-none rounded-md transition-colors"
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
                        className="border border-gray-400 focus:ring-orange-400 focus:border-none rounded-md transition-colors"
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
                        className="border border-gray-400 focus:ring-orange-400 focus:border-none rounded-md transition-colors"
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
