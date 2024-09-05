import {
  HiOutlineQuestionMarkCircle,
  HiOutlineSparkles,
  HiOutlineTrophy,
} from 'react-icons/hi2';
import { PiTreeStructureLight } from 'react-icons/pi';

import { BentoCard, BentoGrid } from '../ui/bento-grid';
import { AiBeamsComponent } from './FeatureAiBeams';
import { FeatureScoreBar } from './FeatureScoreBar';
import { FeaturePathsList } from './FeaturePathsList';
import { QuestionsMarque } from './QuestionsMarque';

const features = [
  {
    Icon: HiOutlineTrophy,
    name: 'Feedback and Analysis',
    description:
      'Receive scores, personalized feedback and speech analysis to improve your performance.',
    className: 'col-span-3 lg:col-span-1',
    background: <FeatureScoreBar />,
    small: true,
  },
  {
    Icon: PiTreeStructureLight,
    name: 'Paths',
    description:
      'Follow tailored paths to master interview skills and land your next job.',
    className: 'col-span-3 lg:col-span-2',
    background: (
      <FeaturePathsList className='absolute left-0 lg:right-2 -bottom-28 h-[300px] w-[600px] lg:w-auto border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105' />
    ),
  },
  {
    Icon: HiOutlineSparkles,
    name: 'AI as the Interviewer',
    description:
      'Experience AI-generated interviews and exams personalized for you.',
    className: 'col-span-3 lg:col-span-2',
    background: (
      <AiBeamsComponent className='absolute -right-16 -bottom-28 lg:-right-0 h-[300px] w-[600px] border-none transition-all duration-300 ease-out' />
    ),
  },
  {
    Icon: HiOutlineQuestionMarkCircle,
    name: 'AI Questions bank',
    description:
      'Keep learning on track with daily streaks. Stay motivated and consistent.',
    className: 'col-span-3 lg:col-span-1',
    background: <QuestionsMarque />,
    small: true,
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
