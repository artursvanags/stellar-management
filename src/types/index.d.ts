import { LucideIcon } from "lucide-react";

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
  icon?: LucideIcon;
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

export type SideBarConfig = Record<string, NavItem[]>;

export type SettingsSideBarConfig = {
  mainNav: NavItem[];
};

export interface SearchParams {
  [key: string]: string | string[] | undefined;
}
