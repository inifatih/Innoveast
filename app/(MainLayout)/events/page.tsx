"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaFacebookF, FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa";

const upcomingEvents = [
  {
    title: "Temu Bisnis BRIDA JATIM 2026",
    date: "15 June 2026",
    location: "Surabaya, Indonesia",
    href: "events/TemuBisnis",
    image: "/images/Event1.jpg",
  },
  {
    title: "Workshop Inovasi Digital",
    date: "22 July 2026",
    location: "Jakarta, Indonesia",
    href: "/events/workshop-inovasi-digital-2026",
    image: "/images/Event2.jpg",
  },
  {
    title: "Seminar Entrepreneurship",
    date: "05 August 2026",
    location: "Bandung, Indonesia",
    href: "/events/seminar-entrepreneurship-2026",
    image: "/images/Event3.jpg",
  },
];

export default function EventLandingPage() {
const [origin, setOrigin] = useState("");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOrigin(window.location.origin);
  }, []);


  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Link copied to clipboard!");
  };

  return (
    <div className="w-full">

      {/* ================= HERO SECTION ================= */}
      <section className="relative h-[70vh] sm:h-[80vh] w-full flex items-center justify-center bg-black">
        <Image
          src="/images/Event1.jpg"
          alt="Event Background"
          fill
          className="object-cover opacity-50"
        />
        <div className="relative text-center px-6 sm:px-10 text-white max-w-3xl">
          <p className="uppercase tracking-widest text-sm sm:text-base mb-3 text-gray-200">
            Join the Momentum!
          </p>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-4 leading-tight">
            Upcoming Events & Workshops
          </h1>
          <p className="mb-6 text-gray-200 text-sm sm:text-base">
            Explore seminars, workshops, and business networking events.
          </p>
          <Link href="#upcoming">
            <Button className="bg-orange-500 hover:bg-orange-600 px-5 sm:px-6 py-2 sm:py-3 text-base sm:text-lg rounded-md shadow-lg">
              Explore Events
            </Button>
          </Link>
        </div>
      </section>

      {/* ================= ABOUT EVENTS ================= */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-[#053B44]">
            What Are Our Events?
          </h2>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            Our events include seminars, workshops, and business meetings that
            help professionals and innovators connect, learn, and grow. Each event is designed
            to provide actionable insights and networking opportunities.
          </p>
        </div>
      </section>

      {/* ================= UPCOMING EVENTS ================= */}
      <section id="upcoming" className="py-12 sm:py-16 bg-[#F4FBFC]">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-[#053B44] mb-8 sm:mb-12">
            Upcoming Events
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {upcomingEvents.map((event, i) => (
              <div key={i} className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group">

                {/* Image */}
                <Link href={event.href}>
                  <div className="relative w-full h-64 sm:h-72 cursor-pointer">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      style={{ objectFit: "cover" }}
                      className="transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute bottom-0 w-full bg-linear-to-t from-black/70 to-transparent p-4">
                      <h3 className="text-lg sm:text-xl font-semibold text-white">{event.title}</h3>
                      <p className="text-xs sm:text-sm text-gray-200">{event.date} • {event.location}</p>
                    </div>
                    {/* Badge tanggal */}
                    <div className="absolute top-3 left-3 bg-orange-500 text-white px-3 py-1 rounded-md text-xs sm:text-sm font-semibold shadow">
                      {event.date.split(" ")[0]}
                    </div>
                  </div>
                </Link>

                {/* Share Buttons */}
                <div className="flex justify-center gap-3 py-3 bg-white">
                  {/* WhatsApp */}
                  <a
                    href={`https://api.whatsapp.com/send?text=Check out this event: ${event.title} - ${origin}${event.href}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full text-lg flex items-center justify-center shadow"
                    title="Share via WhatsApp"
                  >
                    <FaWhatsapp />
                  </a>
                  {/* Facebook */}
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${origin}${event.href}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full text-lg flex items-center justify-center shadow"
                    title="Share via Facebook"
                  >
                    <FaFacebookF />
                  </a>
                  {/* Instagram (Copy Link) */}
                  <button
                    onClick={() => copyToClipboard(`${origin}${event.href}`)}
                    className="bg-pink-500 hover:bg-pink-600 text-white p-2 rounded-full text-lg flex items-center justify-center shadow"
                    title="Copy Link for Instagram/TikTok"
                  >
                    <FaInstagram />
                  </button>
                  {/* TikTok (Copy Link) */}
                  <button
                    onClick={() => copyToClipboard(`${origin}${event.href}`)}
                    className="bg-black hover:bg-gray-800 text-white p-2 rounded-full text-lg flex items-center justify-center shadow"
                    title="Copy Link for TikTok"
                  >
                    <FaTiktok />
                  </button>
                </div>

              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA SECTION ================= */}
      <section className="py-12 sm:py-16 bg-[#053B44] text-white">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
            Want to Attend an Event?
          </h2>
          <p className="text-sm sm:text-base text-[#C4F1F6] mb-6 sm:mb-10">
            Register now to secure your spot in our upcoming workshops, seminars, and business networking events.
          </p>
          <Link href="/events">
            <Button className="bg-[#37B8C3] hover:bg-[#4CD6DF] text-[#031A26] font-bold px-5 sm:px-8 py-2 sm:py-4 text-sm sm:text-lg">
              View All Events
            </Button>
          </Link>
        </div>
      </section>

    </div>
  );
}