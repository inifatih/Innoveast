"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaFacebook, FaFacebookF, FaGlobe, FaInstagram, FaLinkedinIn, FaTiktok, FaTwitter, FaYoutube } from "react-icons/fa";
import { getPublicInnovations } from "../action";


type DetailBlockProps = {
  title: string;
  html: string;
};

type DetailListProps = {
  title: string;
  html: string;
};

interface SidebarInfoProps {
  label: string;
  value: string | number | React.ReactNode;
  badge?: boolean;
  badgeGreen?: boolean;
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
  // inovator dari Profiles Table
  innovator: {
    id: string | null;
    nama: string | null;
  };
  // kumpulan image url dari array
  images: string[];
  // kategori lebih dari 1
  categories: (string | null)[];
  // sosmed
  social: {
    tiktok?: string ;
    instagram?: string ;
    youtube?: string;
    facebook?: string;
    web?: string;
  };
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
        {item.images && (
          <Image
            src={item.images[0] ?? "/images/defaultImage.jpg"}
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
              {/* GALLERY */}
              <Carousel
                className="relative w-full h- rounded-xl overflow-hidden"
                plugins={[
                  Autoplay({
                    delay: 3500,
                    stopOnInteraction: false,
                    stopOnMouseEnter: true,
                  })
                ]}
                opts={{
                  align: "start",
                  loop: true,
                }}
              >
                <CarouselContent>
                  {item.images.map((img, index) => (
                    <CarouselItem key={index}>
                      <div className="relative w-full h-60 sm:h-72 lg:h-80">
                        <Image
                          src={img ?? "/images/defaultImage.jpg"}
                          alt={`Image ${index}`}
                          className="object-cover rounded-xl"
                          fill
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>

                {/* BUTTON CHEVRON */}
                <CarouselPrevious className="left-2 bg-white/70 backdrop-blur border-none shadow-md hover:bg-orange-400" />
                <CarouselNext className="right-2 bg-white/70 backdrop-blur border-none shadow-md hover:bg-orange-400" />
              </Carousel>


              {/* DETAILS SECTION */}
              <section className="bg-white rounded-xl p-6 shadow-sm space-y-6">
                <DetailBlock title="Technology Overview" html={item.overview} />
                <DetailList
                  title="Technology Features & Specifications"
                  html={item.features}
                />
                <DetailBlock
                  title="Potential Application"
                  html={item.potential_application}
                />
                <DetailBlock
                  title="Unique Value Proposition"
                  html={item.unique_value}
                />

                {/* BUTTON MENUJU PAGE UPDATE REQUEST */}
                <div className="pt-4 border-t border-slate-200">
                  <button
                    onClick={() => router.push("/requestupdatedata")}
                    className="px-5 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-200 hover:text-orange-600 transition-colors"
                  >
                    Minta Ubah Data
                  </button>
                </div>

                {/* ================= SHARE BUTTONS ================= */}
                <div className="border-t border-gray-300 mt-6 pt-4">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-slate-700">
                    <p className="text-sm md:mb-0">Bagikan inovasi ini:</p>
                    <div className="flex items-center gap-4 text-xl">
                      <Link
                        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-orange-600 transition-colors"
                      ><FaFacebookF /></Link>
                      <Link
                        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-orange-400 transition-colors"
                      ><FaTwitter /></Link>
                      <Link
                        href={`https://www.linkedin.com/sharing/share-offsite/?url=$(currentUrl)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-orange-600 transition-colors"
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
export function DetailBlock({ title, html }: DetailBlockProps) {
  return (
    <div>
      {/* Title tetap normal */}
      <h2 className="text-xl font-bold text-orange-600 border-l-4 border-orange-200 pl-4 mb-2">{title}</h2>

      {/* HTML hanya untuk konten */}
      <div
        dangerouslySetInnerHTML={{ __html: html ?? "—" }}
        style={{
          paddingLeft: "1.5rem", // agar ul/ol terlihat menjorok
          listStyleType: "initial", // ul = disc, ol = decimal
          whiteSpace: "pre-wrap", // untuk line break
        }}
      />
    </div>
  )
}


function DetailList({ title, html }: DetailListProps) {
  return (
    <div>
      <h2 className="text-xl font-bold text-orange-600 border-l-4 border-orange-200 pl-4 mb-2">{title}</h2>
      <div
        dangerouslySetInnerHTML={{ __html: html ?? "—" }}
        style={{
          paddingLeft: "1.5rem", // agar ul/ol terlihat menjorok
          listStyleType: "initial", // ul = disc, ol = decimal
          whiteSpace: "pre-wrap", // untuk line break
        }}
      />
    </div>
  );
}

function Sidebar({ item, router }: { item: InnovationItem; router: AppRouterInstance}) {
  return (
    <aside className="space-y-6 md:sticky md:top-24">
      <div className="bg-white rounded-xl p-6 shadow-md">
        <h3 className="text-xl font-bold text-orange-600 mb-4">Key Information</h3>
        {/* <SidebarInfo label="Category" value={item.category} badge /> */}
        <SidebarInfo label="ID Number" value={`INNOV-${item.id}`} />
        <SidebarInfo
          label="Categories"
          value={
            <div className="flex flex-wrap gap-2">
              {item.categories && item.categories.length > 0 ? (
                <ul className="list-disc list-inside space-y-0.5">
                  {item.categories.map((cat, idx) => (
                    <li key={idx}>{cat}</li>
                  ))}
                </ul>
              ) : (
                "—"
              )}
            </div>
          }
        />
        <SidebarInfo label="Inovator" value={item.innovator?.nama ?? "-"} />
        
        <SidebarInfo label="Location" value={item.asal_inovasi}/>
        <SidebarInfo
          label="Social Media"
          value={
            <div className="flex gap-3 text-xl mt-1">
              {item.social?.instagram && (
                <Link href={item.social.instagram} target="_blank">
                  <FaInstagram className="hover:text-orange-600 transition-colors" />
                </Link>
              )}
              {item.social?.youtube && (
                <Link href={item.social.youtube} target="_blank">
                  <FaYoutube className="hover:text-orange-600 transition-colors" />
                </Link>
              )}
              {item.social?.tiktok && (
                <Link href={item.social.tiktok} target="_blank">
                  <FaTiktok className="hover:text-orange-600 transition-colors" />
                </Link>
              )}
              {item.social?.facebook && (
                <Link href={item.social.facebook} target="_blank">
                  <FaFacebook className="hover:text-orange-600 transition-colors" />
                </Link>
              )}
              {item.social?.web && (
                <Link href={item.social.web} target="_blank">
                  <FaGlobe className="hover:text-orange-600 transition-colors" />
                </Link>
              )}
            </div>
          }
        />
        <button
          onClick={() => router.push("/contact")}
          className="mt-4 w-full px-4 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-200 hover:text-orange-600 transition-colors"
        >
          Hubungi Inovator
        </button>
      </div>
    </aside>
  );
}

function SidebarInfo({ label, value, badge, badgeGreen }: SidebarInfoProps) {
  return (
    <div className="mb-4">
      <p className="text-xs font-medium text-gray-500 uppercase">{label}</p>
      <div className="mt-1 text-sm font-semibold text-slate-800">
        {badge && <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full">{value}</span>}
        {badgeGreen && <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full">{value}</span>}
        {!badge && !badgeGreen && value}
      </div>
    </div>
  );
}

function RelatedItems({ related, router }: { related: InnovationItem[]; router: AppRouterInstance }) {
  return (
    <section className="mt-8">
      <h3 className="text-2xl font-bold mb-6 text-slate-900">Inovasi Terkait</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {related.map((rel) => (
          <div
            key={rel.id}
            onClick={() => router.push(`/innovation/${rel.id}`)}
            className="cursor-pointer rounded-xl overflow-hidden bg-white shadow-md hover:shadow-lg transition-all duration-500"
          >
            <div className="relative w-full h-56 overflow-hidden rounded-t-xl group">
              {rel.images && (
              <Image
                src={rel.images[0] ?? "/images/defaultImage.jpg"}
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
