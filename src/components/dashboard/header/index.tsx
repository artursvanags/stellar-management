import Navigation from './navigation';

import { getFilaments } from '@/lib/actions/getFilaments';

export default async function DashboardHeader() {
  const data = await getFilaments();
  if (!data) return <div> Loading... </div>;

  return (
    <header className="container sticky top-0 z-50 lg:static">
      <div className="lg:hidden">
        {/* <MobileNavigation
          items={marketingNavigation.mainNav}
          session={session}
        /> */}
      </div>
      <div className="hidden lg:block">
        <Navigation data={data} />
      </div>
    </header>
  );
}
