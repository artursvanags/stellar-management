'use client';
import { columns } from "./columns";
import { DataTable } from "@/components/dashboard/dataTable";
import getFilaments from "./getFilaments";

export default function Page() {
  const { data, error } = getFilaments();
            
  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div className="mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}