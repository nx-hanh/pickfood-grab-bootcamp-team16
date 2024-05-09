import { FC, ReactNode } from 'react';

interface OnboardingLayoutProps {
  children: ReactNode;
}

const OnboardingLayout: FC<OnboardingLayoutProps> = ({ children }) => {
  return <div> 
    {/* className='bg-slate-200 p-10 rounded-md'> */}
    {children}</div>;
};

export default OnboardingLayout;
