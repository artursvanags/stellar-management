'use client';

import useSWR from 'swr';

import { columns } from '@/components/dashboard/filaments/table/columns';
import { DataTable } from '@/components/dashboard/filaments/table/dataTable';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function FilamentComponent() {
  const { data, error, isLoading } = useSWR('/api/filaments', fetcher);

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return <DataTable columns={columns} data={data} />;
}
