"use client";

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { getPublicInnovations } from "../action";

type DetailBlockProps = {
  title: string;
  content: string;
};

type DetailListProps = {
  title: string;
  items: string;
};

interface SidebarInfoProps {
  label: string;
  value: string | number | React.ReactNode;
  badge?: boolean;
  badgeGreen?: boolean;
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

export default function InnovationDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  const [innovations, setInnovations] = useState<InnovationItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPublicInnovations();
        setInnovations(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ================= GALLERY AUTO-SLIDE =================
  useEffect(() => {
    const slider = document.getElementById("galleryCarousel");
    if (!slider) return;

    let index = 0;
    const total = slider.children.length;

    const interval = setInterval(() => {
      index = (index + 1) % total;
      slider.style.transform = `translateX(-${index * 100}%)`;
      slider.setAttribute("data-index", String(index));
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  const slideGallery = (dir: number) => {
    const slider = document.getElementById("galleryCarousel");
    if (!slider) return;

    const total = slider.children.length;
    const current = Number(slider.getAttribute("data-index") || 0);
    const next = (current + dir + total) % total;

    slider.style.transform = `translateX(-${next * 100}%)`;
    slider.setAttribute("data-index", String(next));
  };


  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-slate-500 text-lg">Loading innovation data...</p>
      </main>
    );
  }

  const item = innovations.find((x) => x.id === Number(id));
  const relatedInnovations = innovations.filter((x) => x.id !== Number(id)).slice(0, 3);

  if (!item) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-slate-500 text-lg">Innovation not found.</p>
      </main>
    );
  } return (
    <main className="min-h-screen bg-[#FAF7F2]">
      {/* ================= HERO IMAGE ================= */}
      <section className="relative w-full h-80 sm:h-[420px]">
        {item.image_url && (
          <Image
            src={item.image_url}
            alt={item.nama_inovasi}
            fill
            className="object-cover"
          />
        )}
      </section>

      {/* ================= DETAIL SECTION ================= */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-8">{item.nama_inovasi}</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* LEFT CONTENT */}
            <div className="lg:col-span-2 space-y-8">
              {/* Main Photo */}
              <div className="w-full h-[350px] relative rounded-xl overflow-hidden shadow-md">
                {item.image_url && (
                  <Image
                    src={item.image_url}
                    alt={item.nama_inovasi}
                    fill
                    className="object-cover"
                  />
                )}
              </div>

              {/* GALLERY */}
              <h2 className="text-xl font-semibold text-slate-900">Innovation Gallery</h2>
              <div className="relative overflow-hidden rounded-xl shadow-md">
                <div id="galleryCarousel" data-index="0" className="flex transition-transform duration-700 ease-in-out">
                  {[item.image_url, "/images/Acer2.jpg", "/images/Acer1.jpg"].map((img, index) => (
                    <div key={index} className="min-w-full px-2">
                      <div className="relative w-full h-60 sm:h-72 lg:h-80 rounded-xl overflow-hidden shadow">
                        <Image src={img || ""} alt={`Gallery ${index}`} fill className="object-cover" />
                      </div>
                    </div>
                  ))}
                </div>

                <button onClick={() => slideGallery(-1)} className="absolute top-1/2 left-3 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full px-3 py-2 shadow-lg">‹</button>
                <button onClick={() => slideGallery(1)} className="absolute top-1/2 right-3 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full px-3 py-2 shadow-lg">›</button>
              </div>

              {/* DETAILS SECTION */}
              <section className="bg-white rounded-xl p-6 shadow-sm space-y-6">
                <DetailBlock title="Technology Overview" content={item.overview || ""} />
                <DetailList
                  title="Technology Features & Specifications"
                  items={item.features || ""}
                />
                <DetailBlock
                  title="Potential Application"
                  content={item.potential_application || ""}
                />
                <DetailBlock
                  title="Unique Value Proposition"
                  content={item.unique_value || ""}
                />

                {/* BUTTON MENUJU PAGE UPDATE REQUEST */}
                <div className="pt-4 border-t border-slate-200">
                  <button
                    onClick={() => router.push("/requestupdatedata")}
                    className="px-5 py-3 bg-teal-700 text-white rounded-lg hover:bg-teal-800 transition-colors"
                  >
                    Request Update Data
                  </button>
                </div>

                {/* ================= SHARE BUTTONS ================= */}
                <div className="border-t border-gray-300 mt-6 pt-4">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-slate-700">
                    <p className="text-sm md:mb-0">Share this innovation:</p>
                    <div className="flex items-center gap-4 text-xl">
                      <Link
                        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-600 transition-colors"
                      ><FaFacebookF /></Link>
                      <Link
                        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-400 transition-colors"
                      ><FaTwitter /></Link>
                      <Link
                        href={`https://www.linkedin.com/sharing/share-offsite/?url=$(currentUrl)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-700 transition-colors"
                      ><FaLinkedinIn /></Link>
                      <Link
                        href={`https://www.instagram.com/`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-pink-500 transition-colors"
                      ><FaInstagram /></Link>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* RIGHT SIDEBAR */}
            <Sidebar item={item} router={router} />
          </div>
        </div>
      </section>

      {/* ================= RELATED INNOVATIONS ================= */}
      <section className="w-full bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <RelatedItems related={relatedInnovations} router={router} />
        </div>
      </section>
    </main>
  );
}

  

/* ============================================================
   =================== COMPONENTS ============================
   ============================================================ */

function DetailBlock({ title, content }: DetailBlockProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-teal-700 border-l-4 border-teal-200 pl-4 mb-2">{title}</h2>
      <p className="text-slate-700">{content}</p>
    </div>
  );
}

function DetailList({ title, items }: DetailListProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-teal-700 border-l-4 border-teal-200 pl-4 mb-2">{title}</h2>
      <p>{items}</p>
    </div>
  );
}

