"use client";

import AddInnovator from "@/components/admin/AddInnovator";
import ConfirmInnovator from "@/components/admin/ConfirmInnovator";
import TableInnovator from "@/components/admin/TableInnovator";


export default function AddInnovatorPage() {
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AddInnovator />
        <ConfirmInnovator />
      </div>
      <TableInnovator />
    </div>
  );
}