// app/(Admin)/adminDashboard/innovation/page.tsx
import AddNews from "@/components/admin/AddNews";
import TableNews from "@/components/admin/TableNews";

export default function AddNewsPage() {
  return (
    <div className="p-6">
      <AddNews />
      <TableNews/>
    </div>
  );
}
