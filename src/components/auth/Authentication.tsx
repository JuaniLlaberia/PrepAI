import EmailAuth from './EmailAuth';
import GithubAuthBtn from './GithubAuthBtn';
import GitlabAuthBtn from './GitlabAuthBtn';
import GoogleAuthBtn from './GoogleAuthBtn';
import { Separator } from '../ui/separator';

const Authentication = () => {
  return (
    <div className='flex flex-col w-full'>
      <div className='flex flex-col gap-2'>
        <GoogleAuthBtn />
        <GithubAuthBtn />
        <GitlabAuthBtn />
      </div>
      <Separator className='my-5' />
      <EmailAuth />
    </div>
  );
};

export default Authentication;
