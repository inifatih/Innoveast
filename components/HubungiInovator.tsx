"use client";

import { sendQuestions } from "@/app/(MainLayout)/innovation/action"; // import function server
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { toast } from "sonner";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

interface ContactModalProps {
  id_inovasi: number;
  id_inovator: number;
}

export default function ContactModal({ id_inovasi, id_inovator }: ContactModalProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [preferensi, setPreferensi] = useState("Whatsapp");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const payload = {
      id_inovasi,
      id_inovator,
      nama_lengkap: formData.get("nama_lengkap") as string,
      instansi: formData.get("instansi") as string,
      telp: formData.get("telp") as string,
      email: formData.get("email") as string,
      preferensi_komunikasi: preferensi, // ambil dari state RadioGroup
      subjek: formData.get("subjek") as string,
      pesan: formData.get("pesan") as string,
    };

    try {
      await sendQuestions(payload);
      toast.success("Pertanyaan berhasil dikirim!");
      e.currentTarget.reset();
      setPreferensi("Whatsapp"); // reset radio ke default
      setOpen(false);
      window.location.reload(); // reload page setelah submit
    } catch (err: unknown) {
        if (err instanceof Error) {
      toast.error(err.message);
    } else {
      toast.error("Gagal mengirim pertanyaan");
    }
    } finally {
      setLoading(false);
      // setOpen(false); // tutup dialog setelah submit
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="mt-4 w-full px-4 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-200 hover:text-orange-600 transition-colors">
          Hubungi Inovator
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg bg-white">
        <DialogHeader>
          <DialogTitle>Tanyakan pada Inovator</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-4 mt-2">
          <Input name="nama_lengkap" placeholder="Nama Lengkap" required />
          <Input name="instansi" placeholder="Instansi / Perusahaan" required/>
          <Input name="telp" placeholder="No. Telepon" required/>
          <Input name="email" placeholder="Email" type="email" required/>
          <div>
            <p className="mb-2 font-semibold text-sm">Preferensi Komunikasi</p>
            <RadioGroup
              value={preferensi}
              onValueChange={setPreferensi}
              className="flex gap-4"
            >
              <div className="flex items-center gap-2">
                <RadioGroupItem value="Whatsapp" id="whatsapp" />
                <Label htmlFor="whatsapp">Whatsapp</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="Email" id="email" />
                <Label htmlFor="email">Email</Label>
              </div>
            </RadioGroup>
          </div>

          <Select name="subjek">
            <SelectTrigger>
              <SelectValue placeholder="Pilih Subjek" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="Informasi detil produk / teknologi">Informasi detil produk / teknologi</SelectItem>
              <SelectItem value="Informasi harga dan skema komersialisasi">Informasi harga dan skema komersialisasi</SelectItem>
              <SelectItem value="Inisiasi kerja sama / kemitraan">Inisiasi kerja sama / kemitraan</SelectItem>
              <SelectItem value="Peluang lisensi dan distribusi">Peluang lisensi dan distribusi</SelectItem>
              <SelectItem value="Permintaan pilot project / trial">Permintaan pilot project / trial</SelectItem>
              <SelectItem value="Keperluan media dan publikasi">Keperluan media dan publikasi</SelectItem>
              <SelectItem value="Lainnya">Lainnya</SelectItem>
            </SelectContent>
          </Select>

          <Textarea name="pesan" placeholder="Pesan pertanyaan" required />

          <Button type="submit" disabled={loading} className="bg-orange-500 hover:bg-orange-600 text-white">
            {loading ? "Mengirim..." : "Kirim Pertanyaan"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
