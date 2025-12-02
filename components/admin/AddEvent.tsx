"use client";

import { createEvent } from "@/app/admin/events/action";
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
const EventsSchema = z.object({
  judul_event: z.string().min(1, "Isi judul berita"),
  category_event: z.string().min(1, "Isi kategori berita"),
  tanggal_event: z.string(),
  lokasi_event: z.string().min(1, "Isi deskripsi berita"),
  deskripsi_event: z.string().min(1, "Isi penulis berita"),
  image: z.any().optional(),
});

type EventsFormInput = z.infer<typeof EventsSchema>;

export default function AddEvent() {

  const [status, setStatus] = useState<"success" | "error" | "">("");

  // form handler
    const form = useForm<EventsFormInput>({
      resolver: zodResolver(EventsSchema),
      defaultValues: {
        judul_event: "",
        category_event: "",
        tanggal_event: "", // string
        lokasi_event: "",
        deskripsi_event: "",
      },
    });

  // submit handler
    const onSubmit = async (values: EventsFormInput) => {
      try {
        const formData = new FormData();
        formData.append("judul_event", values.judul_event);
        formData.append("category_event", values.category_event);
        formData.append("tanggal_event", values.tanggal_event);
        formData.append("lokasi_event", values.lokasi_event);
        formData.append("deskripsi_event", values.deskripsi_event);

        if (values.image) {
          formData.append("imageFile", values.image);
        }
        
        await createEvent(formData);

        setStatus("success");
        // Reset form setelah submit
        form.reset();
        // Reload halaman agar table refresh
        window.location.reload()
      } catch (err) {
        console.error("Gagal membuat acara:", err);
        setStatus("error")
      }
    };

  return (
    <Card className="w-full border-orange-300 bg-white shadow-md rounded-xl">
      <CardHeader className="bg-orange-50 border-b">
        <CardTitle className="text-orange-600 text-xl font-semibold">
          Tambah Acara
        </CardTitle>
      </CardHeader>

      <CardContent className="my-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Judul Acara */}
              <FormField
                control={form.control}
                name="judul_event"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-800">Judul Acara</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-gray-50 focus-visible:ring-orange-500"
                        placeholder="Judul acara"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-gray-500">
                      Masukkan judul acara yang dibuat
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Kategori Acara */}
              <FormField
                control={form.control}
                name="category_event"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-800">Kategori Acara</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-gray-50 focus-visible:ring-orange-500"
                        placeholder="Kategori acara"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-gray-500">
                      Masukkan kategori acara yang dibuat
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Tanggal Acara */}
              <FormField
                control={form.control}
                name="tanggal_event"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-800">Tanggal Acara</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        className="bg-white border-gray-300"
                        {...field}
                        value={field.value ? new Date(field.value).toISOString().split("T")[0] : ""}
                        onChange={(e) => field.onChange(e.target.value)}
                      />
                    </FormControl>
                    <FormDescription className="text-gray-500">
                      Masukkan tanggal acara yang dibuat
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Lokasi Acara */}
              <FormField
                control={form.control}
                name="lokasi_event"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-800">Lokasi Acara</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-gray-50 focus-visible:ring-orange-500"
                        placeholder="Lokasi acara"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-gray-500">
                      Masukkan lokasi acara yang dibuat
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Deskripsi Acara */}
              <FormField
                control={form.control}
                name="deskripsi_event"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-800">Deskripsi Acara</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-gray-50 focus-visible:ring-orange-500"
                        placeholder="Deskripsi acara"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-gray-500">
                      Masukkan deskripsi acara yang dibuat
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
                      <FormLabel className="text-gray-800">Gambar Acara</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept="image/*"
                          className="bg-gray-50 focus-visible:ring-orange-500"
                          onChange={(e) => field.onChange(e.target.files?.[0])}
                        />
                      </FormControl>
                      <FormDescription className="text-gray-500">
                        Masukkan gambar acara
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
            </div>
            <div className="text-right">
              {/* Submit */}
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
                    <p className="text-green-600 font-medium">Acara berhasil disimpan!</p>
                  )}
                  {status === "error" && (
                    <p className="text-red-600 font-medium">Gagal menyimpan acara!</p>
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
