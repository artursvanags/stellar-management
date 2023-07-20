'use client'; 
import { columns } from "./columns";
import { DataTable } from "@/components/dashboard/dataTable";
import useSWR from "swr";

const fetcher = (url: any) => fetch(url).then((res) => res.json());

export default function Page() {
  const { data: filaments, error } = useSWR("/api/filaments", fetcher);

  if (error) return <div>Failed to load</div>;
  if (!filaments) return <div>Loading...</div>;
            
    return (
    <div className="mx-auto py-10">
      <DataTable columns={columns} data={filaments} />
    </div>
  )
}