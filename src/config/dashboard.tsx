import { SideBarConfig } from '@/types';
import { Icons, MyAccount, SidebarIcons } from './assets/icons';

export const SideBarNavigation: SideBarConfig = {
  mainNav: [
    {
      icon: (
        <SidebarIcons.Filaments className="mr-3 h-4 w-4" />
      ),
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
      href: '/dashboard/settings',
    },
    {
      icon: <MyAccount.Billing className="mr-3 h-4 w-4" />,
      title: 'Billing',
      href: '/dashboard/settings/billing',
    },
  ],
};
