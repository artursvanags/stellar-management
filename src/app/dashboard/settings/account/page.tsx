import AccountTemplate from '@/components/dashboard/settings/templates/account';
import SectionInformation from '@/components/global/section-information';

const MyAccountPage = () => {
  return (
    <div className="space-y-6">
      <SectionInformation
        title="My Account"
        description="Update your account information."
      />
      <AccountTemplate />
    </div>
  );
};

export default MyAccountPage;
