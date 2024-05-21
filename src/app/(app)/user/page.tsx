// import React, { FC } from 'react'

// interface pageProps {
  
// }

// const page: FC<pageProps> = ({}) => {
//   return <div>
//     User page
//   </div>
// }

import UserPage from '@/components/home/UserPage';

const page = () => {
  return (
    <div className='w-full'>
      <UserPage />
    </div>
  );
};

export default page;

