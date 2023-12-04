import SubHeading from '@/components/dashboard/settings/components/sub-heading';
import GeneralSettingsTemplate from '@/components/dashboard/settings/templates/general';

const GeneralSettingsPage = () => {
  return (
    <div className="space-y-6">
      <SubHeading
        title="My Account"
        description="General settings for your account."
      />
      <GeneralSettingsTemplate />
    </div>
  );
};

export default GeneralSettingsPage;
