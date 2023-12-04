import { getData } from '@/lib/utils/get-data';

import FilamentComponent from '@/components/dashboard/filaments/templates/filament-component';

export default async function FilamentPage() {
  const { filaments } = await getData();
  return (
    <div className="w-full py-10">
      <FilamentComponent data={filaments} />
    </div>
  );
}
