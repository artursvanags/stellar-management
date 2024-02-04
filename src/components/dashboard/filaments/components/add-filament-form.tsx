'use client';

import { z } from 'zod';
import { useEffect, useRef, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

import { filamentDiameter, filamentStatus } from '@/config/filament';
import { filamentSchema } from '@/lib/validations/auth';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import { ScrollArea } from '@/components/ui/scroll-area';

import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Icons, Spinner } from '@/config/assets/icons';
import { Tag, TagInput } from '@/components/ui/tag-input';
import { createMultipleFilaments } from '@/lib/actions/filament-data-actions';

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

const MaxWeight: number = 8000; // 8kg

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
  const handleNewRow = () => {
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
  };
  const [showTags, setShowTags] = useState<number | null>(null);

  const handleDuplicate = (index: number) =>
    append(form.getValues(`filaments.${index}`));

  const handleWeightChange = (value: string, index: number) => {
    let inputValue = parseFloat(value);
    let outputValue = String(inputValue);

    if (inputValue >= MaxWeight) {
      outputValue = String(MaxWeight);
      toast({
        title: 'Warning!',
        description: `The maximum weight of a filament is ${MaxWeight} g. Please check your input.`,
      });
    } else if (inputValue < 0) {
      outputValue = '0';
    } else if (isNaN(inputValue)) {
      outputValue = '';
    }

    form.setValue(`filaments.${index}.weight`, outputValue);
    form.setValue(`filaments.${index}.remainingWeight`, outputValue);
  };

  const handleRemainingWeightChange = (value: string, index: number) => {
    const originalWeight = parseFloat(
      form.getValues(`filaments.${index}.weight`),
    );
    let inputValue = parseFloat(value);
    let outputValue = String(inputValue);

    if (inputValue > originalWeight) {
      outputValue = originalWeight.toString();
    } else if (inputValue < 0 || isNaN(inputValue)) {
      outputValue = '0';
    }
    form.setValue(`filaments.${index}.remainingWeight`, outputValue);
  };

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      fields.length > 1 ? setInteraction(true) : setInteraction(false);
    }
  }, [fields.length, setInteraction]);

  const handleRemoveCopy = (index: number) => remove(index);
  const handleRemoveAllCopies = () => {
    for (let i = fields.length - 1; i > 0; i--) handleRemoveCopy(i);
  };

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
      //setCloseModal();
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

        <ScrollArea type="always">
          <div className="max-h-[70vh]">
            <div className="m-1 space-y-2">
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className={`grid grid-cols-9 items-start gap-4 ${
                    showTags === index && 'rounded bg-primary-foreground/50 p-2'
                  }`}
                >
                  <FormField
                    control={form.control}
                    name={`filaments.${index}.manufacturer`}
                    render={({ field }) => (
                      <FormItem className="col-span-2 flex flex-col items-center">
                        <FormControl>
                          <div className="relative flex w-full items-center">
                            <span className="absolute ml-2 rounded-md bg-muted px-1 text-sm text-muted-foreground">
                              #{index + 1}
                            </span>
                            <Input
                              {...field}
                              placeholder={fieldLabels.manufacturer.placeholder}
                              className="pl-10"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`filaments.${index}.material`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder={fieldLabels.material.placeholder}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`filaments.${index}.color`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder={fieldLabels.color.placeholder}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`filaments.${index}.diameter`}
                    render={({ field }) => (
                      <FormItem>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {Object.values(filamentDiameter).map((diameter) => (
                              <SelectItem
                                defaultValue={field.value}
                                key={diameter.value}
                                value={diameter.value.toString()}
                              >
                                {diameter.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="col-span-2 grid grid-cols-2 gap-4 rounded-lg bg-muted-foreground/10">
                    <FormField
                      control={form.control}
                      name={`filaments.${index}.weight`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder={fieldLabels.weight.placeholder}
                              type="number"
                              step="any"
                              value={field.value || ''}
                              onChange={(e) => {
                                handleWeightChange(e.target.value, index);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`filaments.${index}.remainingWeight`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder={
                                fieldLabels.weight.remainingPlaceholder
                              }
                              type="number"
                              step="any"
                              value={field.value || ''}
                              onChange={(e) => {
                                handleRemainingWeightChange(
                                  e.target.value,
                                  index,
                                );
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div>
                    <FormField
                      control={form.control}
                      name={`filaments.${index}.status`}
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {Object.values(filamentStatus).map((state) => (
                                <SelectItem
                                  key={state.value}
                                  value={state.value.toString()}
                                >
                                  {state.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      icon={<Icons.Tag className="h-4 w-4" />}
                      size={'icon'}
                      variant={showTags === index ? 'secondary' : 'outline'}
                      className="relative flex-grow"
                      onClick={() =>
                        setShowTags(showTags === index ? null : index)
                      }
                    >
                      {form.watch(`filaments.${index}.tags`)?.length ? (
                        <span className="absolute -right-1 -top-1 rounded bg-primary px-1 text-xs font-bold text-primary-foreground">
                          {form.watch(`filaments.${index}.tags`)?.length ?? 0}
                        </span>
                      ) : null}
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          icon={<Icons.MenuVertical className="h-4 w-4" />}
                          size={'icon'}
                          variant="ghost"
                        />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => handleDuplicate(index)}
                        >
                          <Icons.Copy className="mr-2 h-4 w-4" />
                          Duplicate
                        </DropdownMenuItem>
                        {index > 0 && (
                          <DropdownMenuItem
                            className="text-red-500"
                            onClick={() => handleRemoveCopy(index)}
                          >
                            <Icons.Trash className="mr-2 h-4 w-4" />
                            Remove
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  {showTags === index && (
                    <div className="col-span-full">
                      <Label htmlFor="tags" className="text-left">
                        {fieldLabels.tags.label}
                      </Label>

                      <FormField
                        control={form.control}
                        name={`filaments.${index}.tags`}
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormControl>
                              <TagInput
                                {...field}
                                placeholder="Enter a tag"
                                tags={
                                  form.getValues(`filaments.${index}.tags`) ||
                                  []
                                }
                                setTags={(newTags) => {
                                  form.setValue(
                                    `filaments.${index}.tags`,
                                    newTags as [Tag, ...Tag[]],
                                  );
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
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
              onClick={handleRemoveAllCopies}
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
