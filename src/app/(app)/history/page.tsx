'use client'
import HistorySkeleton from '@/components/history/HistorySkeleton'
import LikedDishGroup from '@/components/history/LikedDishGroup'
import { Button } from '@/components/ui/button'
import { useAppSelector } from '@/lib/hooks/redux'
import { LikedDish, selectIsFetchLikedDishes, selectLikedDishes } from '@/lib/redux/features/dishes/dishesSlice'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { FC } from 'react'


interface pageProps {

}

const Page: FC<pageProps> = ({ }) => {
  const router = useRouter();
  const likedDishes = useAppSelector(selectLikedDishes);
  const isFetchLikedDishes = useAppSelector(selectIsFetchLikedDishes);
  const likedDishesSorted = likedDishes.sort((a: LikedDish, b: LikedDish) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })
  if (isFetchLikedDishes === 'failed') throw Error();
  return <div
    className='h-full w-screen flex flex-col justify-start items-center max-w-screen-sm mx-auto bg-[#F4F5F9]'
  >
    <h2 className='text-2xl font-bold mt-2 mb-4'>Nhật Ký Món Ngon</h2>
    <div className='h-full max-h-full w-full max-w-screen overflow-y-scroll overflow-x-hidden no-scrollbar mb-20'>
      {
        isFetchLikedDishes === 'idle' && likedDishesSorted.length !== 0 && likedDishesSorted.map((likedDish, index) => {
          return <LikedDishGroup key={index} date={likedDish.date} dishes={likedDish.dishes} />
        })
      }
      {
        isFetchLikedDishes === 'loading' && <HistorySkeleton />
      }
      {
        isFetchLikedDishes === 'idle' && likedDishesSorted.length === 0 && <div className='h-full flex flex-col items-center justify-center'>
          <p className='text-lg font-semibold mb-4'>Bạn chưa thích món nào?</p>
          <Button className='border border-black w-[120px] flex justify-between items-center'
            onClick={() => router.push('/home')}
          >
            <p className='text-sm'>Khám phá</p>
            <ArrowRight size={16} />
          </Button>
        </div>
      }
    </div>
  </div>
}

export default Page