import Link from 'next/link';
import { HiMiniArrowLongRight, HiSparkles } from 'react-icons/hi2';

import CallToAction from '@/components/CallToAction';
import Navbar from '@/components/Navbar';
import TextRevealByWord from '@/components/ui/text-reveal';
import AnimatedShinyText from '@/components/ui/text-shiny';
import DotPattern from '@/components/DotBackground';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

const Home = () => {
  return (
    <>
      <Navbar />
      <header
        className='relative overflow-hidden flex flex-col items-center justify-center px-6 pt-28 mb-6 md:pt-48 md:mb-16 lg:pt-52 lg:mb-20 w-full'
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
                <span>Powered by Google Gemini</span>
              </AnimatedShinyText>
            </div>
          </div>
          <h1 className='flex items-center gap-1 text-5xl md:text-6xl lg:text-7xl font-medium'>
            Master your Interview Skills
          </h1>
          <h2 className='text-5xl md:text-6xl lg:text-7xl font-medium md:mt-2'>
            with{' '}
            <span className='bg-gradient-to-b from-blue-500 dark:from-blue-400 from-40% to-blue-700 dark:to-blue-600 bg-clip-text text-transparent'>
              AI-Driven
            </span>{' '}
            Practice
          </h2>
          <p className='mt-6 text-start text-xl lg:text-2xl max-w-[700px] text-muted-foreground/90 dark:text-muted-foreground/80'>
            Dive into AI fully customizable interviews based on your needs with
            AI generated challenges.
          </p>
        </div>
        <div className='flex justify-start w-full md:justify-center md:w-auto gap-2 py-12 z-10'>
          <Link href='/dashboard' className={cn(buttonVariants({}), 'group')}>
            Start practicing
            <HiMiniArrowLongRight className='size-4 ml-1.5 group-hover:translate-x-1 transition-transform' />
          </Link>
          <Link
            href='#features'
            className={cn(buttonVariants({ variant: 'ghost' }), 'group')}
          >
            Learn more
            <HiMiniArrowLongRight className='size-4 ml-1.5 group-hover:translate-x-1 transition-transform' />
          </Link>
        </div>
        <div className='h-24'></div>
        <DotPattern className='pointer-events-none absolute inset-0 h-full w-full fill-neutral-400/70 [mask-image:linear-gradient(to_bottom_right,white,transparent)]' />
        <div className='w-full absolute bottom-0 bg-gradient-to-b from-transparent to-white dark:to-black h-10'></div>
      </header>
      <section className='px-4 md:px-16 lg:px-32 xl:px-56' id='features'>
        <h2 className='text-sm md:text-base lg:text-lg text-center uppercase font-medium text-muted-foreground mb-2'>
          Our Features
        </h2>
        <p className='flex justify-center items-center'>
          <span className='text-center max-w-[600px] text-2xl md:text-3xl lg:text-4xl font-medium'>
            Wondering if there is a more efficient way to practice for your
            interviews?
          </span>
        </p>
        <ul className='grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 my-8 md:my-12 lg:my-16 lg:px-8'>
          <li className='relative overflow-hidden w-full h-72 bg-background-2 border border-border rounded-xl md:col-span-2'>
            <h4 className='absolute text-9xl font-medium -bottom-10 left-8'>
              01
            </h4>
            <div className='flex p-4'>
              <p className='bg-background text-muted-foreground border border-border p-1 px-4 rounded-full uppercase tracking-tight font-medium text-sm'>
                AI Generated questions
              </p>
            </div>
            <div className='px-5 mt-2'>
              <h4 className='text-lg font-medium tracking-tight'>
                AI Takes the Wheel.
              </h4>
              <p className='text-muted-foreground'>
                Get job interview questions generated by AI based on your needs.
              </p>
            </div>
          </li>
          <li className='relative overflow-hidden w-full h-72 bg-background-2 border border-border rounded-xl col-span-1'>
            <h4 className='absolute text-9xl font-medium -bottom-10 left-8'>
              02
            </h4>
            <div className='flex p-4'>
              <p className='bg-background text-muted-foreground border border-border p-1 px-4 rounded-full uppercase tracking-tight font-medium text-sm'>
                Feedback & score
              </p>
            </div>
            <div className='px-5 mt-2'>
              <h4 className='text-lg font-medium tracking-tight'>
                AI as the Interviewer.
              </h4>
              <p className='text-muted-foreground'>
                Get feedback on how you answer the questions to improve in the
                future.
              </p>
            </div>
          </li>
          <li className='relative overflow-hidden w-full h-72 bg-background-2 border border-border rounded-xl col-span-1'>
            <h4 className='absolute text-9xl font-medium -bottom-10 left-8'>
              03
            </h4>
            <div className='flex p-4'>
              <p className='bg-background text-muted-foreground border border-border p-1 px-4 rounded-full uppercase tracking-tight font-medium text-sm'>
                Coding challenges
              </p>
            </div>
            <div className='px-5 mt-2'>
              <h4 className='text-lg font-medium tracking-tight'>
                Take the Interview One More Step.
              </h4>
              <p className='text-muted-foreground'>
                Practice with AI generated techinical interview excercises to be
                ready for any challenge.
              </p>
            </div>
          </li>
        </ul>
      </section>
      <section className='pt-16 lg:pt-28 px-4 md:px-16 lg:px-32 xl:px-56'>
        <h2 className='text-sm md:text-base lg:text-lg text-center uppercase font-medium text-muted-foreground mb-2'>
          Functionality
        </h2>
        <p className='flex justify-center items-center'>
          <span className='text-center max-w-[600px] text-2xl md:text-3xl lg:text-4xl font-medium'>
            It&apos;s super simple and easy to use it. Let&apos;s see how to get
            started with MockAI.
          </span>
        </p>
        <div className='flex items-center justify-center w-full mt-6 md:mt-8 lg:mt-10'>
          <div className='w-full max-w-[1100px] min-h-[250px] sm:min-h-[350px] md:min-h-[450px] lg:min-h-[550px] bg-background-2 rounded-xl border border-border' />
        </div>
      </section>
      <section className='z-10 flex min-h-[16rem] items-center justify-center bg-background'>
        <TextRevealByWord text='MockAI will change the way you prepare for interviews.' />
      </section>
      <CallToAction />
      <footer className='px-4 pb-4'>
        <p className='text-xs md:text-sm text-center text-muted-foreground'>
          MockAI &copy; {new Date().getFullYear()} All rights reserved
        </p>
      </footer>
    </>
  );
};

export default Home;
