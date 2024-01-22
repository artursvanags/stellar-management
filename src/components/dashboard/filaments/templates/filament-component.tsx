import { columns } from '@/components/dashboard/filaments/components/table/columns';
import { DataTable } from '@/components/dashboard/filaments/components/table/dataTable';

import { getData } from '@/lib/utils/get-data';

export default async function FilamentTemplate() {
  const { filaments } = await getData();

  return (
    <div className="relative flex flex-col gap-2">
      <div>
        <DataTable columns={columns} data={filaments} />
      </div>
    </div>
  );
}
