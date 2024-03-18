import { SideBarConfig, SettingsSideBarConfig, MarketingConfig } from '@/types';
import { Icons, MyAccount, SidebarIcons } from '../assets/icons';

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

export const SettingsSideBarNavigation: SettingsSideBarConfig = {
  mainNav: [
    {
      title: 'General',
      description: 'Manage your general settings.',
      href: '/dashboard/settings',
      icon: MyAccount.Settings,
    },
    {
      title: 'Billing',
      description: 'Manage your billing information.',
      href: '/dashboard/settings/billing',
      icon: MyAccount.Billing,
    },
    {
      title: 'Account',
      description: 'Manage your account settings.',
      href: '/dashboard/settings/account',
      icon: MyAccount.User,
    },
  ],
};

export const marketingNavigation: MarketingConfig = {
  mainNav: [
    {
      title: 'About Me',
      href: '/about-me',
    },
    {
      title: 'Contacts',
      href: '/contacts',
    },
  ],
};

