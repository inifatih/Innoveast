"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect, useState } from "react";

// Dummy Event Data Config
const eventInfo = {
  title: "Temu Bisnis BRIDA JATIM 2026",
  dateLabel: "June 15, 2026",
  location: "Surabaya, INDONESIA",
  day: "15",
  month: "June",
  place: "BRIDA JATIM, Surabaya",
  eventDate: new Date("2026-06-15T10:00:00"),
};

export default function EventPage() {
  const eventDate = eventInfo.eventDate;

  const [countdown, setCountdown] = useState([
    { label: "Days", value: 0 },
    { label: "Hours", value: 0 },
    { label: "Minutes", value: 0 },
    { label: "Seconds", value: 0 },
  ]);

  /* COUNTDOWN EFFECT */
  useEffect(() => {
    const tick = setInterval(() => {
      const now = new Date();
      const distance = eventDate.getTime() - now.getTime();

      if (distance <= 0) {
        setCountdown([
          { label: "Days", value: 0 },
          { label: "Hours", value: 0 },
          { label: "Minutes", value: 0 },
          { label: "Seconds", value: 0 },
        ]);
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setCountdown([
        { label: "Days", value: days },
        { label: "Hours", value: hours },
        { label: "Minutes", value: minutes },
        { label: "Seconds", value: seconds },
      ]);
    }, 1000);

    return () => clearInterval(tick);
  }, []);

  return (
    <div className="w-full min-h-screen bg-white text-gray-900">

      {/* ================= HERO SECTION ================= */}
      <section className="relative h-[70vh] sm:h-[90vh] w-full flex items-center justify-center bg-black">
        <Image
          src="/images/Event1.jpg"
          alt="Event Background"
          fill
          className="object-cover opacity-50"
        />

        <div className="relative text-center px-4 sm:px-6 text-white max-w-3xl">
          <p className="uppercase tracking-widest text-sm sm:text-base mb-3 text-gray-200">
            Join the Business Momentum!
          </p>

          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold leading-tight mb-4 sm:mb-6">
            Temu Bisnis <br /> BRIDA JATIM 2026
          </h1>

          <p className="mb-6 text-gray-200 text-sm sm:text-base">
            {eventInfo.dateLabel} • {eventInfo.location}
          </p>

          <Button className="bg-orange-500 hover:bg-orange-600 text-white px-5 sm:px-6 py-2 sm:py-3 text-base sm:text-lg rounded-md shadow-lg">
            Register Now
          </Button>
        </div>
      </section>

      {/* ================= COUNTDOWN BOX ================= */}
      <section className="relative -mt-16 sm:-mt-20 w-full flex justify-center z-20 px-4">
        <div className="
          bg-white text-gray-900 shadow-xl rounded-xl p-6 sm:p-8 w-full max-w-5xl
          grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4 sm:gap-6 border-t-4 border-pink-600
        ">
          {/* Date Section */}
          <div className="flex flex-col justify-center items-center border-r md:border-r-2 border-gray-200 md:pr-4 sm:pr-6 col-span-2 sm:col-span-1">
            <h2 className="text-3xl sm:text-4xl font-bold text-pink-600">{eventInfo.day}</h2>
            <p className="uppercase text-xs sm:text-sm tracking-wider">{eventInfo.month}</p>
            <p className="text-xs sm:text-sm text-gray-500 text-center">{eventInfo.place}</p>
          </div>

          {/* Countdown Items */}
          {countdown.map((c, i) => (
            <div key={i} className="flex flex-col items-center justify-center">
              <div
                className="text-2xl sm:text-3xl font-bold border-4 rounded-full w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center"
                style={{
                  borderColor: ["#7C3AED", "#F59E0B", "#3B82F6", "#10B981"][i],
                }}
              >
                {c.value}
              </div>
              <p className="mt-2 text-gray-600 text-xs sm:text-sm uppercase">{c.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= EVENT DETAILS ================= */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16 sm:pb-20 pt-20 sm:pt-32 text-gray-800">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">

          {/* LEFT — EVENT DETAILS */}
          <div className="bg-white shadow-lg sm:shadow-xl rounded-2xl p-6 sm:p-10 border border-gray-100">

            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-slate-900 tracking-tight">
              Event Details
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6 sm:mb-10">
              This creative business conference brings together global leaders,
              innovators, and professionals. Learn powerful strategies, discover
              upcoming industry trends, and network with top experts. Ideal for
              entrepreneurs, business creators, designers, researchers, and tech
              innovators who want to stay ahead.
            </p>

            <div className="my-6 sm:my-10 h-0.5 bg-linear-to-r from-teal-300 via-cyan-300 to-blue-300 rounded-full"></div>

            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 sm:mb-6">Schedule</h3>

              <div className="space-y-4 sm:space-y-6">
                <div>
                  <p className="font-semibold text-slate-900 text-sm sm:text-base">09:00 AM — Opening Ceremony</p>
                  <p className="text-slate-500 text-xs sm:text-sm">Welcome speech & introduction</p>
                </div>

                <div>
                  <p className="font-semibold text-slate-900 text-sm sm:text-base">10:00 AM — Keynote Sessions</p>
                  <p className="text-slate-500 text-xs sm:text-sm">Industry leaders present new insights</p>
                </div>

                <div>
                  <p className="font-semibold text-slate-900 text-sm sm:text-base">01:00 PM — Networking Lunch</p>
                </div>

                <div>
                  <p className="font-semibold text-slate-900 text-sm sm:text-base">03:00 PM — Workshops</p>
                </div>
              </div>
            </div>

            <div className="mt-8 sm:mt-12">
              <button className="
                w-full py-3 sm:py-4
                bg-linear-to-r from-teal-600 via-cyan-600 to-blue-600
                hover:from-teal-700 hover:via-cyan-700 hover:to-blue-700
                text-white text-base sm:text-lg font-semibold
                rounded-xl shadow-lg shadow-teal-200
                transition-all duration-300
              ">
                Register Now
              </button>
            </div>
          </div>

          {/* RIGHT — LAST EVENTS */}
          <div className="space-y-6 sm:space-y-8">

            <div className="
              p-5 sm:p-7 rounded-2xl shadow-lg 
              bg-linear-to-br from-indigo-600 via-violet-600 to-fuchsia-600
              text-white
              hover:shadow-2xl hover:-translate-y-1 transition-all duration-300
            ">
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4">Last Event — 2024</h3>

              <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm opacity-95">
                <p className="flex items-center gap-2">📅 12 October 2024</p>
                <p className="flex items-center gap-2">📍 Jakarta Convention Center</p>
                <p>Our 2024 event brought together <b>1200+ participants</b> globally.</p>
              </div>
            </div>

            <div className="
              p-5 sm:p-7 rounded-2xl shadow-lg 
              bg-linear-to-br from-blue-600 via-cyan-600 to-teal-500
              text-white
              hover:shadow-2xl hover:-translate-y-1 transition-all duration-300
            ">
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4">Last Event — 2023</h3>

              <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm opacity-95">
                <p className="flex items-center gap-2">📅 05 November 2023</p>
                <p className="flex items-center gap-2">📍 Bandung Digital Valley</p>
                <p>The 2023 edition featured innovation, branding, and digital growth workshops.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}