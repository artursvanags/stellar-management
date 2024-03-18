import { columns } from '@/components/dashboard/filaments/components/table/columns/columns';
import { DataTable } from '@/components/dashboard/filaments/components/table/data-table';

import { FilamentService } from '@/lib/services/filament-service';

import EmptyFilamentState from './empty-state';
import { getUser } from '@/lib/actions/user-data-actions';

export default async function FilamentTemplate() {
  const { getMultipleFilaments } = FilamentService;
  
  const user = await getUser();
  if (!user) {
    return null;
  }

  const data = await getMultipleFilaments(user.id);

  if (!data || data.length === 0) {
    return (
      <div className="mx-auto my-auto">
        <EmptyFilamentState />
      </div>
    );
  }

  return (
    <div className="relative flex flex-col gap-2 pb-12">
      <div>
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
