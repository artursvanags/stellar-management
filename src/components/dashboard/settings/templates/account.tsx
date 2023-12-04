import { getData } from '@/lib/utils/get-data';

import MyAccountForm from '@/components/forms/my-account-form';
import DeleteAccount from '@/components/dashboard/settings/components/delete-account';

const AccountTemplate: React.FC = async () => {
  const { user } = await getData();
  if (!user) return null;
  return (
    <div className="space-y-6">
      <MyAccountForm data={user} />
      <DeleteAccount user={user} />
    </div>
  );
};

export default AccountTemplate;
