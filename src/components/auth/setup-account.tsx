'use client';

import SetupAccountForm from '@/components/dashboard/settings/components/setup-account-form';
import { User } from '@prisma/client';

const SetupAccount: React.FC<User> = (user) => {
  return (
    <div className="flex h-screen items-center justify-center px-4 lg:px-0">
      <SetupAccountForm user={user} />
    </div>
  );
};

export default SetupAccount;
