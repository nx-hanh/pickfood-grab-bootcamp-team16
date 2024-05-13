'use client'
import DarkModeToggle from '@/components/DarkModeToggle'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

const Header = () => {
  const router = useRouter()
  return (
    <header className='w-full flex items-center justify-between px-4 pt-2'>
        <Image src='/logo.svg'
          className='pl-1 cursor-pointer'
          onClick={() => router.push('/')}
        alt='logo' width={150} height={150} />
        <DarkModeToggle />
    </header>
  )
}

export default Header