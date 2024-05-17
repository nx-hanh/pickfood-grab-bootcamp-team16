import { FC, ReactNode } from 'react';
import { Button } from './ui/button';

interface GoogleSignInButtonProps {
  children: ReactNode;
}
const GoogleSignInButton: FC<GoogleSignInButtonProps> = ({ children }) => {
  const loginWithGoogle = () => console.log('login with google');

  return (
    <Button onClick={loginWithGoogle} variant='outline' className='w-11/12 mx-4  text-white grid mt-6 bg-green-600 border-2 border-green-600' type='submit'>
      {children}
    </Button>
  );
};

export default GoogleSignInButton;
