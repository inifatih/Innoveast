"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { getInnovationForEdit, submitInnovationUpdateRequest } from "@/app/(MainLayout)/profile/request-update/action";

import { TiptapEditor } from "@/components/admin/TipTapEditor";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useRouter } from "next/navigation";

const InnovationSchema = z.object({
  overview: z.string().min(1),
  features: z.string().min(1),
  potential_application: z.string().min(1),
  unique_value: z.string().min(1),
  tiktok_url: z.string().optional(),
  instagram_url: z.string().optional(),
  youtube_url: z.string().optional(),
  facebook_url: z.string().optional(),
  web_url: z.string().optional(),
  images: z.array(z.any()).optional(),
});

type InnovationForm = z.infer<typeof InnovationSchema>;

export default function EditInnovationForm({ id }: { id: number }) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"success" | "error" | "">("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [imagesPreview, setImagesPreview] = useState<string[]>([]);
  const router = useRouter();

  const form = useForm<InnovationForm>({
    resolver: zodResolver(InnovationSchema),
    defaultValues: {
      overview: "",
      features: "",
      potential_application: "",
      unique_value: "",
      tiktok_url: "",
      instagram_url: "",
      youtube_url: "",
      facebook_url: "",
      web_url: "",
      images: [],
    },
  });

  // Load data lama
  useEffect(() => {
    async function loadData() {
      try {
        const innovation = await getInnovationForEdit(id);
        form.reset({
          overview: innovation.overview ?? "",
          features: innovation.features ?? "",
          potential_application: innovation.potential_application ?? "",
          unique_value: innovation.unique_value ?? "",
          tiktok_url: innovation.tiktok_url ?? "",
          instagram_url: innovation.instagram_url ?? "",
          youtube_url: innovation.youtube_url ?? "",
          facebook_url: innovation.facebook_url ?? "",
          web_url: innovation.web_url ?? "",
          images: [],
        });

        const normalizeImages = (images: unknown): string[] => {
          if (!images) return [];
          if (Array.isArray(images)) return images;
          return [];
        };

        setImagesPreview(normalizeImages(innovation.images));
        setSelectedFiles([]);
      } catch (err) {
        console.error("Failed to load innovation:", err);
      }
    }
    loadData();
  }, [id, form]);

  // Submit
  const onSubmit = async (values: InnovationForm) => {
    setLoading(true);
    setStatus("");

    try {
      // Prepare data untuk request update
      const updatedData: Partial<InnovationForm> = {
        overview: values.overview,
        features: values.features,
        potential_application: values.potential_application,
        unique_value: values.unique_value,
        tiktok_url: values.tiktok_url || "",
        instagram_url: values.instagram_url || "",
        youtube_url: values.youtube_url || "",
        facebook_url: values.facebook_url || "",
        web_url: values.web_url || "",
        images: [
          ...imagesPreview, // gambar lama yang masih dipakai
          ...selectedFiles // nanti bisa diganti upload ke storage jika perlu
        ],
      };

      await submitInnovationUpdateRequest(id, updatedData);

      setStatus("success");
      router.push("/profile/request-update/"); // redirect ke halaman list inovasi
    } catch (err) {
      console.error(err);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full px-24 border-gray-200 bg-white shadow-xl rounded-xl">
      <CardHeader className="bg-orange-50 shadow-sm">
        <CardTitle className="text-orange-600 text-xl font-semibold">
          Edit Inovasi
        </CardTitle>
      </CardHeader>

      <CardContent className="mt-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

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

            {/* Potential Application */}
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
              <FormField control={form.control} name="tiktok_url" render={({ field }) => (
                <FormItem>
                  <FormLabel>TikTok URL</FormLabel>
                  <FormControl><Input {...field} /></FormControl>
                </FormItem>
              )} />
              <FormField control={form.control} name="instagram_url" render={({ field }) => (
                <FormItem>
                  <FormLabel>Instagram URL</FormLabel>
                  <FormControl><Input {...field} /></FormControl>
                </FormItem>
              )} />
              <FormField control={form.control} name="youtube_url" render={({ field }) => (
                <FormItem>
                  <FormLabel>YouTube URL</FormLabel>
                  <FormControl><Input {...field} /></FormControl>
                </FormItem>
              )} />
              <FormField control={form.control} name="facebook_url" render={({ field }) => (
                <FormItem>
                  <FormLabel>Facebook URL</FormLabel>
                  <FormControl><Input {...field} /></FormControl>
                </FormItem>
              )} />
              <FormField control={form.control} name="web_url" render={({ field }) => (
                <FormItem>
                  <FormLabel>Website URL</FormLabel>
                  <FormControl><Input {...field} /></FormControl>
                </FormItem>
              )} />
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
                        setSelectedFiles((prev) => [...prev, ...files]);
                        field.onChange([...(field.value ?? []), ...files]);
                      }}
                    />
                  </FormControl>

                  {/* Preview lama */}
                  {imagesPreview
                    .filter((url): url is string => typeof url === "string" && url.trim() !== "")
                    .map((url, idx) => (
                      <div key={url + idx} className="relative w-24 h-24">
                        <Image
                          src={url}
                          alt={`Image ${idx}`}
                          fill
                          className="object-cover rounded border"
                        />
                        <button
                          type="button"
                          className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                          onClick={() =>
                            setImagesPreview((prev) => prev.filter((_, i) => i !== idx))
                          }
                        >
                          x
                        </button>
                      </div>
                  ))}


                  {/* Preview file baru */}
                  {selectedFiles.map((file, idx) => (
                    <div key={file.name + idx} className="relative w-24 h-24">
                      <Image
                        src={URL.createObjectURL(file)}
                        alt={file.name}
                        fill
                        className="w-full h-full object-cover rounded border"
                        onLoad={(e) => URL.revokeObjectURL((e.target as HTMLImageElement).src)}
                      />
                      <button
                        type="button"
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                        onClick={() => {
                          setSelectedFiles(prev => prev.filter((_, i) => i !== idx));
                          field.onChange(field.value?.filter((_, i) => i !== idx));
                        }}
                      >
                        x
                      </button>
                    </div>
                  ))}

                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-4 items-center">
              <Button type="submit" disabled={loading} className="rounded-xl h-10 bg-amber-600 hover:bg-amber-200 hover:cursor-pointer">
                {loading ? <Loader2 className="animate-spin h-4 w-4" /> : "Ajukan Perubahan"}
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
