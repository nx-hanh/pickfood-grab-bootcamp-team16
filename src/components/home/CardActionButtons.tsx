import { Button } from '@/components/ui/button'
import React, { FC } from 'react'

interface CardActionButtonsProps {
  
}

const CardActionButtons: FC<CardActionButtonsProps> = ({}) => {
  return <div className='w-[250px] h-[100px] flex justify-between items-center'>
    <button className='w-[100px] h-[100%] bg-white rounded-full text-black'>Dislike</button>
    <button className='w-[100px] h-[100%] bg-white rounded-full text-black'>Like</button>
  </div>
}

export default CardActionButtons