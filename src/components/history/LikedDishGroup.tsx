'use client'
import { Button } from '@/components/ui/button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Dish } from '@/lib/redux/features/dishes/dishesSlice'
import React, { FC } from 'react'
import LikedDishCard from '@/components/history/LikedDishCard';


interface LikedDishGroupProps {
    date: string
    dishes: Dish[]
}

const LikedDishGroup: FC<LikedDishGroupProps> = ({ date, dishes }) => {
    const [open, setOpen] = React.useState<boolean>(true)
    return <Collapsible open={open} onOpenChange={setOpen}
        className='w-full mt-2'
    >
        <div className="flex items-center justify-between space-x-4 px-4">
            <h4 className="text-sm font-semibold text-nowrap">
                {date}
            </h4>
            <div className="w-full border-b border-black" />
            <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm" className="w-9 p-0">
                    {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </Button>
            </CollapsibleTrigger>
        </div>
        <CollapsibleContent className="space-y-2 px-4">
            {
                dishes.map(dish => <LikedDishCard key={dish.id} dish={dish} />)
            }
        </CollapsibleContent>
    </Collapsible>
}

export default LikedDishGroup