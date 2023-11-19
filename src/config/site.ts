import { SiteConfig, NavItem } from '@/types';

export const siteConfig: SiteConfig = {
  name: 'Vanamio',
  description: 'An enchanced Portfolio for Web Development',
  developer: 'Vanamio Labs',
  author: 'Arturs Vanags',
  url: process.env.NEXT_PUBLIC_SITE_URL as string,
  ogImage: '#',
  links: {
    facebook: '#',
  },
  keywords: ['Vanamio', 'Web Development', 'NextJS', 'Blog', 'Ecommerce'],
};

export const NavigationConfig: NavItem[] = [
  {
    title: 'About Us',
    href: '/about-us',
  },
  {
    title: 'Contacts',
    href: '/contacts',
  },
];
