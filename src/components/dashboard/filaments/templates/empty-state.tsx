import { EmptyStateIcons } from '@/assets/icons';
import { AddFilamentButton } from '@/components/dashboard/components/add-filament-button';

const EmptyFilamentState = () => {
  return (
    <div className="max-w-[720px] rounded border-4 border-dashed p-8 text-center text-muted-foreground">
      <EmptyStateIcons.Filament className="mx-auto mb-4 h-24 w-24" />
      <h2 className=" text-2xl font-bold ">No filaments are found</h2>
      <div className="pb-4">
        Start by adding a new filament to your inventory. You can do this by clicking on the &quot;Add Filament&quot;
        button. Happy 3D printing!
      </div>
      <AddFilamentButton />
    </div>
  );
};

export default EmptyFilamentState;
