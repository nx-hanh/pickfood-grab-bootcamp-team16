'use client'
import DarkModeToggle from '@/components/DarkModeToggle'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, {useState} from 'react'
import { Button } from '@/components/ui/button';

const UserHeader = () => {
  const [buttonClicked, setButtonClicked] = useState(false);

    const handleClick = () => {
        setButtonClicked(true);
      };
  const router = useRouter()
  return (
    <header className='w-full flex items-center justify-between px-4 py-2'>
        <Image src='/logo.svg'
          className='pl-1 cursor-pointer'
          onClick={() => router.push('/')}
        alt='logo' width={150} height={150} />
        <Button size='lg' className='absolute bottom-3 left-3 right-3 text-white bg-green-600 justify-center disabled' onClick={handleClick} type='submit' disabled={buttonClicked}>
          Đăng xuất
        </Button>
    </header>
  )
}

export default UserHeader