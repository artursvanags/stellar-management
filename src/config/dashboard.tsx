import { SideBarNavigationProps } from '@/types/dashboard';
import { Icons, MyAccount, SidebarIcons } from './icons';

export const SideBarNavigation: SideBarNavigationProps = {
  mainNav: [
    {
      icon: <SidebarIcons.Filaments className="mr-3 h-4 w-4 text-muted-foreground" />,
      title: 'Filaments',
      href: '/dashboard/filaments',
      subMenu: [
        {
          icon: <SidebarIcons.Favorites className="mr-3 h-4 w-4 text-muted-foreground" />,
          title: 'Favorites',
          href: '/dashboard/filaments',
        },
      ],
    },
    {
      icon: <Icons.Files className="mr-3 h-4 w-4 text-muted-foreground" />,
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
