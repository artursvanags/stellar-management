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
  disabled?: boolean;
};

export interface NavigationInterface {
  items: NavItem[];
  session?: any;
}

export type MarketingConfig = {
  mainNav: NavItem[];
};

