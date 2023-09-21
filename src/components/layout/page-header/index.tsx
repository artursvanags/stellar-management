import { cn } from '@/lib/utils';

export type PageHeaderProps = {
  title?: string;
  description?: string;
  className?: string;
  children?: React.ReactNode;
};

export function PageHeader({ title, description, ...props }: PageHeaderProps) {
  return (
    <section
      className={cn(
        'border-b py-8 dark:bg-transparent md:py-12 lg:py-24',
        props.className,
      )}
    >
      <div className="container">
        <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
          {title ? title : 'Header'}
        </h1>
        <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          {description ? description : 'Description text here'}
        </p>
        {props.children}
      </div>
    </section>
  );
}
