import Link from 'next/link';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import Image from 'next/image';
import { siteConfig } from '@/config/site';

export default function Hero() {
  return (
    <section className="container grid grid-cols-12 space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
      <div className="col-span-8 mr-auto place-self-center">
        <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
          My name is {siteConfig.author}
        </h1>

        <p className="max-w-[42rem] pt-2 leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          A comprehensive NextJS developer for your team.
        </p>

        <div className="pt-4">
          <div className="space-x-2">
            <Link
              href="about-us"
              className={cn(buttonVariants({ size: 'lg', variant: 'default' }))}
            >
              Download CV
            </Link>
            <Link
              href="about-me"
              className={cn(buttonVariants({ size: 'lg', variant: 'outline' }))}
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>

      <div className="col-span-4">
        <div className="relative aspect-square">
          <Image
            src="/avatar.jpg"
            fill
            className="rounded object-cover"
            alt="Avatar"
          />
        </div>
      </div>
    </section>
  );
}
