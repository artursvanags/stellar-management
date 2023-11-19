import { SettingsSideBarConfig } from '@/types';

export const SettingsSideBarNavigation: SettingsSideBarConfig = {
  mainNav: [
    {
      title: 'My Account',
      href: '/dashboard/settings',
    },
    {
      title: 'Password',
      href: '/dashboard/settings/password',
    },
    {
      title: 'Billing',
      href: '/dashboard/settings/billing',
    },
  ],
};
