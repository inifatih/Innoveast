"use client";

import Link from "next/link";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-gray-300 pt-16 pb-10 mt-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
        
        {/* ABOUT US */}
        <div>
  <h3 className="text-lg font-semibold text-white mb-4">About Us</h3>

  <ul className="space-y-2 text-gray-400 text-sm">
    <li>
      <Link href="/about?section=who" className="hover:text-white">
        Siapa Kami
      </Link>
    </li>
    <li>
      <Link href="/about?section=what" className="hover:text-white">
        Apa yang Kami Lakukan
      </Link>
    </li>
    <li>
      <Link href="/about?section=why" className="hover:text-white">
        Mengapa Ini Penting
      </Link>
    </li>
    <li>
      <Link href="/about?section=stand" className="hover:text-white">
        Nilai yang Kami Junjung
      </Link>
    </li>
    <li>
      <Link href="/about?section=journey" className="hover:text-white">
        Perjalanan Kami
      </Link>
    </li>
  </ul>
</div>

        {/* MARKETPLACE */}
        <div>
          <h3 className="font-semibold text-white mb-4">INNOVATION MARKETPLACE</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/innovation" className="hover:text-white">Approved Innovation</Link></li>
            <li><Link href="/matching" className="hover:text-white">Innovation Matching</Link></li>
            <li><Link href="/funding" className="hover:text-white">Innovation Funding</Link></li>
          </ul>
        </div>

        {/* NEWS & EVENTS */}
        <div>
          <h3 className="font-semibold text-white mb-4">NEWS & EVENTS</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/news" className="hover:text-white">News & Media</Link></li>
            <li><Link href="/events" className="hover:text-white">Calenders of Events</Link></li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="font-semibold text-white mb-4">CONTACT US</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/contact" className="hover:text-white">Contact Us</Link></li>
          </ul>
        </div>

      </div>

      {/* Footer bottom */}
      <div className="border-t border-gray-700 mt-12 pt-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-400">
          <p>© {new Date().getFullYear()} Inoshop | All Rights Reserved</p>

            <div className="flex items-center gap-4 mt-4 md:mt-0 text-xl text-gray-400">
                <Link href="#" className="hover:text-white"><FaFacebookF /></Link>
                <Link href="#" className="hover:text-white"><FaTwitter /></Link>
                <Link href="#" className="hover:text-white"><FaLinkedinIn /></Link>
                <Link href="#" className="hover:text-white"><FaYoutube /></Link>
            </div>
        </div>
      </div>
    </footer>
  );
}