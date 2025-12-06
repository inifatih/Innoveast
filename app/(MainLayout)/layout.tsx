import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import type { Metadata } from "next";

// === Metadata (bisa diubah sesuai proyekmu) ===
export const metadata: Metadata = {
  title: {
    default: "ORBIT Jatim: Organisasi Repositori dan Jembatan Inovasi Teknologi Jawa Timur",
    template: "%s | Marketplace Inovasi BRIDA Jatim",
  },
  description: "Menawarkan inovasi milik Badan Riset dan Inovasi Daerah (BRIDA) Jawa Timur.",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {

  return (
    <>
      <Navbar/>
      {/* 
        Di sini children akan digantikan oleh layout user atau admin,
        tergantung route group (misalnya (user) atau (admin)).
      */}
      <main>
          {children}
      </main>
      {/* Global component (misalnya toast, modal portal, dsb) */}
      {/* Spinner for loading*/}
      <Footer />
    </>
  );
}