"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

type InputFieldProps = {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function UpdateRequestForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    innovationName: "",
    email: "",
    whatsapp: "",
    sections: [] as string[],
    details: "",
  });

  const sectionOptions = [
    { label: "Overview", value: "overview" },
    { label: "Feature", value: "feature" },
    { label: "Specification", value: "specification" },
    { label: "Potential Application", value: "potential" },
    { label: "Unique Value", value: "unique" },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSectionChange = (section: string) => {
    setForm((prev) => {
      const sections = prev.sections.includes(section)
        ? prev.sections.filter((s) => s !== section)
        : [...prev.sections, section];
      return { ...prev, sections };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted data:", form);
    alert("Request submitted!");
    router.push("/");
  };

  return (
    <main className="flex flex-col min-h-screen">
      {/* ================= HERO ================= */}
      <section className="relative w-full h-56 sm:h-64 md:h-72 bg-linear-to-r from-teal-500 to-teal-700 flex items-center justify-center text-white px-4">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl font-bold">Update Innovation Data</h1>
          <p className="mt-2 text-sm sm:text-base md:text-lg">
            Submit your updated information below. You can select multiple sections.
          </p>
        </div>
      </section>

      {/* ================= FORM SECTION (White background) ================= */}
      <section className="bg-white w-full flex-1">
        <div className="container mx-auto px-4 py-16">
          {/* flex-col-reverse untuk mobile (gambar di atas), lg:flex-row untuk desktop */}
          <div className="flex flex-col-reverse lg:flex-row gap-12">
            {/* LEFT: Form */}
            <div className="flex-1 bg-white p-6 sm:p-8 rounded-2xl shadow-xl">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Update Your Innovation Data</h2>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <InputField label="Nama" name="name" value={form.name} onChange={handleChange} />
                <InputField label="Judul Inovasi" name="innovationName" value={form.innovationName} onChange={handleChange} />
                <InputField label="Email" name="email" value={form.email} onChange={handleChange} type="email" />
                <InputField label="WhatsApp Number" name="whatsapp" value={form.whatsapp} onChange={handleChange} />

                {/* Sections */}
                <div className="space-y-2">
                  <p className="block text-sm font-semibold mb-2 text-gray-700">Sections to Update</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {sectionOptions.map((sec) => (
                      <label key={sec.value} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          value={sec.value}
                          checked={form.sections.includes(sec.value)}
                          onChange={() => handleSectionChange(sec.value)}
                          className="w-4 h-4 rounded border-gray-300 accent-teal-700"
                        />
                        <span className="text-sm text-gray-700">{sec.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Details */}
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Update Details</label>
                  <textarea
                    name="details"
                    rows={4}
                    value={form.details}
                    onChange={handleChange}
                    placeholder="Provide the updated information..."
                    className="w-full border border-gray-300 rounded-xl p-3 resize-none focus:outline-teal-500 focus:ring-1 focus:ring-teal-500"
                  />
                </div>

                {/* Submit */}
                <button className="w-full bg-teal-700 text-white py-3 rounded-xl font-semibold hover:bg-teal-800 transition-colors">
                  Submit Request
                </button>
              </form>
            </div>

            {/* RIGHT: Illustration / Info Panel */}
            <div className="flex-1 flex items-center justify-center mb-8 lg:mb-0">
              <div className="w-full max-w-md lg:max-w-full h-auto rounded-2xl overflow-hidden shadow-lg bg-white flex items-center justify-center">
                <Image
                  src="/images/Alurreqdata1.jpg"
                  alt="Alur Pengajuan Perbaikan"
                  width={600}
                  height={400}
                  className="object-contain w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

// ================= REUSABLE INPUT =================
function InputField({ label, name, type = "text", value, onChange }: InputFieldProps) {
  return (
    <div>
      <label className="block text-gray-700 font-semibold mb-2">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={`Enter ${label}`}
        className="w-full border border-gray-300 rounded-xl p-3 focus:outline-teal-500 focus:ring-1 focus:ring-teal-500"
      />
    </div>
  );
}