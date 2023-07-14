'use client'
import { columns } from "./columns";
import { DataTable } from "@/components/dashboard/dataTable";
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then((res) => res.json());
export default function getData() {
    const { data, error, isLoading } = useSWR('http://localhost:3000/api/filaments', fetcher);
    
    if (error) return <div>Failed to load</div>;
    if (!data) return <div>Loading...</div>;

    return (
        <>
            <DataTable columns={columns} data={data} />
        </>
    )
}