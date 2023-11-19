import { getData } from '@/hooks/getData';

import FilamentComponent from '@/components/dashboard/filaments/template/FilamentComponent';

export default async function FilamentPage() {
  const { filaments } = await getData();
  return (
    <div className="w-full py-10">
      <FilamentComponent data={filaments} />
    </div>
  );
}
