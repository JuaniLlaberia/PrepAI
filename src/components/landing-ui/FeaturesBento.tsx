import {
  HiCalendarDays,
  HiOutlineSparkles,
  HiOutlineTrophy,
} from 'react-icons/hi2';
import { PiTreeStructureLight } from 'react-icons/pi';

import { BentoCard, BentoGrid } from '../ui/bento-grid';
import { Calendar } from '../ui/calendar';
import { AiBeamsComponent } from './FeatureAiBeams';
import { FeatureScoreBar } from './FeatureScoreBar';
import { FeaturePathsList } from './FeaturePathsList';

const features = [
  {
    Icon: HiOutlineTrophy,
    name: 'Feedback and Analysis',
    description:
      'Receive scores, personalized feedback and speech analysis to improve your performance.',
    href: '/dashboard/paths',
    cta: 'Learn more',
    className: 'col-span-3 lg:col-span-1',
    background: <FeatureScoreBar />,
  },
  {
    Icon: PiTreeStructureLight,
    name: 'Paths',
    description:
      'Follow tailored paths to master interview skills and land your next job.',
    href: '/dashboard/paths',
    cta: 'Get started',
    className: 'col-span-3 lg:col-span-2',
    background: (
      <FeaturePathsList className='absolute left-0 lg:right-2 top-4 h-[300px] w-[600px] lg:w-auto border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105' />
    ),
  },
  {
    Icon: HiOutlineSparkles,
    name: 'AI as the Interviewer',
    description:
      'Experience AI-generated interviews and exams personalized for you.',
    href: '/dashboard/paths',
    cta: 'Get started',
    className: 'col-span-3 lg:col-span-2',
    background: (
      <AiBeamsComponent className='absolute right-2 top-4 h-[300px] w-[600px] border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105' />
    ),
  },
  {
    Icon: HiCalendarDays,
    name: 'Streaks (Comming soon)',
    description:
      'Keep learning on track with daily streaks. Stay motivated and consistent.',
    className: 'col-span-3 lg:col-span-1',
    href: '/dashboard/paths',
    cta: 'Get started',
    background: (
      <Calendar
        disableNavigation
        mode='single'
        selected={new Date(2022, 4, 11, 0, 0, 0)}
        className='absolute right-0 top-10 origin-top rounded-md border transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] group-hover:scale-105'
      />
    ),
  },
];

export function FeaturesBento() {
  return (
    <BentoGrid className='mt-12'>
      {features.map((feature, idx) => (
        <BentoCard key={idx} {...feature} />
      ))}
    </BentoGrid>
  );
}
