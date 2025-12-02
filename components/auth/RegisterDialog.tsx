"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

const registerSchema = z.object({
  email: z.string().email(),
  nama: z.string().min(3),
  password: z.string().min(6),
  kontak: z.string().optional(),
  deskripsi: z.string().optional(),
  lokasi: z.string().optional(),
});

type RegisterSchema = z.infer<typeof registerSchema>;

interface RegisterDialogProps {
  open: boolean;
  onOpenChange: (value: boolean) => void;
}

export function RegisterDialog({ open, onOpenChange }: RegisterDialogProps) {
  const [serverError, setServerError] = useState("");
  const [registrationMessage, setRegistrationMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      nama: "",
      kontak: "",
      deskripsi: "",
      lokasi: "",
    },
  });

  const onSubmit = async (values: RegisterSchema) => {
    setLoading(true);
    setServerError("");
    setRegistrationMessage("");

    try {
      const res = await fetch("/auth/validasi-inovator/action", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setServerError(data.message ?? "Terjadi masalah.");
        return;
      }

      // Success
      form.reset();
      setRegistrationMessage(data.message);
      window.location.reload()
    } catch (err) {
      setServerError(err instanceof Error? err.message: "Terjadi masalah server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-white shadow-2xl border-0 rounded-2xl">
        <DialogHeader>
          <DialogTitle>Registrasi Inovator</DialogTitle>
          <DialogDescription>
            Silakan isi data berikut untuk mendaftar sebagai inovator.
          </DialogDescription>
        </DialogHeader>

        {registrationMessage ? (
          <div className="p-4 bg-green-100 text-center rounded-xl text-green-800">
            <p>{registrationMessage}</p>

            <Button className="mt-4" onClick={() => onOpenChange(false)}>
              Tutup
            </Button>
          </div>
        ) : (
          <Form {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="example@gmail.com" />
                    </FormControl>
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
                    <FormLabel>Nama Lengkap</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="John doe" />
                    </FormControl>
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
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} placeholder="**********" />
                    </FormControl>
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
                    <FormLabel>Kontak</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="08xxxxxxxxxxx" />
                    </FormControl>
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
                    <FormLabel>Deskripsi</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Isi informasi singkat Anda" />
                    </FormControl>
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
                    <FormLabel>Lokasi</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Isi domisili/lokasi Anda"/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Error Server */}
              {serverError && (
                <p className="text-red-500 text-sm text-center">
                  {serverError}
                </p>
              )}

              <Button disabled={loading} className="w-full rounded-xl h-10 bg-amber-600 hover:bg-amber-200 hover:cursor-pointer" type="submit">
                {loading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" /> Mengirim...
                  </span>
                ) : (
                  "Daftar"
                )}
              </Button>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}
