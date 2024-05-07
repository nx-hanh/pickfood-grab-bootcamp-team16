import { Button } from '@/components/ui/button'
import React, { FC } from 'react'

interface CardActionButtonsProps {
  
}

const CardActionButtons: FC<CardActionButtonsProps> = ({}) => {
  return <div className='w-[300px] h-[100px] flex justify-between items-center'>
    <Button className='w-[100px] h-[100%]'>Dislike</Button>
    <Button className='w-[100px] h-[100%]'>Like</Button>
  </div>
}

export default CardActionButtons