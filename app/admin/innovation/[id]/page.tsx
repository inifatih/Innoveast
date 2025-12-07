"use client";

import EditInnovationById from "@/components/admin/EditInnovationById";
import { useParams } from "next/navigation";

export default function EditInnovation() {
  const params = useParams();
  const id = Number(params.id); // ambil id dari URL
  return <EditInnovationById id={id} />;
}
