'use client';

import { useEffect, useState } from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '../ui/button';
import { Spinner } from '@/config/assets/icons';

interface EditCardProps {
  title: string;
  onConfirm: () => void;
  onCancel?: () => void;
  loading?: boolean;
  description?: string;
  className?: string;
  children?: React.ReactNode;
}

export const EditCard: React.FC<EditCardProps> = ({
  children,
  description,
  title,
  className,
  onConfirm,
  onCancel,
  loading,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter>
        {onCancel && (
          <Button variant={'outline'} onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button
          className="ml-auto"
          type="submit"
          onClick={onConfirm}
          disabled={loading}
          icon={
            loading ? <Spinner className="mr-2 h-4 w-4 animate-spin" /> : null
          }
          loading={loading}
        >
          Update
        </Button>
      </CardFooter>
    </Card>
  );
};
