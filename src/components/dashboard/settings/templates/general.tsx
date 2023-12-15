import { getData } from '@/lib/utils/get-data';
import GeneralSettingsForm from '@/components/dashboard/settings/components/general-settings-form';

const GeneralSettingsTemplate: React.FC = async () => {
  const { userSettings } = await getData();
  if (!userSettings) return null;
  return (
    <div className="space-y-6">
      <GeneralSettingsForm data={userSettings} />
    </div>
  );
};

export default GeneralSettingsTemplate;
