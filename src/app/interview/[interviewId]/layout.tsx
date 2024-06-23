import { ReactNode } from 'react';
const InterviewLayout = ({ children }: { children: ReactNode }) => {
  return <div className='py-2 px-4 md:px-16 lg:px-32 xl:px-56'>{children}</div>;
};

export default InterviewLayout;
