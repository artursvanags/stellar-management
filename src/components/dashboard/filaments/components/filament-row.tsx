'use client';

import { useState } from 'react';

import { filamentDiameter, filamentStatus } from '@/config/filament';

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

import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Icons } from '@/config/assets/icons';
import { Tag, TagInput } from '@/components/ui/tag-input';

// TO-DO - Move to config
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

interface FilamentRowProps {
  index: number;
  form: any;
  remove: (index: number) => void;
  append: (value: any) => void;
}

const FilamentRow = ({ index, form, remove, append }: FilamentRowProps) => {
  const [showTags, setShowTags] = useState<number | null>(null);
  const { toast } = useToast();

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
  return (
    <div
      className={`grid grid-cols-9 items-start gap-4 ${
        showTags === index && 'rounded bg-primary-foreground/5 p-2'
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
              <Input {...field} placeholder={fieldLabels.color.placeholder} />
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
            <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                  placeholder={fieldLabels.weight.remainingPlaceholder}
                  type="number"
                  step="any"
                  value={field.value || ''}
                  onChange={(e) => {
                    handleRemainingWeightChange(e.target.value, index);
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(filamentStatus)
                    .filter((state) => state.value !== 'in_use')
                    .map((state) => (
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
          variant={'outline'}
          className={`relative flex-grow ${
            showTags === index && ' border-dashed'
          }`}
          onClick={() => setShowTags(showTags === index ? null : index)}
        >
          {form.watch(`filaments.${index}.tags`)?.length ? (
            <span className="absolute -right-1 -top-1 rounded border bg-secondary px-1 text-xs font-bold text-white">
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
            <DropdownMenuItem onClick={() => handleDuplicate(index)}>
              <Icons.Copy className="mr-2 h-4 w-4" />
              Duplicate
            </DropdownMenuItem>
            {index > 0 && (
              <DropdownMenuItem
                className="text-red-500"
                onClick={() => remove(index)}
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
                    tags={form.getValues(`filaments.${index}.tags`) || []}
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
  );
};

export default FilamentRow;
