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
  const handleAddressClick = () => {
    const mapUrl = `https://www.google.com/maps/search/${dish.address}/?hl=vi-VN&entry=ttu`
    window.open(mapUrl, '_blank');
  }
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
              <div className='px-2 w-full bg-[#f0eef0] rounded-[10px] cursor-pointer select-none
                              active:translate-y-2  active:[box-shadow:0_0px_0_0_#bababa,0_0px_0_0_#afb9c9]
                              active:border-b-[0px]
                              transition-all duration-150 [box-shadow:0_5px_0_0_#bababa,0_10px_0_0_#afb9c9]
                              border-b-[1px] border-gray-400 mb-4'
                onClick={handleAddressClick}>
                <span className='w-full flex flex-col justify-center items-center h-full text-center text-black font-semibold text-lg '>{dish.address}</span>
              </div>
              <span className="text-md text-black ml-2">Giá: {priceInFormatted}</span>
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