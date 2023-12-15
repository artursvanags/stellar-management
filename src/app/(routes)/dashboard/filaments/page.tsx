import FilamentTemplate from '@/components/dashboard/filaments/templates/filament-component';
import Heading from '@/components/global/heading';

const FilamentsPage = () => {
  return (
    <div className="space-y-6">
      <Heading title="Filaments" />
      <FilamentTemplate />
    </div>
  );
};

export default FilamentsPage;
