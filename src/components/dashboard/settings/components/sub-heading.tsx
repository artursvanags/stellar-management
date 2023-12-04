import { cn } from '@/lib/utils';

type SubHeadingProps = {
  title: string;
  description?: string;
  props?: React.HTMLAttributes<HTMLDivElement>;
  className?: string;
};

const SubHeading: React.FC<SubHeadingProps> = ({
  title,
  description,
  className,
  ...props
}) => (
  <div {...props} className={cn('pb-2', className)}>
    <h2 className="font-heading text-lg">{title}</h2>
    {description && (
      <p className="text-sm text-muted-foreground">{description}</p>
    )}
  </div>
);

export default SubHeading;
