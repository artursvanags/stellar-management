'use client';

import { z } from 'zod';
import axios from 'axios';
import { useCallback, useEffect, useRef, useState } from 'react';
import { set, useFieldArray, useForm } from 'react-hook-form';
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
import { ScrollArea } from '@/components/ui/scroll-area';

import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Icons, Spinner } from '@/config/assets/icons';

interface FilamentFormProps {
  setInteraction: (disabled: boolean) => void;
  setCloseModal: () => void;
}

type FormData = z.infer<typeof filamentSchema>;

const fieldLabels = {
  manufacturer: {
    label: 'Manufacturer',
    placeholder: 'Prusa',
  },
  material: {
    label: 'Material',
    placeholder: 'PLA',
  },
  color: {
    label: 'Color',
    placeholder: 'Galaxy Black',
  },
  diameter: {
    label: 'Diameter (mm)',
    placeholder: '1.75',
  },
  weight: {
    label: 'Weight (g)',
    placeholder: 'Net weight',
    remainingPlaceholder: 'Remaining',
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
  const [tags, setTags] = useState<string[]>([]);
  const handleTags = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number,
    field: any,
  ) => {
    if (event.key === 'Enter' || event.key === ',') {
      event.preventDefault();
      const value = event.currentTarget.value;
      const newTags = [...tags, value];
      setTags(newTags);
      form.setValue(`filaments.${index}.tags`, newTags);
    }
  };

  const handleDuplicate = (index: number) =>
    append(form.getValues(`filaments.${index}`));

  const handleWeightChange = (value: string, index: number, field: any) => {
    let input = parseFloat(value);
    if (input > MaxWeight) {
      value = String(MaxWeight);
    } else if (input < 0) {
      value = '0';
    }
    field.onChange(value);
    handleRemainingWeightValue(value, index);
  };

  const handleRemainingWeightValue = useCallback(
    (value: string, index: number) => {
      let input = parseFloat(value);
      const originalWeight = parseFloat(
        form.getValues(`filaments.${index}.weight`),
      );

      if (isNaN(input) || input < 0) {
        input = NaN;
      } else if (input > originalWeight) {
        input = originalWeight;
      } else if (input > MaxWeight) {
        input = MaxWeight;
      }

      form.setValue(`filaments.${index}.remainingWeight`, String(input));
    },
    [form],
  );

  useEffect(() => {
    console.log('use effect is rendering')
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      fields.length > 1 ? setInteraction(true) : setInteraction(false);
    }
  }, [fields.length]);

  const handleRemoveCopy = (index: number) => remove(index);
  const handleRemoveAllCopies = () => {
    for (let i = fields.length - 1; i > 0; i--) handleRemoveCopy(i);
  };



  const onSubmit = form.handleSubmit(async (formData) => {
    setInteraction(true);
    setLoading(true);
    try {
      await axios.post(`/api/filaments`, [...formData['filaments']]);
      toast({
        title: 'Success!',
        description: `You have successfully added ${
          fields.length < 2
            ? 'a new filament'
            : `new ${fields.length} filaments`
        } to your collection.`,
      });
    } catch (error) {
      console.error(
        'There has been a problem with your fetch operation:',
        error,
      );
    }
    setCloseModal();
    setInteraction(false);
    setLoading(false);
    router.refresh();
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="flex flex-col gap-4 py-4">
        <div className="flex flex-col gap-2">
          <div className="grid grid-cols-9 items-center gap-4 px-1 pr-3">
            <Label htmlFor="manufacturer" className="col-span-2 text-left">
              {fieldLabels.manufacturer.label}
            </Label>
            <Label htmlFor="material" className="text-left">
              {fieldLabels.material.label}
            </Label>
            <Label htmlFor="color" className="text-left">
              {fieldLabels.color.label}
            </Label>
            <Label htmlFor="diameter" className="text-left">
              {fieldLabels.diameter.label}
            </Label>
            <Label htmlFor="weight" className="col-span-2 text-left">
              {fieldLabels.weight.label}
            </Label>
            <Label htmlFor="status" className="text-left">
              {fieldLabels.status.label}
            </Label>
            <Label htmlFor="tags" className="text-left">
              {fieldLabels.tags.label}
            </Label>
          </div>
          <ScrollArea className="absolute pr-4">
            <div className="m-1 max-h-[70vh] space-y-2">
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className={`grid grid-cols-9 items-start gap-4`}
                >
                  <FormField
                    control={form.control}
                    name={`filaments.${index}.manufacturer`}
                    render={({ field }) => (
                      <FormItem className="col-span-2 flex items-center">
                        <FormControl>
                          <div className="relative flex items-center">
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
                              onChange={(e) => {
                                handleWeightChange(
                                  e.target.value,
                                  index,
                                  field,
                                );
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
                              onChange={(e) => {
                                handleRemainingWeightValue(
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
                      variant="outline"
                      className="flex-grow"
                    />
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
                  <div className="col-span-full space-y-2">
                    <Label htmlFor="tags" className="text-left">
                      {fieldLabels.tags.label}
                    </Label>
                    <FormField
                      control={form.control}
                      name={`filaments.${index}.tags`}
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormControl>
                            <div className="tag-input">
                              {tags.map((tag, tagIndex) => (
                                <span key={tagIndex} className="tag">
                                  {tag}
                                </span>
                              ))}
                              <Input
                                {...field}
                                placeholder={fieldLabels.tags.placeholder}
                                onKeyDown={(event) =>
                                  handleTags(event, index, field)
                                }
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
        <div className="flex gap-2">
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
