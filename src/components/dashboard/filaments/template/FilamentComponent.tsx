import { columns } from '@/components/dashboard/filaments/table/columns';
import { DataTable } from '@/components/dashboard/filaments/table/dataTable';
import { getFilaments } from '@/lib/filaments/filament-actions';

export default async function FilamentComponent() {
  const data = await getFilaments();
  if (!data) return <div> Loading... </div>;

  return <DataTable columns={columns} data={data} />;
}
