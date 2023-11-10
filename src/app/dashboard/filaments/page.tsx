import FilamentComponent from '@/components/dashboard/filaments/template/FilamentComponent';
import { getFilaments } from '@/lib/actions/getFilaments';

export default async function FilamentPage() {
  const data = await getFilaments();
  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className=" w-full py-10">
      <FilamentComponent data={data} />
    </div>
  );
}
