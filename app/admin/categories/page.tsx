"use server";

import AddCategoriesForm from "@/components/admin/AddCategories";
import TableCategories from "@/components/admin/TableCategories";

export default async function AddInnovationPage() {
  
  return (
    <div className="p-6">
      <AddCategoriesForm />
      <TableCategories /> 
    </div>

  );
}