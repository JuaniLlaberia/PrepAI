import Image from 'next/image';

const Logo = () => {
  return (
    <div className='relative h-[27.5px] w-[87.5px]'>
      <Image
        src='/logo-light.png'
        className='block dark:hidden'
        alt='logo'
        fill
        draggable={false}
      />
      <Image
        src='/logo-dark.png'
        className='hidden dark:block'
        alt='logo'
        fill
        draggable={false}
      />
    </div>
  );
};

export default Logo;
