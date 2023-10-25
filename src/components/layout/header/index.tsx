import Navigation from './navigation';
import { marketingNavigation } from '@/config/navigation';
import MobileNavigation from './mobile-navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/options';

export default async function SiteHeader() {
  const session = await getServerSession(authOptions);

  return (
    <header className="sticky top-0 z-50 lg:static">
      <div className="lg:hidden">
        <MobileNavigation
          items={marketingNavigation.mainNav}
          session={session}
        />
      </div>
      <div className="container hidden lg:block">
        <Navigation items={marketingNavigation.mainNav} session={session} />
      </div>
    </header>
  );
}
