import FilamentComponent from '@/components/dashboard/filaments/template/FilamentComponent';
import { getData } from '@/lib/actions/getData';

export default async function Page() {
  const data = await getData();
  if (!data?.filamentData) {
    return <div>Loading...</div>;
  }

  return (
    <div className=" w-full py-10">
      <FilamentComponent data={data.filamentData} />
    </div>
  );
}
