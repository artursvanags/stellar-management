'use client';
import MyAccountForm from '@/components/dashboard/settings/components/my-account-form';
import DeleteAccount from '@/components/dashboard/settings/components/delete-account';

const AccountTemplate: React.FC = () => {
  return (
    <div className="space-y-6">
      <MyAccountForm />
      <DeleteAccount />
    </div>
  );
};

export default AccountTemplate;
