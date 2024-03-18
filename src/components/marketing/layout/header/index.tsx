import Navigation from '../../components/navigation';
import { marketingNavigation } from '@/config/navigation';
import MobileNavigation from '../../components/mobile-navigation';

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 lg:static">
      <div className="lg:hidden">
        <MobileNavigation items={marketingNavigation.mainNav} />
      </div>
      <div className="container hidden lg:block">
        <Navigation items={marketingNavigation.mainNav} />
      </div>
    </header>
  );
}
