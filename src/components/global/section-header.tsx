'use client';
import { cn } from '@/lib/utils';

type SectionHeaderProps = {
  title: string;
  description?: string;
  props?: React.HTMLAttributes<HTMLDivElement>;
  children?: React.ReactNode;
  className?: string;
};

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  description,
  className,
  children,
  ...props
}) => (
  <div {...props} className={cn('flex h-20 items-center border-b', className)}>
    <div className="flex-col">
      <h1 className="font-heading text-3xl">{title}</h1>
      {description && (
        <p className="text-muted-foreground">{description}</p>
      )}
    </div>
    {children && <div className="ml-auto flex items-center">{children}</div>}
  </div>
);

export default SectionHeader;
