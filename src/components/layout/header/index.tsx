import { getSession } from '@/lib/supabase/supabaseServer';
import Navigation from './navigation';
import { marketingNavigation } from '@/config/marketing';
import MobileNavigation from './mobile-navigation';

export default async function SiteHeader() {
  const session = await getSession();

  return (
    <header className="sticky top-0 z-50 lg:static">
      <div className="lg:hidden">
      <MobileNavigation items={marketingNavigation.mainNav} session={session} />
      </div>
      <div className="container hidden lg:block">
        <Navigation items={marketingNavigation.mainNav} session={session} />
      </div>
    </header>
  );
}
