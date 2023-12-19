import { columns } from '@/components/dashboard/filaments/components/table/columns';
import { DataTable } from '@/components/dashboard/filaments/components/table/dataTable';

import { AddFilamentButton } from '@/components/modals/filamentModal';
import { getData } from '@/lib/utils/get-data';

export default async function FilamentTemplate() {
  const { filaments } = await getData();
  return (
    <div className="flex flex-col gap-2">
      <div className="flex">
        <AddFilamentButton className="ml-auto" />
      </div>
      <div>
        <DataTable columns={columns} data={filaments} />
      </div>
    </div>
  );
}
