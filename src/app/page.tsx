import Link from 'next/link';
import { HiSparkles } from 'react-icons/hi2';

import Navbar from '@/components/landing-ui/Navbar';
import TextRevealByWord from '@/components/ui/text-reveal';
import AnimatedShinyText from '@/components/ui/text-shiny';
import CallToAction from '@/components/landing-ui/CallToAction';
import DotPattern from '@/components/landing-ui/DotBackground';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { FeaturesBento } from '@/components/landing-ui/FeaturesBento';
import { Faq } from '@/components/landing-ui/Faq';
import { Separator } from '@/components/ui/separator';

const Home = () => {
  return (
    <>
      <Navbar />
      <header
        className='relative overflow-hidden flex flex-col items-center justify-center px-4 md:px-16 lg:px-20 2xl:px-48 pt-28 mb-6 md:pt-36 md:mb-16 lg:pt-40 xl:pt-44 lg:mb-20 xl:mb-52 w-full'
        id='hero'
      >
        <div className='mb-7 z-10'>
          <div className='z-10 flex items-center justify-center mb-2 md:mb-3 lg:md-4'>
            <div
              className={cn(
                'group rounded-full border border-black/5 bg-neutral-100 text-xs text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800'
              )}
            >
              <AnimatedShinyText className='inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400 lg:text-sm'>
                <HiSparkles className='size-3 mr-1.5 fill-yellow-400' />
                <span>PrepAI beta is now available</span>
              </AnimatedShinyText>
            </div>
          </div>
          <h1 className='flex text-center items-center gap-1 text-5xl md:text-6xl lg:text-7xl font-semibold'>
            Master Interviews with
          </h1>
          <h2 className='text-5xl text-center md:text-6xl lg:text-7xl font-semibold md:mt-2'>
            <span className='bg-gradient-to-b from-violet-500 dark:from-violet-400 from-40% to-violet-700 dark:to-violet-600 bg-clip-text text-transparent'>
              AI-Driven
            </span>{' '}
            Practice
          </h2>
          <p className='mt-6 text-center text-lg lg:text-xl text-muted-foreground/90 dark:text-muted-foreground/80'>
            Dive into fully customizable paths designed to help you land your
            next job.
          </p>
        </div>
        <div className='flex flex-col justify-start w-full md:justify-center px-16 md:w-auto gap-2 py-6 z-10 md:flex-row md:px-1'>
          <Link
            href='/login'
            className={cn(buttonVariants({ size: 'lg' }), 'text-base')}
          >
            Get started free
          </Link>
          <a
            href='#features'
            className={cn(
              buttonVariants({ variant: 'secondary', size: 'lg' }),
              'text-base'
            )}
          >
            See features
          </a>
        </div>
        <div className='h-24'></div>
        <DotPattern className='pointer-events-none absolute inset-0 h-full w-full fill-neutral-400/70 [mask-image:linear-gradient(to_bottom_right,white,transparent)]' />
        <div className='w-full absolute bottom-0 bg-gradient-to-b from-transparent to-white dark:to-black h-10'></div>
      </header>
      <section className='px-4 md:px-16 lg:px-20 2xl:px-80' id='features'>
        <h2 className='text-sm md:text-base lg:text-lg text-center uppercase font-medium text-muted-foreground mb-2'>
          Our Features
        </h2>
        <p className='flex justify-center items-center'>
          <span className='text-center max-w-[600px] text-2xl md:text-3xl lg:text-4xl font-medium'>
            Wondering if there is a more efficient way to practice for your
            interviews?
          </span>
        </p>
        <FeaturesBento />
        <div className='flex items-center justify-center mt-12'>
          <Link href='/login' className={cn(buttonVariants({}), 'text-base')}>
            Get started free
          </Link>
        </div>
      </section>
      <section className='pt-28 xl:pt-36 px-4 md:px-16 lg:px-32 xl:px-60'>
        <h2 className='text-sm md:text-base lg:text-lg text-center uppercase font-medium text-muted-foreground mb-2'>
          Functionality
        </h2>
        <p className='flex justify-center items-center'>
          <span className='text-center max-w-[600px] text-2xl md:text-3xl lg:text-4xl font-medium'>
            It&apos;s super simple to use it. Let&apos;s see how to get started
            with PrepAI.
          </span>
        </p>
        <div className='flex items-center justify-center w-full mt-6 md:mt-8 lg:mt-10'>
          <div className='w-full max-w-[1100px] min-h-[250px] sm:min-h-[350px] md:min-h-[450px] lg:min-h-[550px] bg-background-2 rounded-xl border border-border' />
        </div>
      </section>
      <section className=' flex flex-col items-center justify-center w-full pt-28 xl:pt-36 px-4 md:px-16 lg:px-32 xl:px-80'>
        <h2 className='text-4xl font-medium mb-8'>FAQs answered</h2>
        <Faq />
        <div className='flex items-center justify-center mt-12'>
          <Link href='/login' className={cn(buttonVariants({}), 'text-base')}>
            Get started free
          </Link>
        </div>
      </section>
      <section className='z-10 flex min-h-[16rem] items-center justify-center bg-background'>
        <TextRevealByWord text='PrepAI will change the way you prepare for interviews.' />
      </section>
      <CallToAction />
      <footer className='flex flex-col items-center px-4 md:px-20 lg:px:40 2xl:px-80 mt-6'>
        <Separator />
        <div className='flex w-full items-center justify-between py-4'>
          <p className='text-xs md:text-sm text-muted-foreground'>
            PrepAI &copy; {new Date().getFullYear()} All rights reserved
          </p>
          <ul className='flex flex-row items-center gap-2 text-xs md:text-sm text-muted-foreground'>
            <li>
              <Link className='hover:underline' href='/tos'>
                Terms
              </Link>
            </li>
            <li>
              <Link className='hover:underline' href='/privacy-policy'>
                Privacy
              </Link>
            </li>
          </ul>
        </div>
      </footer>
    </>
  );
};

export default Home;
