import React, { FC } from 'react'

interface CategoryTagItemProps {
  category: string
}

const CategoryTagItem: FC<CategoryTagItemProps> = ({category}) => {
  return <div 
    className="mr-2 mb-2 p-2 bg-gray-700 rounded-full text-sm text-white"
  >
    {category}
  </div>
}

export default CategoryTagItem