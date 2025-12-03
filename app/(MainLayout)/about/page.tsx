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

  /* Scroll indicator movement */
  useEffect(() => {
    const index = keys.indexOf(active);
    const el = listRefs.current[index];
    if (el) setIndicatorPos(el.offsetTop + el.offsetHeight / 2 - 12);
  }, [active]);

  /* Auto change every 5s */
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
    <main className="bg-linear-to-b from-white to-gray-50">
      {/* COVER */}
      <section className="relative w-full h-[360px] sm:h-[420px] overflow-hidden shadow-xl">
        <Image
          src="/images/Acer1.jpg"
          alt="About Cover"
          fill
          className="object-cover brightness-[0.6]"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold drop-shadow-lg tracking-wide">
            About Innoveast
          </h1>
          <p className="text-lg sm:text-xl max-w-2xl mt-3 opacity-95">
            Temukan visi dan perjalanan kami dalam membangun ekosistem inovasi Indonesia.
          </p>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 my-8">
        <AutoBreadcrumb />
      </div>

      {/* STORY SECTION */}
      <section className="py-20 flex justify-center" id="kisah-kami">
        <div className="w-11/12 max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-14 tracking-tight">
            Kisah Kami
          </h2>

          {/* DESKTOP STORY */}
          <div className="hidden md:grid grid-cols-2 gap-12">
            <div>
              <h3
                className={`text-2xl font-bold border-l-4 border-blue-600 pl-4 mb-4 transition-opacity duration-300 ${
                  fade ? "opacity-100" : "opacity-0"
                }`}
              >
                {sections[active].title}
              </h3>
              <p
                className={`text-gray-700 leading-relaxed text-lg transition-opacity duration-300 ${
                  fade ? "opacity-100" : "opacity-0"
                }`}
              >
                {sections[active].text}
              </p>

              <ul className="relative space-y-5 mt-10 text-lg">
                <span
                  className="absolute left-0 w-1 bg-blue-600 rounded-full transition-all duration-300"
                  style={{ top: indicatorPos, height: 24 }}
                />
                {keys.map((key, i) => (
                  <li
                    key={key}
                    ref={(el) => (listRefs.current[i] = el)}
                    onClick={() => handleClick(key)}
                    className={`cursor-pointer pl-4 transition ${
                      active === key
                        ? "text-gray-900 font-semibold"
                        : "text-gray-500 hover:text-blue-600"
                    }`}
                  >
                    {sections[key].title}
                  </li>
                ))}
              </ul>
            </div>

            {/* IMAGE (tidak menggunakan fill agar layout stabil) */}
            <div className="relative w-full h-[420px]">
              <Image
                src={sections[active].image}
                alt={sections[active].title}
                fill
                className={`rounded-xl shadow-xl object-cover transition duration-500 ${
                  fade ? "opacity-100" : "opacity-0"
                }`}
              />
            </div>
          </div>

          {/* MOBILE STORY */}
          <div className="md:hidden space-y-12">
            {keys.map((key) => (
              <div
                key={key}
                className={`transition-all duration-700 ${
                  active === key ? "opacity-100" : "opacity-40"
                }`}
              >
                <div
                  className="flex items-center mb-3 cursor-pointer"
                  onClick={() => handleClick(key)}
                >
                  <span
                    className={`w-1 h-6 mr-3 rounded bg-blue-600 transition-all duration-300 ${
                      active === key ? "opacity-100" : "opacity-0"
                    }`}
                  />
                  <h3
                    className={`text-xl font-bold transition ${
                      active === key ? "text-blue-600" : "text-gray-400"
                    }`}
                  >
                    {sections[key].title}
                  </h3>
                </div>

                {active === key && mobilePhase === "content" && (
                  <div className="flex flex-col gap-4">
                    <p className="text-gray-700 leading-relaxed mb-4 text-justify text-base animate-fadeIn">
                      {sections[key].text}
                    </p>
                    <div className="relative w-full h-60">
                      <Image
                        src={sections[key].image}
                        alt={sections[key].title}
                        fill
                        className="rounded-xl shadow-md object-cover animate-slideUp"
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM INTRO */}
      <section className="py-20 bg-white text-center">
        <h2 className="text-4xl font-bold mb-4 tracking-tight">Orang-Orang Kami</h2>
        <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
          Tim adalah kekuatan utama kami—mereka yang menghidupkan inovasi.
        </p>
      </section>

      {/* TEAM CARDS */}
      <section className="py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-12 tracking-tight">
          Tim Kami
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
          {["Anggota 1", "Anggota 2", "Anggota 3", "Anggota 4", "Anggota 5"].map(
            (name, i) => (
              <TeamCard key={i} name={name} role="Divisi / Jabatan" />
            )
          )}
        </div>
      </section>
    </main>
  );
}

/* ================= TEAM CARD ================= */
function TeamCard({ name, role }: { name: string; role: string }) {
  return (
    <div className="text-center transform transition duration-300 hover:-translate-y-2">
      <div className="w-32 h-32 mx-auto rounded-full bg-gray-200 shadow-lg overflow-hidden">
        <Image
          src="/images/avatar-placeholder.png"
          alt={name}
          width={128}
          height={128}
          className="object-cover"
        />
      </div>
      <h3 className="font-semibold text-gray-900 mt-4 text-lg">{name}</h3>
      <p className="text-gray-500 text-sm">{role}</p>
    </div>
  );
}
