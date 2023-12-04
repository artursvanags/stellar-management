import { cn } from '@/lib/utils';

export type PageHeadingProps = {
  title?: string;
  description?: string;
  className?: string;
  children?: React.ReactNode;
};

export const PageHeading: React.FC<PageHeadingProps> = ({
  title,
  description,
  className,
  children,
}) => {
  return (
    <section
      className={cn(
        'border-b py-8 dark:bg-transparent md:py-12 lg:py-24',
        className,
      )}
    >
      <div className="container">
        <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
          {title ? title : 'Header'}
        </h1>
        {description && (
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            {description}
          </p>
        )}
        {children}
      </div>
    </section>
  );
};
