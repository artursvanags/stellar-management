import AccountTemplate from '@/components/dashboard/settings/templates/account';
import SubHeading from '@/components/dashboard/settings/components/sub-heading';

const MyAccountPage = () => {
  return (
    <div className="space-y-6">
      <SubHeading
        title="My Account"
        description="Update your account information."
      />
      <AccountTemplate />
    </div>
  );
};

export default MyAccountPage;
