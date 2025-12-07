"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { getCategories } from "@/app/admin/categories/action";
import { createInnovation, getInovators } from "@/app/admin/innovation/action";

import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { TiptapEditor } from "./TipTapEditor";

// --------------------
// Schema Zod
// --------------------
const InnovationSchema = z.object({
  nama_inovasi: z.string().min(1),
  asal_inovasi: z.string(),
  overview: z.string().min(1),
  features: z.string().min(1),
  potential_application: z.string().min(1),
  unique_value: z.string().min(1),
  inovator: z.string().min(1),
  categories: z.array(z.string()).min(1),
  images: z.array(z.any()).optional(),
  tiktok_url: z.string().optional(),
  instagram_url: z.string().optional(),
  youtube_url: z.string().optional(),
});

type InnovationForm = z.infer<typeof InnovationSchema>;

export default function AddInnovationForm() {
  const [innovators, setInnovators] = useState<{ id: string; name: string }[]>([]);
  const [categories, setCategories] = useState<{ id: string; nama_kategori: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"success" | "error" | "">("");

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
      categories: [],
      images: [],
      tiktok_url: "",
      instagram_url: "",
      youtube_url: "",
    },
  });

  useEffect(() => {
    async function loadData() {
      const inv = await getInovators();
      const cat = await getCategories();
      setInnovators(inv);
      setCategories(cat);
    }
    loadData();
  }, []);

  const onSubmit = async (values: InnovationForm) => {
    setLoading(true);
    setStatus("");
    try {
      const formData = new FormData();

      formData.append("nama_inovasi", values.nama_inovasi);
      formData.append("asal_inovasi", values.asal_inovasi);
      formData.append("overview", values.overview);
      formData.append("features", values.features);
      formData.append("potential_application", values.potential_application);
      formData.append("unique_value", values.unique_value);
      formData.append("id_inovator", values.inovator);

      formData.append("tiktok_url", values.tiktok_url || "");
      formData.append("instagram_url", values.instagram_url || "");
      formData.append("youtube_url", values.youtube_url || "");

      values.categories.forEach((cat) => formData.append("categories", cat));
      values.images?.forEach((file) => formData.append("images", file));

      await createInnovation(formData);
      setStatus("success");
      form.reset();
      window.location.reload()
    } catch (err) {
      console.error(err);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full border-gray-200 bg-white shadow-xl rounded-xl">
      <CardHeader className="bg-orange-50 shadow-sm">
        <CardTitle className="text-orange-600 text-xl font-semibold">
          Tambah Inovasi
        </CardTitle>
      </CardHeader>

      <CardContent className="mt-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            
            {/* Nama Inovasi */}
            <FormField
              control={form.control}
              name="nama_inovasi"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Inovasi</FormLabel>
                  <FormControl>
                    <Input placeholder="Masukkan nama inovasi" className="border border-gray-400 focus:ring-orange-400 focus:border-none rounded-md transition-colors" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Asal Inovasi */}
            <FormField
              control={form.control}
              name="asal_inovasi"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Asal Inovasi</FormLabel>
                  <FormControl>
                    <Input placeholder="Contoh: Surabaya" className="border border-gray-400 focus:ring-orange-400 focus:border-none rounded-md transition-colors"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Inovator */}
            <FormField
              control={form.control}
              name="inovator"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Inovator</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih inovator" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white">
                      {innovators.map((inv) => (
                        <SelectItem
                          key={inv.id}
                          value={String(inv.id)}
                          className="
                            text-gray-700
                            focus:bg-orange-400 focus:text-white
                            data-highlighted:bg-orange-400 data-highlighted:text-white 
                            data-[state=checked]:bg-orange-600 data-[state=checked]:text-white 
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



            {/* Categories */}
            <FormField
              control={form.control}
              name="categories"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kategori</FormLabel>
                  <FormDescription className="text-gray-600 text-sm">
                    Pilih kategori di bawah yang sesuai dengan inovasi
                  </FormDescription>
                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2 p-3 rounded bg-gray-50">
                    {categories.map((cat) => {
                      const isChecked = field.value?.includes(cat.nama_kategori);
                      return (
                        <label
                          key={cat.id}
                          className={`
                            flex items-center justify-center gap-2 cursor-pointer 
                            rounded-md px-3 py-2 transition-colors font-semibold text-sm
                            ${isChecked ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-800"}
                            hover:bg-orange-100
                            active:bg-orange-500 active:text-white
                          `}
                        >
                          <span>{cat.nama_kategori}</span>
                          <input
                            type="checkbox"
                            checked={isChecked}
                            className="hidden"
                            onChange={(e) => {
                              if (e.target.checked) {
                                field.onChange([...(field.value || []), cat.nama_kategori]);
                              } else {
                                field.onChange(field.value.filter((v) => v !== cat.nama_kategori));
                              }
                            }}
                          />
                        </label>
                      );
                    })}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />


            {/* Overview */}
            <FormField
              control={form.control}
              name="overview"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Overview</FormLabel>
                  <FormControl>
                    {/* Di sini kita menggunakan TiptapEditor.
                      field.value dan field.onChange di-pass ke komponen TipTap.
                      field.onBlur dan field.name (yang diperlukan oleh react-hook-form) 
                      tetap dapat digunakan, meskipun TiptapEditor fokus pada value/onChange.
                    */}
                    <TiptapEditor
                      value={field.value}
                      onChange={field.onChange} // Mengambil HTML dari editor
                    />
                  </FormControl>
                  <FormDescription className="text-gray-600 text-sm">
                    Tulis ringkasan dari inovasi
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Features */}
            <FormField
              control={form.control}
              name="features"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Features</FormLabel>
                  <FormControl>
                    <TiptapEditor
                      value={field.value}
                      onChange={field.onChange} // Mengambil HTML dari editor
                    />
                  </FormControl>
                  <FormDescription className="text-gray-600 text-sm">
                    Tulis fitur-fitur dari inovasi
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Potential App */}
            <FormField
              control={form.control}
              name="potential_application"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Potential Application</FormLabel>
                  <FormControl>
                    <TiptapEditor
                      value={field.value}
                      onChange={field.onChange} // Mengambil HTML dari editor
                    />
                  </FormControl>
                  <FormDescription className="text-gray-600 text-sm">
                    Tulis potensi aplikasi dari inovasi
                  </FormDescription>
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
                  <FormLabel>Unique Value</FormLabel>
                  <FormControl>
                    <TiptapEditor
                      value={field.value}
                      onChange={field.onChange} // Mengambil HTML dari editor
                    />
                  </FormControl>
                  <FormDescription className="text-gray-600 text-sm">
                    Tulis nilai keunikan dari inovasi
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Social Media */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="tiktok_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>TikTok URL</FormLabel>
                    <FormControl>
                      <Input className="border border-gray-400 focus:ring-orange-400 focus:border-none rounded-md transition-colors" {...field}  />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="instagram_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Instagram URL</FormLabel>
                    <FormControl>
                      <Input className="border border-gray-400 focus:ring-orange-400 focus:border-none rounded-md transition-colors" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="youtube_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>YouTube URL</FormLabel>
                    <FormControl>
                      <Input className="border border-gray-400 focus:ring-orange-400 focus:border-none rounded-md transition-colors" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            {/* Images */}
            <FormField
              control={form.control}
              name="images"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Media Inovasi (Gambar / Video)</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      multiple
                      accept="image/*,video/*"
                      onChange={(e) => field.onChange(Array.from(e.target.files || []))}
                      className="border border-gray-400 focus:ring-orange-400 focus:border-none rounded-md transition-colors"
                    />
                  </FormControl>
                  {field.value?.length ? (
                    <ul className="mt-2 space-y-1 text-sm">
                      {field.value.map((file, idx) => (
                        <li key={idx}>{file.name}</li>
                      ))}
                    </ul>
                  ) : null}

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <Button type="submit" disabled={loading} className="bg-amber-600 hover:bg-amber-500">
                {loading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="animate-spin h-4 w-4" /> Menyimpan...
                  </span>
                ) : (
                  "Simpan"
                )}
              </Button>
              {status === "success" && <span className="text-green-600 font-medium">Berhasil disimpan!</span>}
              {status === "error" && <span className="text-red-600 font-medium">Gagal menyimpan!</span>}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

