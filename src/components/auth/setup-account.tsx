'use client';

import SetupAccountForm from '@/components/dashboard/settings/components/setup-account-form';
import { UseUserData } from '@/lib/context/userContext';

const SetupAccount = () => {
  const data = UseUserData();
  return (
    <div className="flex h-screen items-center justify-center px-4 lg:px-0">
      <SetupAccountForm user={data} />
    </div>
  );
};

export default SetupAccount;
