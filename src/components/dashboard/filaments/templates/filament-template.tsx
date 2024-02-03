import { columns } from '@/components/dashboard/filaments/components/table/columns';
import { DataTable } from '@/components/dashboard/filaments/components/table/dataTable';

import { getMultipleFilaments } from '@/lib/actions/filament-data-actions';

export default async function FilamentTemplate() {
  const filaments = await getMultipleFilaments();
  return (
    <div className="relative flex flex-col gap-2">
      <div>
        <DataTable columns={columns} data={filaments} />
      </div>
    </div>
  );
}
