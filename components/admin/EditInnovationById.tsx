"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { getInnovationByIdForUpdate, updateInnovation } from "@/app/admin/innovation/action";

import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { TiptapEditor } from "./TipTapEditor";

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

export default function EditInnovationForm({ id }: { id: number}) {
  const [innovators, setInnovators] = useState<{ id: string; name: string }[]>([]);
  const [categories, setCategories] = useState<{ id: string; nama_kategori: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"success" | "error" | "">("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);


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

  // Load Default Values by ID
  useEffect(() => {
    async function loadData() {
      try {
        const innovationDetail = await getInnovationByIdForUpdate(id);

        // Ambil kategori tanpa null
        const safeCategories = (innovationDetail.categories ?? []).filter(
          (cat): cat is string => Boolean(cat)
        );

        // Reset form
        form.reset({
          nama_inovasi: innovationDetail.nama_inovasi ?? "",
          asal_inovasi: innovationDetail.asal_inovasi ?? "",
          overview: innovationDetail.overview ?? "",
          features: innovationDetail.features ?? "",
          potential_application: innovationDetail.potential_application ?? "",
          unique_value: innovationDetail.unique_value ?? "",
          inovator: innovationDetail.innovator?.id ?? "",
          categories: safeCategories, // ini array string
          images: [], // file input tetap kosong
          tiktok_url: innovationDetail.social?.tiktok ?? "",
          instagram_url: innovationDetail.social?.instagram ?? "",
          youtube_url: innovationDetail.social?.youtube ?? "",
        });

        // Set opsi untuk select/checkbox
        if (innovationDetail.innovator) {
          setInnovators([
            { id: innovationDetail.innovator.id, name: innovationDetail.innovator.nama }
          ]);
        }

        setCategories(
          safeCategories.map((cat) => ({ id: cat, nama_kategori: cat }))
        );

        setSelectedFiles([]); // preview kosong
      } catch (err) {
        console.error("Failed to load innovation detail:", err);
      }
    }

    loadData();
  }, [id, form]);


  // Update
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

      await updateInnovation(id, formData);

      setStatus("success");
      window.location.reload();
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
          Edit Inovasi
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
                    <Input {...field} placeholder="Masukkan nama inovasi" />
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
                    <Input {...field} placeholder="Contoh: Surabaya" />
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
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
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

            {/* Categories */}
            <FormField
              control={form.control}
              name="categories"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kategori</FormLabel>
                  <FormDescription>Pilih kategori yang sesuai</FormDescription>
                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2">
                    {categories.map((cat) => {
                      const checked = field.value.includes(cat.nama_kategori);
                      return (
                        <label key={cat.id} className={`cursor-pointer p-2 rounded-md ${checked ? "bg-orange-500 text-white" : "bg-gray-200"}`}>
                          <input
                            type="checkbox"
                            className="hidden"
                            checked={checked}
                            onChange={(e) => {
                              if (e.target.checked) {
                                field.onChange([...field.value, cat.nama_kategori]);
                              } else {
                                field.onChange(field.value.filter((v) => v !== cat.nama_kategori));
                              }
                            }}
                          />
                          {cat.nama_kategori}
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
                    <TiptapEditor value={field.value} onChange={field.onChange} />
                  </FormControl>
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
                    <TiptapEditor value={field.value} onChange={field.onChange} />
                  </FormControl>
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
                    <TiptapEditor value={field.value} onChange={field.onChange} />
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
                  <FormLabel>Unique Value</FormLabel>
                  <FormControl>
                    <TiptapEditor value={field.value} onChange={field.onChange} />
                  </FormControl>
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
                      <Input {...field} />
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
                      <Input {...field} />
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
                      <Input {...field} />
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
                        onChange={(e) => {
                            const files = Array.from(e.target.files || []);
                            setSelectedFiles((prev) => {
                              const updated = [...prev, ...files];
                              field.onChange(updated); // update react-hook-form dengan nilai terbaru
                              return updated;
                            });
                        }}
                        />
                    </FormControl>

                    {/* Preview selected files */}
                    {selectedFiles.length > 0 && (
                        <ul className="mt-2 space-y-1 text-sm">
                        {selectedFiles.map((file, idx) => (
                            <li key={idx} className="flex items-center justify-between gap-2">
                            <span>{file.name}</span>
                            <button
                                type="button"
                                className="text-red-500 font-bold"
                                onClick={() => {
                                const newFiles = selectedFiles.filter((_, i) => i !== idx);
                                setSelectedFiles(newFiles);
                                field.onChange(newFiles); // update react-hook-form
                                }}
                            >
                                X
                            </button>
                            </li>
                        ))}
                        </ul>
                    )}

                    <FormMessage />
                  </FormItem>
                )}
                />

            {/* Submit */}
            <div className="flex gap-4 items-center">
              <Button type="submit" disabled={loading}>
                {loading ? <Loader2 className="animate-spin h-4 w-4" /> : "Simpan"}
              </Button>
              {status === "success" && <span className="text-green-600">Berhasil disimpan!</span>}
              {status === "error" && <span className="text-red-600">Gagal menyimpan!</span>}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
