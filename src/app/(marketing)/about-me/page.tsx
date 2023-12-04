import {
  PageHeading,
  PageHeadingProps,
} from '@/components/marketing/components/page-heading';
import type { Metadata } from 'next';

const info: PageHeadingProps = {
  title: 'My name is Arturs Vanags',
  description: 'Somebody, who takes a gamble and throws himself into unknown.',
};

export const metadata: Metadata = {
  title: info.title,
  description: info.description,
};

export default function AboutPage() {
  return (
    <PageHeading
      className="bg-stone-950 py-8 text-white md:py-12 lg:py-48"
      title={info.title}
      description={info.description}
    />
  );
}