function Sidebar({ item, router }: { item: InnovationItem; router: AppRouterInstance}) {
  return (
    <aside className="space-y-6 md:sticky md:top-24">
      <div className="bg-white rounded-xl p-6 shadow-md">
        <h3 className="text-lg font-semibold text-teal-800 mb-4">Key Information</h3>
        {/* <SidebarInfo label="Category" value={item.category} badge /> */}
        <SidebarInfo label="ID Number" value={`INNOV-${item.id}`} />
        <SidebarInfo label="Status" value="✓ Approved Innovation" badgeGreen />
        <SidebarInfo label="Inovator" value={item.profiles?.nama ?? "-"} />
        <SidebarInfo label="Location" value="Jawa Timur, Indonesia" />
        <button
          onClick={() => router.push("/contact")}
          className="mt-4 w-full px-4 py-3 bg-teal-700 text-white rounded-lg hover:bg-teal-800 transition-colors"
        >
          Make an Enquiry
        </button>
      </div>
    </aside>
  );
}

function SidebarInfo({ label, value, badge, badgeGreen }: SidebarInfoProps) {
  return (
    <div className="mb-4">
      <p className="text-xs font-medium text-gray-500 uppercase">{label}</p>
      <p className="mt-1 text-sm font-semibold text-slate-800">
        {badge && <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full">{value}</span>}
        {badgeGreen && <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full">{value}</span>}
        {!badge && !badgeGreen && value}
      </p>
    </div>
  );
}

function RelatedItems({ related, router }: { related: InnovationItem[]; router: AppRouterInstance }) {
  return (
    <section className="mt-8">
      <h3 className="text-2xl font-bold mb-6 text-slate-900">Related Innovations</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {related.map((rel) => (
          <div
            key={rel.id}
            onClick={() => router.push(`/innovation/${rel.id}`)}
            className="cursor-pointer rounded-xl overflow-hidden bg-white shadow-md hover:shadow-lg transition-all duration-500"
          >
            <div className="relative w-full h-56 overflow-hidden rounded-t-xl group">
              {rel.image_url && (
              <Image
                src={rel.image_url} // sesuaikan field API
                alt={rel.nama_inovasi}
                fill
                className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110 group-hover:contrast-105"
              />
              )}
              
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-700"></div>
            </div>
            <div className="p-5">
              <h4 className="font-semibold text-slate-900 text-lg mb-1">{rel.nama_inovasi}</h4>
              {/* <p className="text-slate-600 text-sm">{rel.category_name}</p> */}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
