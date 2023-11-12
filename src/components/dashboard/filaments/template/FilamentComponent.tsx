'use client';

import { columns } from '@/components/dashboard/filaments/table/columns';
import { DataTable } from '@/components/dashboard/filaments/table/dataTable';
import { Filaments } from '@/types/database';

export default function FilamentComponent({ data }: { data: Filaments[] }) {
  return <DataTable columns={columns} data={data} />;
}
