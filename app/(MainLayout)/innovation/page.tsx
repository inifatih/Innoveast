"use client";

import { getPublicInnovations } from "@/app/(MainLayout)/innovation/action";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

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

interface InnovationItem {
  id: number;
  nama_inovasi: string;
  overview: string;
  features: string;
  potential_application: string;
  unique_value: string;
  asal_inovasi: string;
  created_at: string;
  innovator: {
    id: string | null;
    nama: string | null;
  };
  images: string[];
  categories: (string | null)[];
}

export default function TechOffersPage() {
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [openCat, setOpenCat] = useState(false);
  const [data, setData] = useState<InnovationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [allCategories, setAllCategories] = useState<string[]>([]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const fetchData = async () => {
    setLoading(true);
    try {
      const innovations = await getPublicInnovations();
      setData(innovations);

      // Extract all unique categories
      const categoriesSet = new Set<string>();
      innovations.forEach((item) =>
        item.categories.forEach((cat) => cat && categoriesSet.add(cat))
      );
      setAllCategories(Array.from(categoriesSet));
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
  const filteredData = data
    .filter((item) =>
      item.nama_inovasi.toLowerCase().includes(search.toLowerCase())
    )
    .filter((item) =>
      selectedCategories.length === 0
        ? true
        : item.categories.some((cat) => selectedCategories.includes(cat!))
    );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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

  const handleCategoryToggle = (cat: string) => {
    setCurrentPage(1);
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const resetFilters = () => {
    setSearch("");
    setSelectedCategories([]);
    setCurrentPage(1);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* HERO */}
      <section className="relative w-full h-[300px] sm:h-[400px] overflow-hidden">
        <Image
          src="/images/HAI1.jpg"
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
        {/* SIDEBAR DESKTOP */}
        <aside className="hidden md:flex flex-col w-72 shrink-0 bg-white p-6 shadow rounded-lg sticky top-24 h-[calc(100vh-6rem)] overflow-y-auto">
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

          {/* CATEGORY CHECKLIST */}
          <div className="border rounded-md">
            <button
              className="w-full flex justify-between p-2 text-sm"
              onClick={() => setOpenCat(!openCat)}
            >
              <span>
                {selectedCategories.length === 0
                  ? "All Categories"
                  : selectedCategories.join(", ")}
              </span>
              <span>▾</span>
            </button>

            {openCat && (
              <div className="max-h-64 overflow-y-auto border-t p-2">
                {allCategories.map((cat) => (
                  <label
                    key={cat}
                    className="flex items-center gap-2 py-1 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      value={cat}
                      checked={selectedCategories.includes(cat)}
                      onChange={() => handleCategoryToggle(cat)}
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
            onClick={resetFilters}
          >
            Reset
          </Button>
        </aside>

        {/* RIGHT CONTENT */}
        <div className="w-full md:w-3/4">
          {/* MOBILE MENU DROPDOWN */}
          <div className="md:hidden flex flex-col gap-4 mb-6">
            <select
              className="w-full p-2 rounded-md border text-gray-700"
              onChange={(e) => {
                const value = e.target.value;
                if (value === "Innovation Marketplace")
                  window.location.href = "/innovation";
                if (value === "Innovation Matching")
                  window.location.href = "/matching";
                if (value === "Innovation Funding")
                  window.location.href = "/funding";
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
              Inovasi yang Disetujui adalah katalog inovasi yang telah dikurasi dan berhasil melewati proses penilaian dan verifikasi yang dilakukan oleh BRIDA Jawa Timur. Inovasi-inovasi ini telah dievaluasi kualitas, kelayakan, dampak, dan kesiapan adopsinya. Setiap inovasi yang terdaftar telah memenuhi standar yang dipersyaratkan untuk diakui sebagai solusi yang andal dan dapat diimplementasikan. Katalog ini berfungsi sebagai referensi tepercaya bagi para pemangku kepentingan, menyediakan akses ke ide-ide yang telah terbukti dan dapat diterapkan, direplikasi, atau ditingkatkan di berbagai sektor. 
            </p>
            <p className="text-gray-700 leading-relaxed max-w-full mt-4 text-md font-semibold">
              Dengan menjelajahi Inovasi yang Disetujui, pengguna dapat dengan yakin menemukan solusi berkualitas tinggi yang telah menunjukkan potensi nyata untuk mendukung pembangunan daerah dan inisiatif inovasi publik. Dengan menjelajahi Inovasi yang Disetujui, pengguna dapat dengan yakin menemukan solusi yang memberikan hasil yang terukur.
            </p>
          </div>

          {/* MOBILE SEARCH + CATEGORY */}
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
                <span>
                  {selectedCategories.length === 0
                    ? "All Categories"
                    : selectedCategories.join(", ")}
                </span>
                <span>▾</span>
              </button>

              {openCat && (
                <div className="max-h-64 overflow-y-auto border-t p-2">
                  {allCategories.map((cat) => (
                    <label
                      key={cat}
                      className="flex items-center gap-2 py-1 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        value={cat}
                        checked={selectedCategories.includes(cat)}
                        onChange={() => handleCategoryToggle(cat)}
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
            {paginatedData.length === 0 ? (
              <p className="text-gray-500">No tech offers found.</p>
            ) : (
              paginatedData.map((item) => (
                <Card
                  key={item.id}
                  className="overflow-hidden border-0 shadow-none hover:shadow-2xl transition-shadow duration-300"
                >
                  <Link href={`/innovation/${item.id}`}>
                    <div className="relative w-full h-56">
                      {item.images?.[0] ?  (
                        <Image
                          src={item.images[0] ?? "/images/defaultImage.jpg"}
                          alt={item.nama_inovasi || "Inovasi"}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="bg-gray-200 w-full h-full flex items-center justify-center">
                          <span className="text-gray-500">No image available</span>
                        </div>
                      )}
                    </div>

                    <CardHeader className="py-4">
                      <CardTitle className="text-lg font-semibold text-[#1A1333]">
                        {item.nama_inovasi}
                      </CardTitle>
                    </CardHeader>

                    {/* CATEGORY BADGES */}
                    <div className="px-4 pb-2 flex flex-wrap gap-2">
                      {item.categories.map((cat) => (
                        <span
                          key={cat}
                          className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                        >
                          {cat}
                        </span>
                      ))}
                    </div>

                    <CardContent>
                      <p className="text-gray-700 text-sm text-justify">
                        {truncate(htmlToText(item.overview), 500)}
                      </p>
                    </CardContent>
                  </Link>
                </Card>
              ))
            )}
          </div>

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-6">
              <Button
                variant="outline"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              >
                Previous
              </Button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                disabled={currentPage === totalPages}
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
              >
                Next
              </Button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

function htmlToText(html: string) {
  if (!html) return "";
  const tmp = document.createElement("div");
  tmp.innerHTML = html;
  return tmp.textContent || "";
}
