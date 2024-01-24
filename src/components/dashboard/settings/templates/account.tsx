import { getData } from '@/lib/actions/get-data';

import MyAccountForm from '@/components/dashboard/settings/components/my-account-form';
import DeleteAccount from '@/components/dashboard/settings/components/delete-account';

const AccountTemplate: React.FC = async () => {
  const { user } = await getData();
  if (!user) return null;

  return (
    <div className="space-y-6">
      <MyAccountForm data={user} />
      <DeleteAccount data={user} />
    </div>
  );
};

export default AccountTemplate;
