import SectionInformation from '@/components/global/section-information';
import GeneralSettingsTemplate from '@/components/dashboard/settings/templates/general';

const GeneralSettingsPage = () => { 
  return (
    <div className="space-y-6">
      <SectionInformation
        title="General"
        description="General settings for your account."
      />
      <GeneralSettingsTemplate />
    </div>
  );
};

export default GeneralSettingsPage;
