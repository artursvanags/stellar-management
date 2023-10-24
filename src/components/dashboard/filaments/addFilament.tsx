import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import FilamentForm from './addFilamentForm';

export function AddFilamentButton() {

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add New</Button>
      </DialogTrigger>
      <DialogContent className=" sm:max-w-screen-xl sm:max-h-[80vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Add new filament</DialogTitle>
          <DialogDescription>
            Add a new filament to your collection.
          </DialogDescription>
        </DialogHeader>
        <FilamentForm />
      </DialogContent>
    </Dialog>
  );
}
