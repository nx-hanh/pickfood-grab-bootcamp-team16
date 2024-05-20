import { Dish } from '@/lib/redux/features/dishes/dishesSlice'
import React, { FC } from 'react'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { Drawer, DrawerContent, DrawerTrigger, DrawerClose, DrawerDescription, DrawerTitle, DrawerFooter, DrawerHeader } from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'

interface LikedDishCardProps {
  dish: Dish
}

const LikedDishCard: FC<LikedDishCardProps> = ({ dish }) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const priceInFormatted = new Intl.NumberFormat('vn-VN', { style: 'currency', currency: 'VND' }).format(dish.price)
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <div className="rounded-sm shadow-md border px-4 py-3 font-mono text-sm bg-white flex flex-row items-center">
          <Image src={dish.image} alt={dish.name} width={64} height={64} className='m-1' />
          <div className="flex-1 flex flex-col items-start justify-center">
            <span className="font-semibold">{dish.name}</span>
            <span className="text-xs text-gray-500">{dish.address}</span>
            <span className="text-xs text-gray-500">{priceInFormatted}</span>
          </div>
          <ArrowRight size={40} color='#808080' />
        </div>
      </DrawerTrigger>
      <DrawerContent
        className='bg-white w-full flex items-center justify-center '
      >
        <div className="w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>{dish.name}</DrawerTitle>
            <DrawerDescription>{dish.description}</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0 w-full flex flex-row justify-center items-center">
            <Image src={dish.image} alt={dish.name} width={100} height={100} className='m-1' />
            <div className="flex-1 h-[100px] flex flex-col items-start justify-start ml-2">
              <span className="text-xs text-gray-500">Địa chỉ: {dish.address}</span>
              <span className="text-xs text-gray-500">Giá: {priceInFormatted}</span>
            </div>
          </div>
          <DrawerFooter className='w-full flex items-center justify-center'>
            <DrawerClose asChild>
              <Button variant="ghost"> Đóng </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default LikedDishCard