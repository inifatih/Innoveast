"use client";

import { updateProfile } from "@/app/(MainLayout)/profile/action";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Pencil, Save, X } from "lucide-react";
import Image from "next/image";
import { useState, useTransition } from "react";
import { toast } from "sonner";

type Profile = {
  nama?: string;
  kontak?: string;
  lokasi?: string;
  deskripsi?: string;
  image_url?: string | null;
};

export default function ProfileEditable({ data }: { data: Profile }) {
  const [edit, setEdit] = useState(false);
  const [isPending, startTransition] = useTransition();

  return (
    <section className="max-w-7xl items-center mx-auto my-4 px-4">
      <Card className="w-full shadow-lg border-none">
        <CardContent className="p-8 space-y-4 bg-white">
          {/* Header */}
          <div className="flex justify-end items-center mb-4">
            {!edit ? (
              <Button
                type="button"
                size="sm"
                className="bg-orange-500 text-white"
                onClick={() => setEdit(true)}
              >
                <Pencil className="h-4 w-4 mr-2" />
                Edit
              </Button>
            ) : (
              <Button
                type="button"
                size="sm"
                variant="outline"
                disabled={isPending}
                onClick={() => setEdit(false)}
              >
                <X className="h-4 w-4 mr-2" />
                Batal
              </Button>
            )}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);

              startTransition(async () => {
                try {
                  await updateProfile(formData);
                  toast.success("Profil berhasil diperbarui");
                  setEdit(false);
                } catch (err: any) {
                  toast.error(err.message || "Gagal memperbarui profil");
                }
              });
            }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {/* Kiri: Avatar */}
            <div className="flex flex-col items-center gap-4">
              <div className="relative h-48 w-48 rounded-full overflow-hidden border-4 border-orange-400 shadow">
                <Image
                  src={data.image_url || "/avatar-placeholder.png"}
                  alt="Avatar"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Kanan: Data diri */}
            <div className="md:col-span-2 space-y-6">
              <Field label="Nama Lengkap" name="nama" value={data.nama} edit={edit} />
              <Field label="Kontak" name="kontak" value={data.kontak} edit={edit} />
              <Field label="Lokasi" name="lokasi" value={data.lokasi} edit={edit} />
              <Field
                label="Deskripsi"
                name="deskripsi"
                value={data.deskripsi}
                edit={edit}
                textarea
              />
              <Input
                type="file"
                name="avatar"
                accept="image/*"
                className={`absolute inset-0 opacity-0 cursor-pointer ${edit ? "block" : "hidden"}`}
              />

              {/* Tombol submit juga selalu ada, tapi sembunyikan jika edit=false */}
              <div className={edit ? "flex justify-end" : "hidden"}>
                <Button
                  type="submit"
                  disabled={isPending}
                  className="bg-orange-500 hover:bg-orange-600 text-white"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Menyimpan...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Simpan
                    </>
                  )}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}

function Field({
  label,
  name,
  value,
  edit,
  textarea,
}: {
  label: string;
  name: string;
  value?: string;
  edit: boolean;
  textarea?: boolean;
}) {
  return (
    <div>
      <p className="text-xs font-semibold text-orange-600 mb-1">{label}</p>
      {edit ? (
        textarea ? (
          <Textarea name={name} defaultValue={value} />
        ) : (
          <Input name={name} defaultValue={value} />
        )
      ) : (
        <p className="text-sm font-medium text-gray-800">{value || "-"}</p>
      )}
    </div>
  );
}
