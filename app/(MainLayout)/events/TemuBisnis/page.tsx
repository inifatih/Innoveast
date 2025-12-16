"use client";

import { Button } from "@/components/ui/button";
import {
  Calendar,
  ChevronRight,
  Globe,
  HelpCircle,
  Mail,
  MapPin,
  Phone
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

// ====================================================================
// I. TYPE DEFINITIONS (Bagian ini memperbaiki Error TypeScript)
// ====================================================================

// Tipe data untuk item countdown
type CountdownItem = {
  label: string;
  value: number;
};

// Tipe data untuk Props komponen CountdownTimer
interface CountdownTimerProps {
  countdown: CountdownItem[];
}

// ====================================================================
// II. DATA CONFIGURATION
// ====================================================================
const eventInfo = {
  title: "Temu Bisnis BRIDA JATIM 2026",
  dateLabel: "June 15, 2026",
  location: "Surabaya, INDONESIA",
  day: "15",
  month: "June",
  place: "BRIDA JATIM, Surabaya",
  eventDate: new Date("2026-06-15T10:00:00"),
};

const KEYNOTE_SPEAKERS = [
  {
    name: "Dr. Andi Prasetyo, M.Sc",
    title: "Kepala BRIDA Jawa Timur",
    bio: "Specialist in innovation policy, regional development, and public sector transformation.",
  },
  {
    name: "Prof. Rina Kusuma, Ph.D",
    title: "Digital Innovation Researcher",
    bio: "Focused on digital transformation, creative economy, and sustainable business innovation.",
  },
];

const EVENT_SCHEDULE = [
  {
    time: "09:00 AM — Opening Ceremony",
    description: "Welcome speech, agenda overview, and opening remarks",
  },
  {
    time: "10:00 AM — Keynote Sessions",
    description: "Strategic insights and perspectives from industry leaders",
  },
  {
    time: "01:00 PM — Networking Lunch",
    description: "Informal networking session among participants and speakers",
  },
  {
    time: "03:00 PM — Interactive Workshops",
    description: "Hands-on discussions, case studies, and collaborative sessions",
  },
];

// DATA SUDAH DIPERBARUI: HANYA 2 LAST EVENTS YANG AKAN DITAMPILKAN
const PAST_EVENTS = [
  {
    year: "2024",
    date: "12 October 2024",
    location: "Jakarta Convention Center",
    desc: "The 2024 event successfully gathered 1,200+ participants from government, academia, industry, and creative communities.",
    gradient: "from-indigo-600 via-violet-600 to-fuchsia-600",
  },
  {
    year: "2023",
    date: "05 November 2023",
    location: "Bandung Digital Valley",
    desc: "Focused on innovation, branding strategies, and digital business growth through curated workshop sessions.",
    gradient: "from-blue-600 via-cyan-600 to-teal-500",
  },
  {
    year: "2022",
    date: "18 September 2022",
    location: "Malang Creative Center",
    desc: "A regional spotlight on East Java's MSMEs and startup ecosystem development.",
    gradient: "from-rose-500 via-orange-500 to-amber-500",
  },
  {
    year: "2021",
    date: "20 August 2021",
    location: "Virtual Conference (Zoom)",
    desc: "Resilience in the face of pandemic: shifting business models to the digital era.",
    gradient: "from-emerald-600 via-green-600 to-lime-600",
  },
];

const FAQ_ITEMS = [
  {
    q: "Apakah acara ini terbuka untuk umum?",
    a: "Ya, acara ini terbuka untuk umum dengan jumlah peserta yang terbatas.",
  },
  {
    q: "Apakah peserta mendapatkan sertifikat?",
    a: "Peserta akan memperoleh e-sertifikat resmi setelah mengikuti seluruh rangkaian acara.",
  },
  {
    q: "Bagaimana cara melakukan pendaftaran?",
    a: "Pendaftaran dapat dilakukan melalui tombol 'Register Now' atau dengan menghubungi panitia.",
  },
  {
    q: "Apakah acara ini gratis?",
    a: "Informasi terkait biaya pendaftaran dapat dikonfirmasi langsung kepada penyelenggara.",
  },
];

// ====================================================================
// III. CHILD COMPONENTS
// ====================================================================

// Tambahkan ': CountdownTimerProps' di sini untuk memperbaiki error
const CountdownTimer = ({ countdown }: CountdownTimerProps) => {
  const colors = ["#7C3AED", "#F59E0B", "#3B82F6", "#10B981"]; 

  return (
    <div className="bg-white text-gray-900 shadow-xl rounded-xl p-6 sm:p-8 w-full max-w-5xl grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4 sm:gap-6 border-t-4 border-pink-600">
      <div className="flex flex-col justify-center items-center border-r md:border-r-2 border-gray-200 md:pr-4 sm:pr-6 col-span-2 sm:col-span-1">
        <h2 className="text-3xl sm:text-4xl font-bold text-pink-600">{eventInfo.day}</h2>
        <p className="uppercase text-xs sm:text-sm tracking-wider">{eventInfo.month}</p>
        <p className="text-xs sm:text-sm text-gray-500 text-center">{eventInfo.place}</p>
      </div>

      {countdown.map((c, i) => (
        <div key={i} className="flex flex-col items-center justify-center">
          <div
            className="text-2xl sm:text-3xl font-bold border-4 rounded-full w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 flex items-center justify-center transition-all duration-300"
            style={{ borderColor: colors[i % colors.length] }}
          >
            {c.value.toString().padStart(2, "0")}
          </div>
          <p className="mt-2 text-gray-600 text-xs sm:text-sm uppercase font-medium">{c.label}</p>
        </div>
      ))}
    </div>
  );
};

const HeroSection = () => (
  <section className="relative h-[70vh] sm:h-[80vh] w-full flex items-center justify-center bg-black">
    <Image src="/images/Event1.jpg" alt="Event Background" fill className="object-cover opacity-50" priority />
    <div className="relative text-center px-4 sm:px-6 text-white max-w-3xl">
      <p className="uppercase tracking-widest text-sm sm:text-base mb-3 text-gray-200">Join the Business Momentum!</p>
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 sm:mb-6">
        {eventInfo.title.split("<br />").map((line, index) => (
          <span key={index}>{line}{index === 0 && <br className="md:hidden" />}</span>
        ))}
      </h1>
      <p className="mb-6 text-gray-200 text-sm sm:text-base font-medium">{eventInfo.dateLabel} • {eventInfo.location}</p>
      <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all">
        Register Now
      </Button>
    </div>
  </section>
);

// ====================================================================
// IV. MAIN COMPONENT (EventPage)
// ====================================================================
export default function EventPage() {
  const eventDate = eventInfo.eventDate;

  // Menambahkan Generics <CountdownItem[]> pada useState
  const [countdown, setCountdown] = useState<CountdownItem[]>([
    { label: "Days", value: 0 },
    { label: "Hours", value: 0 },
    { label: "Minutes", value: 0 },
    { label: "Seconds", value: 0 },
  ]);

  useEffect(() => {
    const tick = setInterval(() => {
      const now = new Date();
      const distance = eventDate.getTime() - now.getTime();
      if (distance <= 0) {
        setCountdown([{ label: "Days", value: 0 }, { label: "Hours", value: 0 }, { label: "Minutes", value: 0 }, { label: "Seconds", value: 0 }]);
        clearInterval(tick);
        return;
      }
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      setCountdown([{ label: "Days", value: days }, { label: "Hours", value: hours }, { label: "Minutes", value: minutes }, { label: "Seconds", value: seconds }]);
    }, 1000);
    return () => clearInterval(tick);
  }, [eventDate]);

  return (
    <div className="w-full min-h-screen bg-white text-gray-900 overflow-x-hidden">
      <HeroSection />

      <section className="relative -mt-10 sm:-mt-16 md:-mt-20 w-full flex justify-center z-20 px-4">
        {/* Props countdown sekarang sudah aman secara tipe */}
        <CountdownTimer countdown={countdown} />
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-16 sm:pb-20 pt-16 sm:pt-24 md:pt-32 text-gray-800">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
          
          {/* LEFT COLUMN: EVENT DETAILS (2/3 width) */}
          <div className="md:col-span-2 space-y-8 sm:space-y-10">
            <div className="bg-white shadow-lg sm:shadow-xl rounded-2xl p-6 sm:p-10 border border-gray-100">
              
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-slate-900 tracking-tight">Event Details</h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed text-justify mb-6 sm:mb-8">
                Konferensi bisnis kreatif ini mempertemukan para pemimpin global, inovator, dan profesional untuk saling berbagi wawasan serta praktik terbaik. Para peserta akan mengeksplorasi tren industri yang sedang berkembang.
              </p>

              <div className="my-6 sm:my-8 h-0.5 bg-gradient-to-r from-teal-300 via-cyan-300 to-blue-300 rounded-full"></div>

              {/* SPEAKERS */}
              <div className="mb-8 sm:mb-10">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 sm:mb-6">Keynote Speakers</h3>
                <div className="space-y-4 sm:space-y-5">
                  {KEYNOTE_SPEAKERS.map((speaker, index) => (
                    <div key={index} className="p-4 sm:p-5 rounded-xl border border-gray-200 hover:shadow-md transition-all duration-200 bg-white">
                      <p className="font-semibold text-slate-900 text-sm sm:text-base">{speaker.name}</p>
                      <p className="text-xs sm:text-sm text-indigo-600 font-medium">{speaker.title}</p>
                      <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">{speaker.bio}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* SCHEDULE */}
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 sm:mb-6">Event Schedule</h3>
                <div className="space-y-4 sm:space-y-6">
                  {EVENT_SCHEDULE.map((item, index) => (
                    <div key={index}>
                      <p className="font-semibold text-slate-900 text-sm sm:text-base">{item.time}</p>
                      <p className="text-slate-500 text-xs sm:text-sm">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* REGISTRATION INFO & NEED HELP SECTION */}
              <div className="mt-8 sm:mt-12 p-5 sm:p-6 rounded-xl bg-slate-50 border border-slate-200">
                <h4 className="text-lg sm:text-xl font-semibold text-slate-900 mb-4">Event Registration</h4>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed text-justify mb-6">
                  Pendaftaran dibuka untuk umum dengan jumlah peserta terbatas. Untuk informasi lebih lanjut, hubungi kontak di bawah ini.
                </p>

                <div className="space-y-3 mb-6">
                  <p className="text-slate-700 text-sm sm:text-base flex items-center gap-2">
                    <Phone className="w-4 h-4 text-teal-600 flex-shrink-0" />
                    <span className="font-semibold">Hotline:</span> 0812-3456-7890
                  </p>
                  <p className="text-slate-700 text-sm sm:text-base flex items-center gap-2">
                    <Mail className="w-4 h-4 text-teal-600 flex-shrink-0" />
                    <span className="font-semibold">Email:</span> support@brida.jatim.go.id
                  </p>
                  <p className="text-slate-700 text-sm sm:text-base flex items-center gap-2">
                    <Globe className="w-4 h-4 text-teal-600 flex-shrink-0" />
                    <span className="font-semibold">Website:</span> brida.jatimprov.go.id
                  </p>
                </div>

                {/* ===== SECTION BARU: NEED HELP BUTTON/LINK ===== */}
                <div className="pt-5 border-t border-slate-200">
                  <p className="text-sm text-slate-500 mb-3">Having trouble registering?</p>
                  <a 
                    href="/contact" // Pastikan link ini mengarah ke halaman kontak Anda
                    className="
                      inline-flex items-center justify-center w-full sm:w-auto px-4 py-2.5 
                      border border-slate-300 bg-white text-slate-700 
                      hover:bg-slate-100 hover:text-slate-900
                      rounded-lg text-sm font-medium transition-colors gap-2
                    "
                  >
                    <HelpCircle className="w-4 h-4" />
                    Need Help? Contact Support
                  </a>
                </div>
                {/* ============================================== */}

              </div>

              {/* REGISTER BUTTON */}
              
                <div className="mt-6 sm:mt-8">
                <Link
                  href="/events/TemuBisnis/register"
                  className="block w-full text-center py-3 sm:py-4 
                            bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 
                            hover:from-teal-700 hover:via-cyan-700 hover:to-blue-700 
                            text-white text-base sm:text-lg font-semibold 
                            rounded-xl shadow-lg shadow-teal-300/50 
                            transition-all duration-300"
                >
                  Register Now
                </Link>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: LAST EVENTS & FAQ (1/3 width) */}
          <div className="md:col-span-1 space-y-6 sm:space-y-8">
            
            {/* ===== LOOPING HANYA 2 CARD LAST EVENTS (MENGGUNAKAN slice(0, 2)) ===== */}
            {PAST_EVENTS.slice(0, 2).map((event, index) => (
              <div
                key={index}
                className={`
                  p-5 sm:p-7 rounded-2xl shadow-lg 
                  bg-gradient-to-br ${event.gradient}
                  text-white
                  hover:shadow-2xl hover:-translate-y-1 transition-all duration-300
                `}
              >
                <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4">
                  Last Event — {event.year}
                </h3>
                <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm opacity-95">
                  <p className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 flex-shrink-0" /> {event.date}
                  </p>
                  <p className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 flex-shrink-0" /> {event.location}
                  </p>
                  <p className="leading-relaxed mt-2 pt-2 border-t border-white/20">
                    {event.desc}
                  </p>
                </div>
              </div>
            ))}
            {/* ==================================================================== */}

            {/* FAQ SECTION */}
            <div className="bg-white shadow-lg rounded-2xl p-5 sm:p-7 border border-gray-100">
              <h3 className="text-xl font-bold text-slate-900 mb-4 sm:mb-6">Frequently Asked Questions</h3>
              <div className="space-y-3">
                {FAQ_ITEMS.map((item, index) => (
                  <details key={index} className="group rounded-xl border border-gray-200 open:bg-slate-50 transition-all">
                    <summary className="cursor-pointer list-none flex items-center justify-between px-4 py-3 text-sm sm:text-base font-medium text-slate-800">
                      {item.q}
                      <ChevronRight className="w-4 h-4 text-slate-500 group-open:rotate-90 transition-transform flex-shrink-0 ml-2" />
                    </summary>
                    <div className="px-4 pb-4 text-sm sm:text-base text-slate-600 leading-relaxed border-t border-gray-100">
                      {item.a}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

