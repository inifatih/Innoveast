"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

type InputFieldProps = {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function EventRegistrationForm() {
  const router = useRouter();
  const { slug } = useParams();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    whatsapp: "",
    gender: "",
    ageRange: "",
    institution: "",
    role: "",
    region: "",
    reasons: [] as string[],
    topics: [] as string[],
    participantCategory: "",
    attendanceMethod: "",
    specialNeeds: [] as string[],
    consentData: false,
    consentInfo: false,
  });

  const reasonOptions = [
    "Menambah wawasan",
    "Mencari jejaring",
    "Mencari peluang bisnis",
    "Ingin berkolaborasi",
    "Lainnya",
  ];

  const topicOptions = [
    "Inovasi & Teknologi",
    "UMKM & Bisnis",
    "Investasi",
    "Kebijakan Publik",
    "Digitalisasi",
  ];

  const specialNeedsOptions = ["Akses disabilitas", "Konsumsi khusus"];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const toggleArray = (key: keyof typeof form, value: string) => {
    setForm((prev) => {
      const arr = prev[key] as string[];
      return {
        ...prev,
        [key]: arr.includes(value)
          ? arr.filter((v) => v !== value)
          : [...arr, value],
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.consentData) {
      alert("Anda harus menyetujui penggunaan data.");
      return;
    }

    console.log({ ...form, eventSlug: slug });
    alert("Pendaftaran berhasil");
    router.back();
  };

  return (
    <main className="min-h-screen bg-slate-50">
      {/* HERO */}
      <section className="bg-linear-to-r from-teal-600 to-cyan-700 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl font-bold">
            Pendaftaran Event
          </h1>
          <p className="mt-2 text-sm sm:text-base text-white/90">
            Lengkapi formulir berikut untuk mengikuti acara
          </p>
        </div>
      </section>

      {/* FORM */}
      <section className="max-w-6xl mx-auto px-4 py-14">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-xl p-6 sm:p-10"
        >
          {/* GRID UTAMA */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* KIRI */}
            <div className="space-y-8">
              <SectionTitle title="Informasi Identitas Peserta" />
              <InputField label="Nama Lengkap" name="fullName" value={form.fullName} onChange={handleChange} />
              <InputField label="Email Aktif" name="email" type="email" value={form.email} onChange={handleChange} />
              <InputField label="Nomor WhatsApp" name="whatsapp" value={form.whatsapp} onChange={handleChange} />

              <SelectField label="Jenis Kelamin (Opsional)" name="gender" value={form.gender} onChange={handleChange}
                options={["Laki-laki", "Perempuan"]} />

              <SelectField label="Usia / Rentang Usia (Opsional)" name="ageRange" value={form.ageRange} onChange={handleChange}
                options={["< 20", "20–30", "31–40", "41–50", "> 50"]} />

              <SectionTitle title="Latar Belakang Peserta" />
              <InputField label="Instansi / Organisasi" name="institution" value={form.institution} onChange={handleChange} />
              <InputField label="Pekerjaan / Peran" name="role" value={form.role} onChange={handleChange} />
              <InputField label="Asal Daerah (Kab/Kota & Provinsi)" name="region" value={form.region} onChange={handleChange} />
            </div>

            {/* KANAN */}
            <div className="space-y-8">
              <SectionTitle title="Ketertarikan & Tujuan" />
              <CheckboxGroup options={reasonOptions} selected={form.reasons} onToggle={(v: string) => toggleArray("reasons", v)} />

              <CheckboxGroup label="Topik yang Paling Diminati" options={topicOptions}
                selected={form.topics} onToggle={(v: string) => toggleArray("topics", v)} />

              <SectionTitle title="Kategori & Teknis Event" />
              <SelectField label="Kategori Peserta" name="participantCategory" value={form.participantCategory}
                onChange={handleChange}
                options={["Peserta Umum", "UMKM / Startup", "Akademisi", "Pemerintah", "Investor", "Media"]} />

              <SelectField label="Metode Kehadiran" name="attendanceMethod" value={form.attendanceMethod}
                onChange={handleChange} options={["Offline", "Online"]} />

              <CheckboxGroup label="Kebutuhan Khusus (Opsional)" options={specialNeedsOptions}
                selected={form.specialNeeds} onToggle={(v: string) => toggleArray("specialNeeds", v)} />

              <SectionTitle title="Persetujuan" />
              <CheckboxSingle label="Saya bersedia data digunakan untuk keperluan acara"
                name="consentData" checked={form.consentData} onChange={handleChange} />
              <CheckboxSingle label="Saya bersedia menerima informasi lanjutan terkait event"
                name="consentInfo" checked={form.consentInfo} onChange={handleChange} />
            </div>
          </div>

          {/* ACTION */}
          <div className="mt-12 flex flex-col sm:flex-row gap-4">
            <button className="flex-1 bg-teal-700 hover:bg-teal-800 text-white py-3 rounded-xl font-semibold">
              Daftar Sekarang
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 border border-gray-300 py-3 rounded-xl font-semibold hover:bg-gray-50"
            >
              Batal
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}

/* ================= COMPONENTS ================= */

function SectionTitle({ title }: { title: string }) {
  return <h3 className="text-lg font-bold text-slate-900 border-b pb-2">{title}</h3>;
}

function InputField({ label, name, type = "text", value, onChange }: InputFieldProps) {
  return (
    <div>
      <label className="block text-sm font-semibold mb-2">{label}</label>
      <input type={type} name={name} value={value} onChange={onChange}
        className="w-full border rounded-xl p-3 focus:ring-1 focus:ring-teal-500" />
    </div>
  );
}

function SelectField({ label, name, value, onChange, options }: any) {
  return (
    <div>
      <label className="block text-sm font-semibold mb-2">{label}</label>
      <select name={name} value={value} onChange={onChange}
        className="w-full border rounded-xl p-3 focus:ring-1 focus:ring-teal-500">
        <option value="">Pilih</option>
        {options.map((o: string) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}

function CheckboxGroup({ label, options, selected, onToggle }: any) {
  return (
    <div>
      {label && <p className="font-semibold mb-2">{label}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {options.map((o: string) => (
          <label key={o} className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={selected.includes(o)} onChange={() => onToggle(o)} />
            {o}
          </label>
        ))}
      </div>
    </div>
  );
}

function CheckboxSingle({ label, name, checked, onChange }: any) {
  return (
    <label className="flex items-center gap-2 text-sm">
      <input type="checkbox" name={name} checked={checked} onChange={onChange} />
      {label}
    </label>
  );
}


