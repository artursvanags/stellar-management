import { PageHeader, PageHeaderProps } from '@/components/layout/page-header';
import type { Metadata } from 'next';

const info: PageHeaderProps = {
  title: 'My name is Arturs Vanags',
  description: 'Somebody, who takes a gamble and throws himself into unknown.',
};

export const metadata: Metadata = {
  title: info.title,
  description: info.description,
};

export default function AboutPage() {
  return (
    <PageHeader
      className="bg-stone-950 py-8 text-white md:py-12 lg:py-48"
      title={info.title}
      description={info.description}
    />
  );
}
