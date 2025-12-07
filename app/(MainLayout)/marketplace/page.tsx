"use client";

import Image from "next/image";

export default function MarketplacePage() {
  return (
    <div className="pb-20 bg-gray-50">

      {/* ============================
          HERO SECTION
      ============================== */}
      <section className="relative w-full h-[380px] md:h-[420px] lg:h-[460px] overflow-hidden">
        {/* Hero Image Placeholder */}
        <div className="absolute inset-0 bg-gray-200">
          {/* Ganti dengan Image Next nanti */}
          <Image src="/images/GS1.jpg" alt="Innovation News Hero" fill className="object-cover" />
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center px-4">
          <div className="text-center text-white max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              INNOVATION MARKETPLACE
            </h1>
            <p className="text-sm md:text-base leading-relaxed">
              Explore the latest innovations, connect with partners, and discover
              opportunities for business growth. Our platform provides curated
              resources and tools for entrepreneurs and innovators.
            </p>
          </div>
        </div>
      </section>

      {/* ============================
          INNOVATION CARDS
      ============================== */}
      <section className="max-w-6xl mx-auto mt-16 px-4 grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        
        {/* Approved Innovations */}
        <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col justify-between hover:shadow-2xl transition">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-teal-600 mb-2">
              Approved Innovations
            </h3>
            <p className="text-gray-700 text-sm">
              Explore our catalog of validated and approved innovations, ready
              for implementation and commercialization.
            </p>
          </div>
          <div className="mt-4 h-36 bg-gray-200 rounded-lg relative overflow-hidden">
            <Image
              src="/images/GS1.jpg"
              alt="gambar1"
              fill
              className="object-cover"
            />
          </div>
          <a href="/innovation" className="mt-4 text-orange-600 text-sm underline inline-block">
            View more
          </a>
        </div>

        {/* Innovation Matching */}
        <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col justify-between hover:shadow-2xl transition">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-teal-600 mb-2">
              Innovation Matching
            </h3>
            <p className="text-gray-700 text-sm">
              Connect with the right partners and technologies for your
              innovation needs through our smart matching system.
            </p>
          </div>
          <div className="mt-4 h-36 bg-gray-200 rounded-lg relative overflow-hidden">
            <Image
              src="/images/GS2.jpg"
              alt="gambar1"
              fill
              className="object-cover"
            />
          </div>
          <a href="/matching" className="mt-4 text-orange-600 text-sm underline inline-block">
            View more
          </a>
        </div>

        {/* Innovation Funding */}
        <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col justify-between hover:shadow-2xl transition">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-teal-600 mb-2">
              Innovation Funding
            </h3>
            <p className="text-gray-700 text-sm">
              Access information on funding programs and support to accelerate
              your innovation projects.
            </p>
          </div>
          <div className="mt-4 h-36 bg-gray-200 rounded-lg relative overflow-hidden">
            <Image
              src="/images/GS3.jpg"
              alt="gambar1"
              fill
              className="object-cover"
            />
          </div>
          <a href="funding" className="mt-4 text-orange-600 text-sm underline inline-block">
            View more
          </a>
        </div>

      </section>
    </div>
  );
}