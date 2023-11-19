import MyAccount from '@/components/dashboard/settings/components/my-account';
import { getData } from '@/hooks/getData';

export default async function AccountPage() {
  const { user } = await getData();

  return <div>{user && <MyAccount {...user} />}</div>;
}
