'use client';

import SetupAccountForm from '@/components/dashboard/settings/components/setup-account-form';
import { UserContext } from '@/lib/context/userContext';
import { useContext } from 'react';

const SetupAccount = () => {
  const { user } = useContext(UserContext);
  if (!user) return null;
  return (
    <div className="flex h-screen items-center justify-center px-4 lg:px-0">
      <SetupAccountForm user={user} />
    </div>
  );
};

export default SetupAccount;
