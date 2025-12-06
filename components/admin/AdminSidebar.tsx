"use client";

import { actionSignOut } from "@/app/auth/logout/action";
import { cn } from "@/lib/utils";
import {
  BadgeAlert,
  FlagIcon,
  HomeIcon,
  LayoutDashboard,
  LogOut,
  Newspaper,
  Rocket,
  Users
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";

export function AdminSidebar() {
  const pathname = usePathname();

  const menu = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Carousel", href: "/admin/carousel", icon: LayoutDashboard },
    { name: "Inovator", href: "/admin/innovator", icon: Users },
    { name: "Inovasi", href: "/admin/innovation", icon: Rocket },
    { name: "Berita", href: "/admin/news", icon: Newspaper },
    { name: "Acara", href: "/admin/events", icon: FlagIcon },
    { name: "Kategori", href: "/admin/categories", icon: BadgeAlert },
  ];

  const handleSignOut = async () => {
    const result = await actionSignOut();

    if (result.error) {
      console.error("Logout gagal:", result.error);
      return;
    }

    // Logout berhasil → refresh halaman
    window.location.reload();
  };


  return (
    <aside className="fixed left-0 top-0 h-screen w-48 bg-white shadow-2xl flex flex-col z-50">
      {/* Header */}
      <div className="p-6 border-none relative shadow-sm flex flex-col items-center gap-3">
        <Link 
          href="/" 
          className="flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors text-gray-700 border border-gray-200 hover:border-orange-300 hover:text-orange-600"
        >
          <HomeIcon className="h-4 w-4 mx-2"/>
          <p className="text-sm font-semibold">Home Page</p>
        </Link>

        <h1 className="text-xl font-bold text-gray-800">
          Admin Panel
        </h1>
      </div>


      {/* Menu */}
      <nav className="flex-1 p-4 space-y-1 shadow-sm">
        {menu.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors border",
                isActive
                  ? "bg-orange-500 text-white border-orange-600 shadow-sm"
                  : "bg-white text-gray-700 border-gray-200 hover:bg-orange-50 hover:border-orange-300 hover:text-orange-600"
              )}
            >
              <Icon
                className={cn(
                  "h-4 w-4 mr-3 transition",
                  isActive ? "text-white" : "text-gray-500"
                )}
              />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4">
        <Button 
          onClick={handleSignOut} 
          className="flex items-center px-4 py-2 bg-white border border-gray-200 text-gray-700 hover:bg-orange-50 hover:border-orange-300 hover:text-orange-600 w-full rounded-lg text-sm transition">
          <LogOut className="h-4 w-4 mr-3" />
          Logout
        </Button>
      </div>
    </aside>
  );
}
