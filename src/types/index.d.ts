export type SiteConfig = {
  name: string;
  description: string;
  developer: string;
  author: string;
  url: string;
  ogImage: string;
  links: {
    facebook: string;
  };
  keywords: string[];
};

export type NavItem = {
  title: string;
  href: string;
  description?: string;
  shortcut?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  subMenu?: NavItem[];
};

export interface NavigationInterface {
  items: NavItem[];
  session?: any;
}

export type MarketingConfig = {
  mainNav: NavItem[];
};

export type SideBarConfig = {
  mainNav: NavItem[];
  accountDropdown: NavItem[];
};

export type SettingsSideBarConfig = {
  mainNav: NavItem[];
};
