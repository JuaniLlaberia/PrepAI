import { HiSparkles } from 'react-icons/hi2';

import CallToAction from '@/components/CallToAction';
import Navbar from '@/components/Navbar';
import TextRevealByWord from '@/components/ui/text-reveal';
import AnimatedShinyText from '@/components/ui/text-shiny';
import { cn } from '@/lib/utils';

const Home = () => {
  return (
    <>
      <Navbar />
      <header
        className="bg-red-100flex flex-col items-center justify-center px-6 pt-28 mb-6 lg:pt-52 lg:mb-20 w-full bg-[url('/grid.svg')] dark:bg-[url('/grid-dark.svg')]"
        id='hero'
      >
        <div className='mb-7'>
          <div className='z-10 flex items-center justify-center mb-2'>
            <div
              className={cn(
                'group rounded-full border border-black/5 bg-neutral-100 text-xs text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800'
              )}
            >
              <AnimatedShinyText className='inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400'>
                <HiSparkles className='size-3 mr-1.5 fill-yellow-400' />
                <span>Powered by Google Gemini</span>
              </AnimatedShinyText>
            </div>
          </div>
          <h1 className='flex items-center gap-1 text-4xl font-medium'>
            Master your Interview Skills
          </h1>
          <h2 className='text-4xl font-medium'>with AI-Driven Practice</h2>
        </div>
        <p className='text-start text-xl text-muted-foreground/90 dark:text-muted-foreground/80 max-w-[600px]'>
          Dive into AI fully customizable interviews based on your needs with AI
          generated challenges.
        </p>
        <div className='py-12'>{/* BUTTONS/IMAGE */}</div>
        <div className='h-24'></div>
      </header>
      <section className='px-4'>
        <h2 className='text-sm text-center uppercase font-medium text-muted-foreground mb-2'>
          Our Features
        </h2>
        <p className='text-center text-2xl font-medium'>
          Wondering if there is a more efficient way to practice for your
          interviews?
        </p>
        <ul className='grid gap-3 grid-cols-1 lg:grid-cols-4 my-8'>
          <li className='relative overflow-hidden w-full h-72 bg-background-2 border border-border rounded-xl lg:col-span-2'>
            <h4 className='absolute text-9xl font-medium -bottom-10 left-8'>
              01
            </h4>
          </li>
          <li className='relative overflow-hidden w-full h-72 bg-background-2 border border-border rounded-xl lg:col-span-2'>
            <h4 className='absolute text-9xl font-medium -bottom-10 left-8'>
              02
            </h4>
          </li>
          <li className='relative overflow-hidden w-full h-72 bg-background-2 border border-border rounded-xl lg:col-span-2'>
            <h4 className='absolute text-9xl font-medium -bottom-10 left-8'>
              03
            </h4>
          </li>
        </ul>
      </section>
      <section className='z-10 flex min-h-[16rem] items-center justify-center bg-background'>
        <TextRevealByWord text='MockAI will change the way you prepare for interviews.' />
      </section>
      <CallToAction />
      <footer className='px-4 pb-4'>
        <p className='text-xs text-center text-muted-foreground'>
          MockAI &copy; {new Date().getFullYear()} All rights reserved
        </p>
      </footer>
    </>
  );
};

export default Home;
