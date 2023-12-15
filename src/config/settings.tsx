import { SettingsSideBarConfig } from '@/types';
import { MyAccount } from './assets/icons';

export const SettingsSideBarNavigation: SettingsSideBarConfig = {
  mainNav: [
    {
      title: 'General',
      description: 'Manage your general settings.',
      href: '/dashboard/settings',
      icon: <MyAccount.Settings className="mr-2 h-4 w-4" />,
    },
    {
      title: 'Billing',
      description: 'Manage your billing information.',
      href: '/dashboard/settings/billing',
      icon: <MyAccount.Billing className="mr-2 h-4 w-4" />,
    },
    {
      title: 'Account',
      description: 'Manage your account settings.',
      href: '/dashboard/settings/account',
      icon: <MyAccount.User className="mr-2 h-4 w-4" />,
    },
  ],
};
