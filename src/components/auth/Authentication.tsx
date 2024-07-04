import EmailAuth from './EmailAuth';
import GithubAuthBtn from './GithubAuthBtn';
import GoogleAuthBtn from './GoogleAuthBtn';
import LinkedinAuthBtn from './LinkedinAuthBtn';
import { Separator } from '../ui/separator';

const Authentication = () => {
  return (
    <div className='flex flex-col w-full'>
      <div className='flex flex-col gap-2'>
        <GoogleAuthBtn />
        <GithubAuthBtn />
        <LinkedinAuthBtn />
      </div>
      <Separator className='my-5' />
      <EmailAuth />
    </div>
  );
};

export default Authentication;
