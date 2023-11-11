import Navigation from './navigation';
import { FilamentModalButton } from '@/components/modals/filamentModal';
export default function DashboardHeader() {
  return (
    <header className="sticky top-0 z-50 lg:static">
      <div className="lg:hidden">
        {/* <MobileNavigation
          items={marketingNavigation.mainNav}
          session={session}
        /> */}
      </div>
      <div className="hidden lg:block">
        <div className="ml-auto flex flex-1 justify-end h-16 items-center">
          <FilamentModalButton />
        </div>
      </div>
    </header>
  );
}
