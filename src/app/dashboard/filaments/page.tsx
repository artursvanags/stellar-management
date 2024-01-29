import { AddFilamentButton } from '@/components/dashboard/components/add-filament-button';
import FilamentTemplate from '@/components/dashboard/filaments/templates/filament-template';
import SectionHeader from '@/components/global/section-header';

const FilamentsPage = () => {
  return (
    <div className="space-y-6">
      <SectionHeader
        title="Filaments"
        description="View, update or delete your filaments."
      >
        <AddFilamentButton />
      </SectionHeader>
      <FilamentTemplate />
    </div>
  );
};

export default FilamentsPage;
