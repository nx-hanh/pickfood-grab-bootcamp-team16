import CategoryTagItem from '@/components/home/CategoryTagItem'
import React, { FC } from 'react'

interface CategoryTagsProps {
  categories: string[]
}

const CategoryTags: FC<CategoryTagsProps> = ({categories}) => {
  return <div 
    className="flex flex-wrap justify-start items-center w-full"
  >
    {categories.map((category, index) => (
      <CategoryTagItem key={index} category={category}/>
    ))}
  </div>
}

export default CategoryTags