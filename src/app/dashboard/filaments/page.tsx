'use client';
import useSWR from 'swr';
import { columns } from './columns';
import { DataTable } from '@/components/dashboard/table/dataTable';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Page() {
  const { data, error, isLoading } = useSWR('/api/filaments', fetcher);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
