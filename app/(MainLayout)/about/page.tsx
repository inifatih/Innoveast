"use client";

import AutoBreadcrumb from "@/components/AutoBreadcrumb";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type SectionKey = "who" | "what" | "why" | "stand" | "journey";

export default function AboutPage() {
  const sections: Record<SectionKey, { title: string; text: string; image: string }> = {
    who: {
      title: "Siapa Kami",
      text: `Innoveast adalah platform inovasi yang dirancang untuk menghubungkan 
        pengusaha, peneliti, industri, dan pemerintah dalam mempercepat adopsi teknologi.`,
      image: "/images/Carosel2.jpg",
    },
    what: {
      title: "Apa yang Kami Lakukan",
      text: `Kami menyediakan marketplace inovasi yang mempertemukan kebutuhan
        teknologi dengan solusi terbaik dari peneliti, startup, dan inovator.`,
      image: "/images/CaroselDepan3.jpg",
    },
    why: {
      title: "Mengapa Ini Penting",
      text: `Inovasi adalah kunci daya saing nasional—Innoveast memastikan solusi inovatif
        tidak berhenti hanya sebagai riset, tetapi benar-benar sampai ke implementasi.`,
      image: "/images/Acer1.jpg",
    },
    stand: {
      title: "Nilai yang Kami Junjung",
      text: `Kami menjunjung transparansi, kolaborasi, dan keberlanjutan sebagai fondasi
        membangun ekosistem inovasi yang sehat.`,
      image: "/images/Acer2.jpg",
    },
    journey: {
      title: "Perjalanan Kami",
      text: `Innoveast lahir untuk menjembatani kesenjangan antara riset dan implementasi —
        mendorong inovasi tepat sasaran dan membawa dampak nyata.`,
      image: "/images/Carosel1.jpg",
    },
  };

  const keys: SectionKey[] = ["who", "what", "why", "stand", "journey"];

  const [active, setActive] = useState<SectionKey>("who");
  const [fade, setFade] = useState(true);
  const [mobilePhase, setMobilePhase] = useState<"title" | "content">("title");

  const listRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [indicatorPos, setIndicatorPos] = useState(0);

  useEffect(() => {
    const index = keys.indexOf(active);
    const el = listRefs.current[index];
    if (el) setIndicatorPos(el.offsetTop + el.offsetHeight / 2 - 10);
  }, [active]);

  // Auto rotate tiap 5 detik
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        const next = keys[(keys.indexOf(active) + 1) % keys.length];
        setActive(next);
        setMobilePhase("content");
        setTimeout(() => setFade(true), 250);
      }, 150);
    }, 5000);
    return () => clearInterval(interval);
  }, [active]);

  const handleClick = (key: SectionKey) => {
    setFade(false);
    setTimeout(() => {
      setActive(key);
      setMobilePhase("content");
      setTimeout(() => setFade(true), 200);
    }, 120);
  };

  return (
    <main>
      {/* ================= COVER ================= */}
      <section className="relative w-full h-80 sm:h-[420px] overflow-hidden shadow-xl border-b">
        <Image src="/images/Acer1.jpg" alt="About Cover" fill className="object-cover brightness-75" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h1 className="text-4xl sm:text-5xl font-bold drop-shadow-lg">About Orbit Jatim</h1>
          <p className="text-lg sm:text-xl max-w-2xl text-center drop-shadow mt-3">
            Temukan visi dan perjalanan kami dalam membangun ekosistem inovasi Indonesia.
          </p>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 my-8">
        <AutoBreadcrumb />
      </div>

      {/* ================== SECTION STORY ================= */}
      <section className="py-20 flex justify-center" id="kisah-kami">
        <div className="w-11/12 max-w-6xl">
          <h2 className="text-3xl font-bold mb-10 text-center">Kisah Kami</h2>

          {/* DESKTOP VIEW */}
          <div className="hidden md:grid grid-cols-2 gap-12">
            <div>
              <h3 className={`text-xl font-bold border-l-4 border-blue-600 pl-3 mb-3 transition-opacity duration-300 ${fade ? "opacity-100" : "opacity-0"}`}>
                {sections[active].title}
              </h3>
              <p className={`text-gray-700 mb-6 text-justify leading-relaxed transition-opacity duration-300 ${fade ? "opacity-100" : "opacity-0"}`}>
                {sections[active].text}
              </p>

              <ul className="relative space-y-4 font-semibold text-gray-600 pl-4">
                <span className="absolute left-0 w-1 bg-blue-600 rounded transition-all duration-300"
                  style={{ top: indicatorPos, height: 22 }} />

                {keys.map((key, i) => (
                  <li
                    key={key}
                    ref={(el) => { listRefs.current[i] = el; }}
                    onClick={() => handleClick(key)}
                    className={`cursor-pointer transition ${active === key ? "text-gray-900 font-bold" : "text-gray-500 hover:text-blue-500"}`}
                  >
                    {sections[key].title}
                  </li>
                ))}
              </ul>
            </div>

            <Image
              src={sections[active].image}
              alt={sections[active].title}
              className={`rounded-xl shadow-lg object-cover w-full h-[420px] transition-opacity duration-500 ${fade ? "opacity-100" : "opacity-0"}`}
              fill
            />
          </div>

          {/* MOBILE VIEW */}
          <div className="md:hidden space-y-12">
            {keys.map((key) => (
              <div
                key={key}
                className={`flex flex-col transition-all duration-700 ease-in-out ${active === key ? "opacity-100 translate-y-0" : "opacity-20 -translate-y-2"}`}
              >
                <div
                  className="flex items-center mb-3 cursor-pointer"
                  onClick={() => handleClick(key)}
                >
                  <span
                    className={`w-1 h-6 mr-3 rounded bg-blue-600 transition-all duration-500 ${active === key ? "opacity-100" : "opacity-0"}`}
                  />
                  <h3
                    className={`text-xl font-bold ${active === key ? "text-blue-600" : "text-gray-400"} transition-colors duration-500`}
                  >
                    {sections[key].title}
                  </h3>
                </div>

                {active === key && mobilePhase === "content" && (
                  <div className="flex flex-col gap-4">
                    {/* Text */}
                    <div>
                      <p className="text-gray-700 leading-relaxed mb-4 text-justify animate-fadeIn">
                        {sections[key].text}
                      </p>
                    </div>
                    {/* Image di bawah text */}
                    <div className="w-full h-[250px] relative">
                      <Image
                        src={sections[key].image}
                        alt={sections[key].title}
                        fill
                        className="rounded-xl shadow-lg object-cover animate-slideUp"
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-gray-50 text-center">
        <h2 className="text-3xl font-bold mb-4">Orang-Orang Kami</h2>
        <p className="text-gray-700 max-w-3xl mx-auto text-lg text-justify leading-relaxed">
          Tim adalah kekuatan utama kami. Mereka yang menghidupkan inovasi.
        </p>
      </section>

      <section className="py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Tim Kami</h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
          {["Anggota 1", "Anggota 2", "Anggota 3", "Anggota 4", "Anggota 5"].map((name, i) => (
            <TeamCard key={i} name={name} role="Divisi / Jabatan" />
          ))}
        </div>
      </section>
    </main>
  );
}

/* ================= CARD TEAM ================= */
function TeamCard({ name, role }: { name: string; role: string }) {
  return (
    <div className="text-center hover:-translate-y-1 transition duration-300">
      <div className="w-32 h-32 mx-auto rounded-full bg-gray-300 shadow-lg"></div>
      <h3 className="font-semibold text-gray-900 mt-4">{name}</h3>
      <p className="text-gray-600 text-sm">{role}</p>
    </div>
  );
}
