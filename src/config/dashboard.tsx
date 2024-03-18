import { SideBarConfig } from '@/types';
import { Icons, MyAccount, SidebarIcons } from './assets/icons';

export const SideBarNavigation: SideBarConfig = {
  mainNav: [
    {
      icon: Icons.Files,
      title: 'Dashboard',
      href: '/dashboard',
    },
    {
      icon: Icons.Filament,
      title: 'Filaments',
      href: '/dashboard/filaments',
    },
   
  ],
  bottomNav: [
    {
      icon: Icons.Trash,
      title: 'About Us',
      href: '/dashboard/about-us',
    },
  ],
  accountDropdown: [
    {
      icon: MyAccount.User,
      title: 'Account',
      href: '/dashboard/settings/account',
    },
    {
      icon: MyAccount.Billing,
      title: 'Billing',
      href: '/dashboard/settings/billing',
    },
  ],
};
