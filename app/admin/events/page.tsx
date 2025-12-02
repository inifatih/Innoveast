"use client";

import AddEvent from "@/components/admin/AddEvent";
import TableEvent from "@/components/admin/TableEvent";

export default function AddEventPage() {
  return (
    <div className="p-6">
      <AddEvent />
      <TableEvent/>
    </div>
  );
}
