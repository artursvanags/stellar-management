export type DashboardConfig = {
  mainNav: {
    title: string;
    href: string;
    disabled?: boolean;
    showDataLength?: boolean;
  }[];
  accountDropdown: {
    title: string;
    href: string;
    icon?: React.ReactNode;
    shortcut?: string;
    disabled?: boolean;
  }[];
};
