import { DashboardConfig } from '@/types/dashboard';
import { MyAccount } from './icons';

export const DashboardNavigation: DashboardConfig = {
  mainNav: [
    {
      title: 'Filaments',
      href: '/dashboard/filaments',
      showDataLength: true,
    },
    {
      title: 'Files',
      href: '/dashboard/files',
    },
  ],
  accountDropdown: [
    {
      icon: <MyAccount.User className="mr-3 h-4 w-4" />,
      title: 'View Profile',
      href: '/account',
      shortcut: '⇧⌘P',
    },
    {
      icon: <MyAccount.Billing className="mr-3 h-4 w-4" />,
      title: 'Billing',
      href: '/account/addresses',
      shortcut: '⌘B',
    },
    {
      icon: <MyAccount.Orders className="mr-3 h-4 w-4" />,
      title: 'Orders',
      href: '/account/orders',
      shortcut: '⌘O',
    },
  ],
};
