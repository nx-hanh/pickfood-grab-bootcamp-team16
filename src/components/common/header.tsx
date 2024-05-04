'use client'
import DarkModeToggle from '@/components/ui/DarkModeToggle'
import Image from 'next/image'
import React from 'react'

const Header = () => {
  return (
    <header className='w-full flex items-center justify-between px-4 pt-2'>
        <Image src='/logo.svg' alt='logo' width={150} height={150} />
        <DarkModeToggle />
    </header>
  )
}

export default Header