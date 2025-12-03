"use client";

import { getPublicInnovations } from "@/app/(MainLayout)/innovation/action";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

// Kategori
const categories = [
  "All",
  "Technology",
  "Agriculture",
  "Energy",
  "Finance",
  "Transportation",
  "Health",
  "Environment",
];

interface ListItemProps {
  title: string;
  href: string;
  children: React.ReactNode;
}

function ListItem({ title, children, href }: ListItemProps) {
  return (
    <li className="mb-2">
      <Link
        href={href}
        className="block p-2 rounded hover:bg-gray-100 transition"
      >
        <div className="text-sm font-medium">{title}</div>
        <p className="text-muted-foreground text-sm line-clamp-2 leading-snug">
          {children}
        </p>
      </Link>
    </li>
  );
}

export interface InnovationItem {
  id: string | number;
  nama_inovasi: string;
  overview?: string;
  features?: string;
  potential_application?: string;
  unique_value?: string;
  asal_inovasi?: string;
  created_at: string;
  profiles?: { id: string; nama: string } | null;

  // Kolom baru
  image_url?: string | null;
}

export default function TechOffersPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [openCat, setOpenCat] = useState(false);

  // ⬇️ Tambahkan state untuk menampung data dari database
  const [data, setData] = useState<InnovationItem[]>([]);
  const [loading, setLoading] = useState(true);

  // ⬇️ Fetch data dari database
  const fetchData = async () => {
    setLoading(true);
    try {
      const innovations = await getPublicInnovations();
      setData(innovations);
    } catch (err) {
      console.error("Error fetching innovations:", err);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  // Filtering
  const filteredData = data.filter(
    (item) =>
      item.nama_inovasi.toLowerCase().includes(search.toLowerCase()) 
    // &&
    //   (category === "All" || item.category === category)
  );

  // Truncate jika terlalu panjang > 100 char
  const truncate = (text: string | undefined, max: number) => {
    if (!text) return "";
    return text.length > max ? text.substring(0, max) + "..." : text;
  };

  if (loading) {
    return (
      <div className="w-full py-10 text-center text-lg font-medium text-gray-600">
        Sedang memuat inovasi...
      </div>
    );
  }


  return (
    <main className="min-h-screen bg-gray-50">
      {/* HERO */}
      <section className="relative w-full h-[300px] sm:h-[400px] overflow-hidden">
        <Image
          src="/images/Acer1.jpg"
          alt="Innovation Cover"
          fill
          className="object-cover brightness-75"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 drop-shadow-lg">
            INNOVATION MARKETPLACE
          </h1>
          <p>
            Explore curated innovations, find the right matches, and access funding in our Innovation Marketplace.
          </p>
        </div>
      </section>

      {/* CONTENT LAYOUT */}
      <section className="max-w-full mx-4 px-4 flex flex-col md:flex-row gap-8 mt-10 mb-20">
        {/* ======================= SIDEBAR DESKTOP ======================= */}
        <aside
          className="hidden md:flex flex-col w-72 shrink-0 bg-white p-6 shadow rounded-lg 
          sticky top-24 h-[calc(100vh-6rem)] overflow-y-auto"
        >
          <h3 className="font-semibold mb-4">Innovation Marketplace</h3>

          <ul className="grid gap-2 mb-6">
            <ListItem href="/innovation" title="Approved Innovations">
              Katalog inovasi terbaru
            </ListItem>
            <ListItem href="/matching" title="Innovation Matching">
              Sistem pencocokan inovasi
            </ListItem>
            <ListItem href="/funding" title="Innovation Funding">
              Informasi pendanaan dan program akselerasi
            </ListItem>
          </ul>

          {/* SEARCH */}
          <Input
            placeholder="Search keywords…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mb-4"
          />

          {/* CATEGORY DROPDOWN */}
          <div className="border rounded-md">
            <button
              className="w-full flex justify-between p-2 text-sm"
              onClick={() => setOpenCat(!openCat)}
            >
              <span>{category}</span>
              <span>▾</span>
            </button>

            {openCat && (
              <div className="max-h-64 overflow-y-auto border-t p-2">
                {categories.map((cat) => (
                  <label key={cat} className="flex items-center gap-2 py-1 cursor-pointer">
                    <input
                      type="radio"
                      name="cat"
                      value={cat}
                      checked={category === cat}
                      onChange={() => setCategory(cat)}
                    />
                    <span className="text-sm">{cat}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* RESET BUTTON */}
          <Button
            variant="secondary"
            className="mt-3 w-full"
            onClick={() => {
              setSearch("");
              setCategory("All");
            }}
          >
            Reset
          </Button>
        </aside>

        {/* ======================= RIGHT CONTENT ======================= */}
        <div className="w-full md:w-3/4">
          {/* ======================= MOBILE MENU DROPDOWN ======================= */}
          <div className="md:hidden flex flex-col gap-4 mb-6">
            <select
              className="w-full p-2 rounded-md border text-gray-700"
              onChange={(e) => {
                const value = e.target.value;
                if (value === "Innovation Marketplace") window.location.href = "/innovation";
                if (value === "Innovation Matching") window.location.href = "/matching";
                if (value === "Innovation Funding") window.location.href = "/funding";
              }}
              defaultValue="Innovation Marketplace"
            >
              <option>Innovation Marketplace</option>
              <option>Innovation Matching</option>
              <option>Innovation Funding</option>
            </select>
          </div>

          {/* TEXT SECTION */}
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Approved Innovation</h2>
            <p className="text-gray-700 leading-relaxed max-w-full text-justify text-md font-medium">
              Approved Innovation is a curated catalog of innovations that have successfully passed the assessment 
              and verification process conducted by BRIDA Jawa Timur. 
              These innovations have been evaluated for quality, feasibility, impact, and readiness for adoption. Each listed innovation has met the standards required to be recognized as a reliable and implementable solution. 
              This catalog serves as a trusted reference for stakeholders, providing access to proven ideas that can be applied, replicated, or scaled across various sectors. By exploring Approved Innovations, users can confidently discover high-quality solutions that have demonstrated real potential to support regional development and public innovation initiatives.
            </p>
            <p className="text-gray-700 leading-relaxed max-w-full mt-4 text-md font-semibold">
              By exploring Approved Innovations, users can confidently discover solutions that deliver measurable results.
            </p>
          </div>

          {/* ======================= MOBILE SEARCH + CATEGORY ======================= */}
          <div className="md:hidden flex flex-col gap-2 mb-6">
            <Input
              placeholder="Search keywords…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <div className="border rounded-md">
              <button
                className="w-full flex justify-between p-2 text-sm"
                onClick={() => setOpenCat(!openCat)}
              >
                <span>{category}</span>
                <span>▾</span>
              </button>

              {openCat && (
                <div className="max-h-64 overflow-y-auto border-t p-2">
                  {categories.map((cat) => (
                    <label key={cat} className="flex items-center gap-2 py-1 cursor-pointer">
                      <input
                        type="radio"
                        name="cat"
                        value={cat}
                        checked={category === cat}
                        onChange={() => setCategory(cat)}
                      />
                      <span className="text-sm">{cat}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* GRID OF ITEMS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {filteredData.length === 0 ? (
              <p className="text-gray-500">No tech offers found.</p>
            ) : (
              filteredData.map((item) => (
                <Card
                  key={item.id}
                  className="overflow-hidden border-0 shadow-none hover:shadow-2xl transition-shadow duration-300"
                >
                  <Link
                    key={item.id}
                    href={`/innovation/${item.id}`}
                  >
                    {/* Image */}
                    <div className="relative w-full h-56">
                      {item.image_url && (
                        <Image
                          src={item.image_url}
                          alt={item.nama_inovasi}
                          fill
                          className="object-cover"
                        />
                      )}
                    </div>
                    {/* Header */}
                    <CardHeader className="py-4">
                      <CardTitle className="text-lg font-semibold text-[#1A1333]">
                        {truncate(item.nama_inovasi, 50)}
                      </CardTitle>
                    </CardHeader>
                    {/* Content */}
                    <CardContent>
                      <h3 className="text-lg font-semibold text-gray-900">
                        
                      </h3>

                      {/* Kategori Inovasi */}
                      {/* <p className="text-sm text-gray-500 mb-2">{item.category}</p> */}
                      {/* Overview Inovasi */}
                      <p className="text-gray-700 text-sm">
                        {truncate(item.overview, 100)}
                      </p>
                    </CardContent>
                  </Link>
                </Card>
              ))
            )}
          </div>
        </div>
      </section>
    </main>
  );
}