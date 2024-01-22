import { AddFilamentButton } from '@/components/dashboard/components/add-filament-button';
import FilamentTemplate from '@/components/dashboard/filaments/templates/filament-component';
import SectionHeader from '@/components/global/section-header';
import { getData } from '@/lib/utils/get-data';

const FilamentsPage = async () => {
  const { user } = await getData();
  if (!user) return null;
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
