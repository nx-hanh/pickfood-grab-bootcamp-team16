  import { FC, ReactNode } from 'react';

  interface AuthLayoutProps {
    children: ReactNode;
  }

  const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
    return  <div className='rounded-md p-10 bg-white place-content-center'>{children}</div>;
  };

  export default AuthLayout;
