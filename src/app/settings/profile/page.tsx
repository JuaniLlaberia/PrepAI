import ProfileCards from './(components)/ProfileCards';
import { getUserData } from '@/access-data/user';

const SettingsPage = async () => {
  const userData = await getUserData();

  return <ProfileCards userData={userData} />;
};

export default SettingsPage;
