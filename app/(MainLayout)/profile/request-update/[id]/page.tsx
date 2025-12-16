"use client";

import EditUserInnovationById from "@/components/EditUserInnovationById";
import { useParams } from "next/navigation";

export default function EditInnovation() {
  const params = useParams();
  const id = Number(params.id); // ambil id dari URL
  return <EditUserInnovationById id={id} />;
}