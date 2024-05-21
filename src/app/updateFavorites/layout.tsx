import { FC, ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return  <div className='rounded-md p-2 place-content-center'>{children}</div>;
};

export default AuthLayout;

