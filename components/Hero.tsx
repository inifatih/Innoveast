"use client";

import Image from "next/image";
import Link from "next/link";

// Mock data
const mockData = [
  { id: 1, title: "AI Assistant", desc: "Membantu otomatisasi pekerjaan dengan AI.", category: "Technology", image: "/images/Acer1.jpg" },
  { id: 2, title: "Smart Farming", desc: "Pertanian presisi dengan sensor IoT.", category: "Agriculture", image: "/images/Acer2.jpg" },
  { id: 3, title: "Solar Energy Grid", desc: "Energi terbarukan berbasis panel surya.", category: "Energy", image: "/images/Acer1.jpg" },
  { id: 4, title: "FinTech Analytics", desc: "Analitik keuangan untuk UMKM.", category: "Finance", image: "/images/Acer2.jpg" },
  { id: 5, title: "Urban Mobility", desc: "Transportasi ramah lingkungan di perkotaan.", category: "Transportation", image: "/images/Acer1.jpg" },
  { id: 6, title: "Healthcare IoT", desc: "Pemantauan kesehatan jarak jauh.", category: "Health", image: "/images/Acer2.jpg" },
  { id: 7, title: "Eco Packaging", desc: "Kemasan biodegradable ramah lingkungan.", category: "Environment", image: "/images/Acer1.jpg" },
  { id: 8, title: "Neural Computing", desc: "Pemrosesan data besar dengan jaringan saraf.", category: "Technology", image: "/images/Acer2.jpg" },
];

export default function InnovationCarousel() {
  return (
    <main className="min-h-screen bg-white-50 px-6 py-10 max-w-7xl mx-auto font-sans">
      <h2 className="text-2xl font-bold mb-6 text-left">
        Getting Started: Explore Innovations
      </h2>

      {/* Carousel */}
      <div className="flex space-x-4 overflow-x-auto scrollbar-hide py-4">
        {mockData.map((item) => (
          <Link
            key={item.id}
            href={`/innovation/${item.id}`}
            className="min-w-[250px] bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden shrink-0"
          >
            <div className="relative w-full h-40">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-3">
              <h3 className="text-md font-semibold text-gray-900">{item.title}</h3>
              <p className="text-sm text-gray-500">{item.category}</p>
            </div>
          </Link>
        ))}
      </div>

       {/* Tombol Explore */}
        <div className="text-center mt-8">
        <Link
          href="/marketplace"
          className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg shadow-md transition"
        >
          Explore the innovation market
        </Link>
      </div>
    </main>
  );
}