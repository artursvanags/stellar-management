'use client';

import { z } from 'zod';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

import { filamentDiameter, filamentStatus } from '@/config/filament';
import { filamentSchema } from '@/lib/validations/auth';

import { Label } from '@/components/ui/label';

import { Form } from '@/components/ui/form';

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import { ScrollArea } from '@/components/ui/scroll-area';

import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Icons, Spinner } from '@/config/assets/icons';
import FilamentRow from './filament-row';

interface FilamentFormProps {
  setInteraction: (disabled: boolean) => void;
  setCloseModal: () => void;
}

type FormData = z.infer<typeof filamentSchema>;

const fieldLabels = {
  manufacturer: {
    label: 'Manufacturer',
    placeholder: 'Prusa',
    tooltip: 'The manufacturer of the filament',
  },
  material: {
    label: 'Material',
    placeholder: 'PLA',
    tooltip: 'The material of the filament',
  },
  color: {
    label: 'Color',
    placeholder: 'Galaxy Black',
    tooltip: 'The color of the filament',
  },
  diameter: {
    label: 'Diameter (mm)',
    placeholder: '1.75',
    tooltip: 'The diameter of the filament',
  },
  weight: {
    label: 'Weight (g)',
    placeholder: 'Net weight',
    remainingPlaceholder: 'Remaining',
    tooltip:
      'The manufacturer weight of the filament ( not including the spool ) ',
  },
  remaininghWeight: {
    label: 'Remaining Weight (g)',
    placeholder: 'Remaining',
    tooltip: 'The remaining weight of the filament. ',
  },
  status: {
    label: 'Status',
    placeholder: 'New',
  },
  tags: {
    label: 'Tags',
    placeholder: 'e.g. #prusa #pla',
  },
};

const FilamentForm = ({ setInteraction, setCloseModal }: FilamentFormProps) => {
  const router = useRouter();
  const { toast } = useToast();
  const initialRender = useRef(true);
  const [loading, setLoading] = useState(false);
  const form = useForm<FormData>({
    resolver: zodResolver(filamentSchema),
    defaultValues: {
      filaments: [
        {
          manufacturer: '',
          material: '',
          color: '',
          diameter: filamentDiameter.default.value,
          status: filamentStatus.new.value,
        },
      ],
    },
  });
  const { fields, append, remove } = useFieldArray({
    name: 'filaments',
    control: form.control,
  });
  const handleNewRow = useCallback(() => {
    append({
      manufacturer: '',
      material: '',
      color: '',
      diameter: filamentDiameter.default.value,
      weight: '',
      remainingWeight: '',
      status: filamentStatus.new.value,
      tags: [],
    });
  }, [append]);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      fields.length > 1 ? setInteraction(true) : setInteraction(false);
    }
  }, [fields.length, setInteraction]);

  const prepareFormData = (data: FormData) => {
    const prepareData = data.filaments.map((filament) => {
      const { tags, ...rest } = filament;
      const { weight, remainingWeight } = rest;
      if (tags && tags.length > 0)
        return {
          ...rest,
          weight: parseFloat(weight),
          remainingWeight: parseFloat(remainingWeight),
          ...(tags ? { tags: tags.map((tag) => ({ name: tag.name })) } : {}),
        };
      return {
        ...rest,
        weight: parseFloat(weight),
        remainingWeight: parseFloat(remainingWeight),
      };
    });
    return prepareData;
  };

  const onSubmit = form.handleSubmit(async (formData) => {
    const data = prepareFormData(formData);
    setInteraction(true);
    setLoading(true);
    try {
      const response = await fetch(`/api/filaments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`${response.status}`);
      }
    } catch (error) {
      console.error(
        'There has been a problem with your fetch operation:',
        error,
      );
    } finally {
      toast({
        title: 'Success!',
        description: `You have successfully added ${
          fields.length < 2
            ? 'a new filament'
            : `new ${fields.length} filaments`
        } to your collection.`,
      });
      setCloseModal();
      setInteraction(false);
      setLoading(false);
      router.refresh();
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="flex flex-col py-2">
        <div className="m-1 grid grid-cols-9 items-center gap-4 pb-2">
          <Label htmlFor="manufacturer" className="col-span-2 text-left">
            {fieldLabels.manufacturer.label}
          </Label>
          <Label htmlFor="material">{fieldLabels.material.label}</Label>
          <Label htmlFor="color">{fieldLabels.color.label}</Label>
          <Label htmlFor="diameter">{fieldLabels.diameter.label}</Label>
          <div className="col-span-2 ">
            <Tooltip>
              <TooltipTrigger>
                <Label htmlFor="weight" className="group flex cursor-pointer">
                  {fieldLabels.weight.label}
                  <Icons.Info className="ml-2 h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary" />
                </Label>
              </TooltipTrigger>
              <TooltipContent>{fieldLabels.weight.tooltip}</TooltipContent>
            </Tooltip>
          </div>

          <Label htmlFor="status">{fieldLabels.status.label}</Label>
          <Label htmlFor="tags">{fieldLabels.tags.label}</Label>
        </div>

        <ScrollArea type="hover">
          <div className="m-1 max-h-[70dvh] space-y-2">
            {fields.map((field, index) => (
              <FilamentRow
                key={field.id}
                index={index}
                form={form}
                remove={remove}
                append={append}
              />
            ))}
          </div>
        </ScrollArea>

        <div className="flex gap-2 pt-4">
          <Button
            icon={<Icons.plus className="mr-2 h-5 w-5" />}
            type="button"
            variant="secondary"
            disabled={fields.length >= 25}
            onClick={() => {
              if (fields.length < 25) {
                handleNewRow();
              }
            }}
          >
            New row
          </Button>
          {fields.length > 1 && (
            <Button
              icon={<Icons.Trash className="mr-2 h-4 w-4" />}
              type="button"
              variant="ghost"
              className="text-red-500"
              onClick={() => {
                for (let i = fields.length - 1; i > 0; i--) remove(i);
              }}
            >
              Remove All
            </Button>
          )}
          <Button type="submit" className={'ml-auto'} disabled={loading}>
            {loading ? (
              <>
                <Spinner className="mr-2 h-4 w-4 animate-spin" /> Adding...
              </>
            ) : (
              <>
                {fields.length < 2
                  ? 'Add a filament'
                  : `Add ${fields.length} filaments`}
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default FilamentForm;
