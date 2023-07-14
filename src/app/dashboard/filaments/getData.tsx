'use client'
import { columns } from "./columns";
import { DataTable } from "@/components/dashboard/dataTable";
import SWR from 'swr';
import axios from 'axios';

const fetcher = ( url: string ) => axios.get(url).then(res => res.data)

export default function getData() {
    const { data, error, isLoading } = SWR('http://localhost:3000/api/filaments', fetcher);
    
    if (error) return <div>Failed to load</div>;
    if (!data) return <div>Loading...</div>;

    return (
        <>
            <DataTable columns={columns} data={data} />
        </>
    )
}