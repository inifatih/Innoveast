"use client";

import Link from "next/link";
import * as React from "react";
import { useEffect, useState } from "react";

import { LoginDialog } from "@/components/auth/LoginDialog";
import { RegisterDialog } from "@/components/auth/RegisterDialog";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "./ui/button";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { actionSignOut } from "@/app/auth/logout/action";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import { Menu } from "lucide-react";

export default function Navbar() {
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useIsMobile();
  const [mounted, setMounted] = useState(false); // NEW: prevent hydration mismatch
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // Ambil User
  useEffect(() => {
    const loadUser = async () => {
      const supabase = createClient();
      const { data: authData } = await supabase.auth.getUser();
      const currentUser = authData.user;

      setUser(currentUser ?? null);

      if (!currentUser) return;

      const { data: userProfile } = await supabase
        .from("Profiles")
        .select("is_admin")
        .eq("user_id", currentUser.id)
        .single();

      setIsAdmin(userProfile?.is_admin === true);
    };

    loadUser();
  }, []);



  const handleSignOut = async () => {
    const result = await actionSignOut();

    if (result.error) {
      console.error("Logout gagal:", result.error);
      return;
    }

    // Logout berhasil → refresh halaman
    window.location.reload();
    // Arahkan ke halaman home
    window.location.href = "/";
  };

  // ===== DETECT SCROLL =====
  useEffect(() => {
    setMounted(true); // NEW: mark as mounted
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
    }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-lg text-black py-2" : "bg-transparent text-white py-4"
      }`}
    >
      <div className="mx-auto max-w-7xl flex items-center justify-between px-4">
        {/* Logo */}
        <Link
          href="/"
          className={`text-2xl font-bold transition ${isScrolled ? "text-black" : "text-white"}`}
        >
          Orbit Jatim
        </Link>

        {/* ===== MOBILE NAVIGATION ===== */}
        {isMobile ? (
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu size={26} />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-[300px] bg-white">
              <SheetHeader>
                <SheetTitle className="text-lg font-semibold">Menu</SheetTitle>
              </SheetHeader>

              <div className="m-4">
                <Accordion type="single" collapsible>

                  {/* Marketplace */}
                  <AccordionItem value="market">
                    <AccordionTrigger>Innovation Marketplace</AccordionTrigger>
                    <AccordionContent>
                      <MobileItem href="/marketplace" title="Getting Started" onClick={() => setMobileOpen(false)} />
                      <MobileItem href="/innovation" title="Approved Innovations" onClick={() => setMobileOpen(false)} />
                      <MobileItem href="/matching" title="Innovation Matching" onClick={() => setMobileOpen(false)} />
                      <MobileItem href="/funding" title="Innovation Funding" onClick={() => setMobileOpen(false)} />
                    </AccordionContent>
                  </AccordionItem>

                  {/* News & Events */}
                  <AccordionItem value="news">
                    <AccordionTrigger>News & Events</AccordionTrigger>
                    <AccordionContent>
                      <MobileItem href="/news" title="News & Media" onClick={() => setMobileOpen(false)} />
                      <MobileItem href="/events" title="Calendar of Events" onClick={() => setMobileOpen(false)} />
                    </AccordionContent>
                  </AccordionItem>

                  {/* Innovators */}
                  <AccordionItem value="innovators">
                    <AccordionTrigger>Innovators</AccordionTrigger>
                    <AccordionContent>
                      <MobileItem href="/innovator" title="Innovators" onClick={() => setMobileOpen(false)} />
                    </AccordionContent>
                  </AccordionItem>

                  {/* About */}
                  <AccordionItem value="about">
                    <AccordionTrigger>About Orbit Jatim</AccordionTrigger>
                    <AccordionContent>
                      <MobileItem href="/about" title="Company Profile" onClick={() => setMobileOpen(false)} />
                    </AccordionContent>
                  </AccordionItem>

                  {/* Contact */}
                  <AccordionItem value="contact">
                    <AccordionTrigger>Contact Us</AccordionTrigger>
                    <AccordionContent>
                      <MobileItem href="/contact" title="Get in Touch" onClick={() => setMobileOpen(false)} />
                    </AccordionContent>
                  </AccordionItem>

                  {/* Profile */}
                  <AccordionItem value="profile">
                    <AccordionTrigger>Profile</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        {!user ? (
                          <>
                            <Button variant="ghost" className="w-full justify-start" onClick={() => setOpenLogin(true)}>Masuk</Button>
                            <Button variant="ghost" className="w-full justify-start" onClick={() => setOpenRegister(true)}>Register</Button>
                          </>
                        ) : (
                          <>
                            {isAdmin ? (
                              // === Jika Admin ===
                              <Link href="/admin">
                                <Button variant="ghost" className="w-full justify-start text-left">
                                  Admin Panel
                                </Button>
                              </Link>
                            ) : (
                              // === Jika User biasa ===
                              <Link href="/profile">
                                <Button variant="ghost" className="w-full justify-start text-left">
                                  Saya
                                </Button>
                              </Link>
                            )}

                            <Button
                              variant="ghost"
                              className="w-full justify-start text-left"
                              onClick={handleSignOut}
                            >
                              Logout
                            </Button>
                          </>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                </Accordion>
              </div>
            </SheetContent>
          </Sheet>
        ) : (
          // ===== DESKTOP NAVIGATION =====
          mounted && (
            <NavigationMenu viewport={isMobile}>
              <NavigationMenuList className="flex-wrap">

                {/* Innovation Marketplace */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className={`transition ${isScrolled ? "" : "hover:bg-white/30"} text-base md:text-lg`}>
                    Innovation Marketplace
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="border-none backdrop-blur-md">
                    <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                      <ListItem href="/marketplace" title="Getting Started">Pergi ke halaman utama marketplace</ListItem>
                      <ListItem href="/innovation" title="Approved Innovations">Katalog inovasi terbaru</ListItem>
                      <ListItem href="/matching" title="Innovation Matching">Sistem pencocokan inovasi</ListItem>
                      <ListItem href="/funding" title="Innovation Funding">Informasi pendanaan & program</ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* News & Events */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className={`transition ${isScrolled ? "" : "hover:bg-white/30"} text-base md:text-lg`}>
                    News & Events
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="border-none backdrop-blur-md">
                    <ul className="grid sm:w-[300px] gap-2 md:w-[400px] lg:w-[500px]">
                      <ListItem href="/news" title="News and Media">Berita media dan informasi inovasi.</ListItem>
                      <ListItem href="/events" title="Calendar of Events">Acara, workshop, dan seminar inovasi.</ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Innovators */}
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/innovator" className={`${navigationMenuTriggerStyle()} hover:bg-transparent transition-none text-base md:text-lg`}>
                      Innovators
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                {/* About */}
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/about" className={`${navigationMenuTriggerStyle()} hover:bg-transparent transition-none text-base md:text-lg`}>
                      About Us
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                {/* Contact */}
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/contact" className={`${navigationMenuTriggerStyle()} hover:bg-transparent transition-none text-base md:text-lg`}>
                      Contact Us
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                {/* Profile */}
                <NavigationMenuItem className="hidden md:block">
                  <NavigationMenuTrigger className={`transition ${isScrolled ? "" : "hover:bg-white/30"} text-base md:text-lg`}>
                    Profile
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="border-none backdrop-blur-md">
                    <ul className="grid w-fit gap-4">
                      {!user ? (
                        <>
                          <Button variant="ghost" className="w-full justify-start" onClick={() => setOpenLogin(true)}>Masuk</Button>
                          <Button variant="ghost" className="w-full justify-start" onClick={() => setOpenRegister(true)}>Register</Button>
                        </>
                      ) : (
                        <>
                          {isAdmin ? (
                            // === Jika Admin ===
                            <Link href="/admin">
                              <Button variant="ghost" className="w-full justify-start text-left">
                                Admin Panel
                              </Button>
                            </Link>
                          ) : (
                            // === Jika User biasa ===
                            <Link href="/profile">
                              <Button variant="ghost" className="w-full justify-start text-left">
                                Saya
                              </Button>
                            </Link>
                          )}

                          <Button
                            variant="ghost"
                            className="w-full justify-start text-left"
                            onClick={handleSignOut}
                          >
                            Logout
                          </Button>
                        </>
                      )}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

              </NavigationMenuList>
            </NavigationMenu>
          )
        )}

        <LoginDialog open={openLogin} onOpenChange={setOpenLogin} />
        <RegisterDialog open={openRegister} onOpenChange={setOpenRegister} />
      </div>
    </nav>
  );
}

// ================= ListItem Component =================
function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { title: string; children: React.ReactNode; href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">{children}</p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}

// ================= MOBILE ITEM =================
function MobileItem({ href, title, onClick }: { href: string; title: string; onClick?: () => void }) {
  return (
    <Link href={href} onClick={onClick} className="block py-2 text-base text-gray-700">
      {title}
    </Link>
  );
}