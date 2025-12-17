"use client";

import Link from "next/link";

export default function ComingSoonPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 text-center">
      {/* Icon atau ilustrasi */}
      <div className="mb-8">
        <svg
          className="w-24 h-24 text-cyan-600 mx-auto animate-bounce"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 8v4l3 3m6 0a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
      </div>

      {/* Judul */}
      <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
        Coming Soon
      </h1>

      {/* Deskripsi */}
      <p className="text-gray-700 mb-6 max-w-xl">
        We&apos;re working hard to launch this page. Stay tuned for the next update!
      </p>

      {/* Tombol kembali */}
      <Link
        href="/"
        className="px-6 py-3 bg-cyan-600 text-white rounded-lg font-semibold hover:bg-cyan-700 transition"
      >
        Back to Home
      </Link>
    </main>
  );
}