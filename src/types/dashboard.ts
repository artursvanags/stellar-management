export type SideBarNavigationProps = {
  mainNav: {
    title: string;
    href: string;
    icon?: React.ReactNode;
    disabled?: boolean;
    subMenu?: {
      title: string;
      href: string;
      icon?: React.ReactNode;
      disabled?: boolean;
    }[];
  }[];
  accountDropdown: {
    title: string;
    href: string;
    icon?: React.ReactNode;
    shortcut?: string;
    disabled?: boolean;
  }[];
};
