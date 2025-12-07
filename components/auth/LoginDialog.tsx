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

import { actionSignIn } from "@/app/auth/login/action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Loader2 } from "lucide-react";

// =========================
//  ZOD REGISTRATION SCHEMA
// =========================
const loginSchema = z
  .object({
    email: z.string().email("Email tidak valid"),
    password: z.string().min(6, "Password minimal 6 karakter"),
  })

type LoginSchema = z.infer<typeof loginSchema>;

export function LoginDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {

  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginMessage, setLoginMessage] = useState(""); // State untuk pesan sukses
  const [showPassword, setShowPassword] = useState(false);

  // Form
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Submit
  const onSubmit = async (values: LoginSchema) => {

    setLoading(true);
    setServerError("");
    setLoginMessage("");

    const result = await actionSignIn({
      email: values.email,
      password: values.password,
    });

    // safety check
    if (!result || !result.success) {
      setServerError(result?.message || "Login gagal");
      setLoading(false);
      return;
    }
    
    // success
    setLoginMessage(result.message || "Login berhasil");
    form.reset();
    setLoading(false);    
    window.location.reload()
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-white shadow-2xl border-0 rounded-2xl">
        <DialogHeader>
          <DialogTitle>Masuk</DialogTitle>
          <DialogDescription>Gunakan data yang valid untuk masuk.</DialogDescription>
        </DialogHeader>

        {/* Tambahkan tampilan pesan sukses */}
        {loginMessage ? (
          <div className="text-center p-4 text-green-800 rounded-lg">
            <p className="font-medium">{loginMessage}!</p>
            <Button onClick={() => onOpenChange(false)} className="mt-4 font-bold hover:bg-green-800 hover:text-white">Tutup</Button>
          </div>
        ) : (
          <Form {...form}>
            <form className="space-y-4 mt-4" onSubmit={form.handleSubmit(onSubmit)}>
              
              {/* ... (Field Email, Full Name, Password tetap sama) ... */}
              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} type="email" placeholder="you@example.com" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input {...field} type={showPassword ? "text" : "password"} placeholder="••••••••" />
                          <Button type="button" className="absolute inset-y-0 right-0 px-3 flex items-center text-sm text-gray-500" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? (
                              <EyeOff className="h-4 w-4"/>
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )
                }
                  
                }
              />

              {/* Server Error */}
              {serverError && (
                <p className="text-sm text-red-500 text-center font-medium">
                  {serverError}
                </p>
              )}

              <Button
                type="submit"
                className="w-full rounded-xl h-10 bg-amber-600 hover:bg-amber-200 hover:cursor-pointer"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="animate-spin h-4 w-4" /> Mencoba masuk...
                  </span>
                ) : (
                  "Login"
                )}
              </Button>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}