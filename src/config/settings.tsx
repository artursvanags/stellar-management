import { SettingsSideBarConfig } from '@/types';

export const SettingsSideBarNavigation: SettingsSideBarConfig = {
  mainNav: [
    {
      title: 'General',
      description: 'Manage your general settings.',
      href: '/dashboard/settings',
    },
    {
      title: 'Billing',
      description: 'Manage your billing information.',
      href: '/dashboard/settings/billing',
    },
    {
      title: 'Account',
      description: 'Manage your account settings.',
      href: '/dashboard/settings/account',
    },
  ],
};
