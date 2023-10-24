'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { filamentDiameter, filamentState } from '@/types/filament';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Icons } from '@/config/icons';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';

export default function FilamentForm() {
  const { toast } = useToast();
  const router  = useRouter();
  const { register, unregister, handleSubmit, setValue } = useForm();

  const [copies, setCopies] = useState([0]);

  const handleCopy = () => {
    setCopies([...copies, copies[copies.length - 1] + 1]);
  };

  const handleRemove = (index: number) => {
    const id = copies[index];

    // Unregister form fields
    [
      'manufacturer',
      'material',
      'color',
      'diameter',
      'net_weight',
      'used_weight',
      'state',
    ].forEach((fieldName) => {
      unregister(`form_${id}.${fieldName}`);
    });

    // Remove from copies array
    setCopies(copies.filter((_, i) => i !== index));
  };

  const [data, setData] = useState('');
  const [weight, setWeight] = useState(0);
  const [usedWeight, setUsedWeight] = useState(0);

  const handleWeight = (value: number) => {
    if (value < 0 || value > 5000) return;
    setWeight(value);
    if (usedWeight === 0 || usedWeight === weight) {
      setUsedWeight(value);
    }
  };

  const handleUsedWeight = (value: number) => {
    if (value < 0 || value > weight!) return;
    setUsedWeight(value);
  };

  const onSubmitForm = async (data: any) => {
    try {
      setData(JSON.stringify(data, null, 2));
      const response = await fetch('/api/filaments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data }),
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      
      toast({
        title: 'Success!',
        description: `You have successfully added ${
          copies.length < 2
            ? 'a new filament'
            : `new ${copies.length} filaments`
        } to your collection.`,
      });
    } catch (error) {
      console.error(
        'There has been a problem with your fetch operation:',
        error,
      );
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmitForm)}
      className="flex flex-col gap-4 py-4"
    >
      <div className="flex flex-col gap-2">
        <div className="grid grid-cols-9 items-center gap-4">
          <Label htmlFor="manufacturer" className="col-span-2 text-left">
            Manufacturer
          </Label>
          <Label htmlFor="material" className="text-left">
            Material
          </Label>
          <Label htmlFor="color" className="text-left">
            Color
          </Label>
          <Label htmlFor="diameter" className="text-left">
            Diameter
          </Label>
          <Label htmlFor="weight" className="text-left">
            Net weight (g)
          </Label>
          <Label htmlFor="weight" className="text-left">
            Leftover (g)
          </Label>
          <Label htmlFor="weight" className="col-span-2 text-left">
            State
          </Label>
        </div>

        {copies.map((id) => (
          <div key={id} className="grid grid-cols-9 items-center gap-4">
            <div className="col-span-2">
              <Input
                {...register(`form_${id}.manufacturer`)}
                id={`manufacturer_${id}`}
              />
            </div>
            <div>
              <Input
                {...register(`form_${id}.material`)}
                id={`material_${id}`}
              />
            </div>
            <div>
              <Input {...register(`form_${id}.color`)} id={`color_${id}`} />
            </div>

            <Select
              defaultValue={filamentDiameter.default.value}
              onValueChange={(value) => setValue(`form_${id}.diameter`, value)}
              {...register(`form_${id}.diameter`, {
                value: filamentDiameter.default.value,
              })}
            >
              <SelectTrigger className="h-12">
                <SelectValue placeholder={filamentDiameter.default.label} />
              </SelectTrigger>
              <SelectContent>
                {Object.values(filamentDiameter).map((state) => (
                  <SelectItem key={state.value} value={state.value}>
                    {state.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className=" col-span-2 rounded-lg border border-dashed bg-muted-foreground/10 p-2">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Input
                    id="net_weight"
                    type="number"
                    step="any"
                    value={weight || 0}
                    className="bg-background"
                    {...register(`form_${id}.net_weight`, {
                      onChange: (e) => handleWeight(parseFloat(e.target.value)),
                    })}
                  />
                </div>
                <div>
                  <Input
                    id="used_weight"
                    type="number"
                    step="any"
                    className="bg-background"
                    value={usedWeight || 0}
                    {...register(`form_${id}.used_weight`, {
                      onChange: (e) =>
                        handleUsedWeight(parseFloat(e.target.value)),
                    })}
                  />
                </div>
              </div>
            </div>
            <div className="col-span-2 flex gap-2">
              <Select
                defaultValue={filamentState.new.value}
                onValueChange={(value) => setValue(`form_${id}.state`, value)}
                {...register(`form_${id}.state`, {
                  value: filamentState.new.value,
                })}
              >
                <SelectTrigger className="h-12">
                  <SelectValue placeholder={filamentState.new.label} />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(filamentState).map((state) => (
                    <SelectItem key={state.value} value={state.value}>
                      {state.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className=" flex gap-2">
                <Button
                  type="button"
                  size={'icon'}
                  variant="outline"
                  className="h-12"
                  onClick={handleCopy}
                >
                  <Icons.plus className="h-6 w-6" />
                </Button>
                {id > 0 && (
                  <Button
                    type="button"
                    size={'icon'}
                    variant="destructive"
                    className="h-12"
                    onClick={() => handleRemove(copies.indexOf(id))}
                  >
                    <Icons.Trash className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {data && (
        <code className=" h-48 overflow-auto rounded-sm bg-stone-900 p-4 text-stone-200">
          <pre>{data}</pre>
        </code>
      )}

      <Button className="ml-auto" type="submit">
        {copies.length < 2
          ? 'Add a filament'
          : `Add ${copies.length} filaments`}
      </Button>
    </form>
  );
}
