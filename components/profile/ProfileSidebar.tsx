"use client";

import { actionSignOut } from "@/app/auth/logout/action";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import {
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  LogOut,
  LucideIcon,
  Rocket,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function ProfileSidebar() {
  const pathname = usePathname();

  const menu = [
    { name: "Data diri", href: "/profile", icon: LayoutDashboard },
    { name: "Pesan Masuk", href: "/profile/pesan-masuk", icon: Rocket },
    { name: "Update Inovasi", href: "/profile/request-update", icon: Rocket },
  ];

  // 🔒 STATE NETRAL (server & client SAMA)
  const [open, setOpen] = useState(true);

  // ✅ browser-only logic
  useEffect(() => {
    const saved = localStorage.getItem("admin-sidebar");
    if (saved === "closed") {
      setOpen(false);
    }
  }, []);

  const toggle = () => {
    setOpen((prev) => {
      const next = !prev;
      localStorage.setItem("admin-sidebar", next ? "open" : "closed");
      return next;
    });
  };

  const handleSignOut = async () => {
    const result = await actionSignOut();
    if (result?.error) {
      console.error("Logout gagal:", result.error);
      return;
    }
    window.location.reload();
  };

  return (
    <TooltipProvider delayDuration={200}>
      <aside
        className={cn(
          "sticky top-16 h-full pt-20",
          "bg-white/80 backdrop-blur",
          "border-r border-gray-200",
          "flex flex-col transition-all duration-300 ease-in-out",
          open ? "w-52" : "w-16"
        )}
      >

        {/* Toggle */}
        <Button
          onClick={toggle}
          className="absolute -right-12 top-6 z-50 mt-12 p-1.5 rounded-full bg-white hover:bg-orange-400 transition"
        >
          {open ? (
            <ChevronLeft className="h-4 w-4 text-gray-600" />
          ) : (
            <ChevronRight className="h-4 w-4 text-gray-600" />
          )}
        </Button>


        {/* Menu */}
        <nav className="flex-1 px-2.5 py-4 space-y-1.5">
          {menu.map((item) => (
            <SidebarItem
              key={item.href}
              open={open}
              href={item.href}
              label={item.name}
              icon={item.icon}
              active={pathname === item.href}
            />
          ))}
        </nav>

        {/* Logout */}
        <div className="p-2">
          <SidebarButton
            open={open}
            label="Logout"
            icon={LogOut}
            onClick={handleSignOut}
          />
        </div>
      </aside>
    </TooltipProvider>
  );
}

/* =============================
   REUSABLE COMPONENTS
============================= */

function SidebarItem({
  open,
  href,
  label,
  icon: Icon,
  active,
}: {
  open: boolean;
  href: string;
  label: string;
  icon: LucideIcon;
  active?: boolean;
}) {
  return (
    <div className="relative group">
      <Link
        href={href}
        className={cn(
          "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
          active
            ? "bg-orange-50 text-orange-600"
            : "text-gray-600 hover:bg-gray-50 hover:text-orange-600"
        )}
      >
        <Icon className="h-4 w-4 shrink-0" />
        {open && <span>{label}</span>}
      </Link>

      {/* TEXT ONLY HOVER */}
      {!open && (
        <div
          className="
            pointer-events-none
            absolute left-full top-1/2 -translate-y-1/2 ml-3
            whitespace-nowrap
            rounded-lg bg-white px-3 py-1.5
            text-sm font-medium text-gray-700
            shadow-lg border border-gray-200
            opacity-0 scale-95
            transition-all duration-150
            group-hover:opacity-100 group-hover:scale-100
          "
        >
          {label}
        </div>
      )}
    </div>
  );
}

function SidebarButton({
  open,
  label,
  icon: Icon,
  onClick,
}: {
  open: boolean;
  label: string;
  icon: LucideIcon;
  onClick: () => void;
}) {
  return (
    <div className="relative group">
      <Button
        onClick={onClick}
        variant="ghost"
        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-500 hover:text-red-600 hover:bg-red-50"
      >
        <Icon className="h-4 w-4" />
        {open && <span>{label}</span>}
      </Button>

      {!open && (
        <div
          className="
            pointer-events-none
            absolute left-full top-1/2 -translate-y-1/2 ml-3
            whitespace-nowrap
            rounded-lg bg-white px-3 py-1.5
            text-sm font-medium text-gray-700
            shadow-lg border border-gray-200
            opacity-0 scale-95
            transition-all duration-150
            group-hover:opacity-100 group-hover:scale-100
          "
        >
          {label}
        </div>
      )}
    </div>
  );
}

