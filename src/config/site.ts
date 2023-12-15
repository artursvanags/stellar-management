import { SiteConfig } from '@/types';

export const siteConfig: SiteConfig = {
  name: 'Stelpine',
  description: 'Take control of your 3D Printing ecosystem',
  developer: 'Stelpine Labs',
  author: 'Arturs Vanags',
  url: process.env.NEXT_PUBLIC_SITE_URL as string,
  ogImage: '#',
  links: {
    facebook: '#',
  },
  keywords: ['Stelpine', '3D Printing', 'Audit', 'Filaments'],
};