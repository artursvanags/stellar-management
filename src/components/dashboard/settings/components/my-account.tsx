import MyAccountForm from '@/components/forms/my-account-form';
import { User } from '@prisma/client';

const MyAccount: React.FC<User> = async (user) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">My Account</h3>
        <p className="text-sm text-muted-foreground">
          Update your account settings. 
        </p>
      </div>
      <MyAccountForm {...user} />
    </div>
  );
};

export default MyAccount;
