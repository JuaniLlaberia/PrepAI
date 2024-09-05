import { notFound } from 'next/navigation';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

import ProfileCards from './(components)/ProfileCards';
import { getUserData } from '@/access-data/user';

const SettingsPage = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) return notFound();

  const userData = await getUserData(user?.id);

  return <ProfileCards userData={userData} />;
};

export default SettingsPage;
