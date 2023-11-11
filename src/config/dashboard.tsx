import { SideBarNavigationProps } from '@/types/dashboard';
import { Icons, MyAccount } from './icons';

export const SideBarNavigation: SideBarNavigationProps = {
  mainNav: [
    {
      icon: <Icons.Filament className="mr-3 h-4 w-4" />,
      title: 'Filaments',
      href: '/dashboard/filaments',
    },
    {
      icon: <Icons.Files className="mr-3 h-4 w-4" />,
      title: 'Files',
      href: '/dashboard/files',
    },
  ],
  accountDropdown: [
    {
      icon: <MyAccount.User className="mr-3 h-4 w-4" />,
      title: 'Settings',
      href: '/account',
      shortcut: '⇧⌘P',
    },
    {
      icon: <MyAccount.Billing className="mr-3 h-4 w-4" />,
      title: 'Billing',
      href: '/account/billing',
      shortcut: '⌘B',
    },
  ],
};
