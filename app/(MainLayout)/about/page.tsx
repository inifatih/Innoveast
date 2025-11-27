"use client";

import AutoBreadcrumb from "@/components/AutoBreadcrumb";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { startTransition, useEffect, useRef, useState } from "react";

type SectionKey = "who" | "what" | "why" | "stand" | "journey";

export default function AboutPage() {
  const sections: Record<SectionKey, { title: string; text: string; image: string }> = {
    who: {
      title: "Siapa Kami",
      text: `INOShop is an innovation platform built to connect entrepreneurs, researchers, industry, and government...`,
      image: "/images/story-who.jpg",
    },
    what: {
      title: "Apa yang Kami Lakukan",
      text: `Kami menyediakan marketplace inovasi yang mempertemukan kebutuhan teknologi dari industri...`,
      image: "/images/story-what.jpg",
    },
    why: {
      title: "Mengapa Ini Penting",
      text: `Inovasi memainkan peran besar dalam meningkatkan daya saing daerah dan nasional...`,
      image: "/images/story-why.jpg",
    },
    stand: {
      title: "Nilai yang Kami Junjung",
      text: `Kami berkomitmen mendorong ekosistem inovasi yang kolaboratif, terbuka, inklusif...`,
      image: "/images/story-stand.jpg",
    },
    journey: {
      title: "Perjalanan Kami",
      text: `INOShop merupakan inisiatif BIRDA Jawa Timur yang lahir untuk menghubungkan berbagai pemangku kepentingan...`,
      image: "/images/story-journey.jpg",
    },
  };

  const keys: SectionKey[] = ["who", "what", "why", "stand", "journey"];
  const [active, setActive] = useState<SectionKey>("who");
  const [fade, setFade] = useState(true);
  const [mobilePhase, setMobilePhase] = useState<"title" | "content">("title");

  const listRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [indicatorPos, setIndicatorPos] = useState(0);
  const [indicatorHeight, setIndicatorHeight] = useState(20);

  const searchParams = useSearchParams();

  // handle query ?section=
  useEffect(() => {
    const section = searchParams.get("section") as SectionKey | null;
    if (section && keys.includes(section)) {
      startTransition(() => {
        setFade(false);
        setActive(section);
        setTimeout(() => setFade(true), 120);
      });
    }
  }, [searchParams, keys]);

  useEffect(() => {
    const index = keys.indexOf(active);
    const el = listRefs.current[index];
    if (el) {
      setIndicatorPos(el.offsetTop + el.offsetHeight / 2 - 10);
      setIndicatorHeight(20);
    }
  }, [active]);

  // Auto rotate desktop + mobile
  useEffect(() => {
    const desktopInterval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setActive((prev) => keys[(keys.indexOf(prev) + 1) % keys.length]);
        setTimeout(() => setFade(true), 100);
      }, 200);
    }, 5000);

    const mobileInterval = setInterval(() => {
      if (mobilePhase === "title") {
        setMobilePhase("content");
      } else {
        const i = keys.indexOf(active);
        setActive(keys[(i + 1) % keys.length]);
        setMobilePhase("title");
      }
    }, 4000);

    return () => {
      clearInterval(desktopInterval);
      clearInterval(mobileInterval);
    };
  }, [active, mobilePhase]);

  const handleClick = (key: SectionKey) => {
    setFade(false);
    setActive(key);
    setMobilePhase("content");
    setTimeout(() => setFade(true), 100);
  };

  return (
    <main>
      {/* COVER */}
      <section className="relative w-full h-[300px] sm:h-[400px] overflow-hidden shadow-2xl border-b-gray-600">
        <Image
          src="/images/Acer1.jpg"
          alt="About Cover"
          fill
          className="object-cover brightness-75"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
          <h1 className="text-4xl sm:text-5xl font-bold mb-3 drop-shadow-md">About INOShop</h1>
          <p className="text-lg sm:text-xl max-w-2xl drop-shadow-sm">
            Pelajari kisah, tujuan, dan perjalanan kami dalam membangun ekosistem inovasi.
          </p>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 mt-4">
        <AutoBreadcrumb />
      </div>

      {/* KISAH KAMI */}
      <section id="kisah-kami" className="py-20 flex justify-center">
        <div className="w-11/12 max-w-6xl">
          <h2 className="text-3xl font-bold mb-8 text-center">Kisah Kami</h2>

          {/* Desktop */}
          <div className="hidden md:grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h3 className={`text-xl font-bold border-l-4 border-blue-600 pl-3 mb-3 transition-opacity duration-300 ${fade ? "opacity-100" : "opacity-0"}`}>
                {sections[active].title}
              </h3>
              <p className={`text-gray-700 leading-relaxed mb-6 transition-opacity duration-300 ${fade ? "opacity-100" : "opacity-0"}`}>
                {sections[active].text}
              </p>

              <ul className="relative space-y-4 font-semibold text-gray-600 pl-4 hidden md:block">
                <div
                  className="absolute left-0 w-1 bg-blue-600 rounded transition-all duration-300"
                  style={{ top: indicatorPos, height: indicatorHeight }}
                />
                {keys.map((key, idx) => (
                  <li
                    key={key}
                    ref={(el) => { listRefs.current[idx] = el; }}
                    onClick={() => handleClick(key)}
                    className={`cursor-pointer transition-all duration-200 ${active === key ? "text-gray-900" : "text-gray-500 hover:text-blue-500"}`}
                  >
                    {sections[key].title}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <Image
                src={sections[active].image}
                alt={sections[active].title}
                className={`rounded-xl shadow-md object-cover w-full h-[400px] transition-opacity duration-500 ${fade ? "opacity-100" : "opacity-0"}`}
              />
            </div>
          </div>

          {/* Mobile */}
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
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 text-left">
                      <p className="text-gray-700 leading-relaxed mb-4 animate-fadeIn">
                        {sections[key].text}
                      </p>
                    </div>
                    <div className="flex-1">
                      <Image
                        src={sections[key].image}
                        alt={sections[key].title}
                        className="rounded-xl shadow-lg object-cover w-full h-[250px] animate-slideUp"
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OUR PEOPLE */}
      <section className="py-20 bg-gray-50">
        <div className="text-center max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Orang-Orang Kami</h2>
          <p className="text-gray-700 text-lg">
            Tim kami adalah sumber kekuatan terbesar. Dengan pengalaman dan dedikasi tinggi, 
            kami mendorong lahirnya inovasi yang memberikan dampak bagi masyarakat.
          </p>
        </div>
      </section>

      {/* OUR TEAM */}
      <section className="py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Tim Kami</h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
          <TeamCard name="Anggota 1" role="Divisi / Jabatan" />
          <TeamCard name="Anggota 2" role="Divisi / Jabatan" />
          <TeamCard name="Anggota 3" role="Divisi / Jabatan" />
          <TeamCard name="Anggota 4" role="Divisi / Jabatan" />
          <TeamCard name="Anggota 5" role="Divisi / Jabatan" />
        </div>
      </section>
    </main>
  );
}

function TeamCard({ name, role }: { name: string; role: string }) {
  return (
    <div className="text-center hover:-translate-y-1 transition transform duration-300">
      <div className="w-32 h-32 mx-auto rounded-full bg-gray-300 shadow-lg"></div>
      <h3 className="font-semibold text-gray-900 mt-4">{name}</h3>
      <p className="text-gray-600 text-sm">{role}</p>
    </div>
  );
}