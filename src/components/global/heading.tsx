'use client';
import { cn } from '@/lib/utils';

type HeadingProps = {
  title: string;
  description?: string;
  props?: React.HTMLAttributes<HTMLDivElement>;
  className?: string;
};

const Heading: React.FC<HeadingProps> = ({
  title,
  description,
  className,
  ...props
}) => (
  <div {...props} className={cn('pb-2', className)}>
    <h1 className="font-heading text-bold text-3xl">{title}</h1>
    {description && (
      <p className="text-sm text-muted-foreground">{description}</p>
    )}
  </div>
);

export default Heading;
