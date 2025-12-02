"use client";

import AddCarousel from "@/components/admin/AddCarousel";
import TableCarousel from "@/components/admin/TableCarousel";

export default function AddCarouselPage() {
  return (
    <div className="p-6">
      <AddCarousel />
      <TableCarousel/>
    </div>
  );
}
