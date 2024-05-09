'use client'
import React, { useState } from 'react'
import CardDeck from '@/components/home/CardDeck'
import ListSimilar from '@/components/home/ListSimilar'
import CardActionButtons from '@/components/home/CardActionButtons'
const ACTIONS_TYPE = {
  LIKE: 'like',
  DISLIKE: 'dislike',
  NONE: 'none'
}
const Home = () => {
  const cards = [
    {
      image: 'https://picsum.photos/300/200',
      name: 'Card 1',
      address: 'Address 1',
      price: "100",
    },
    {
      image: 'https://picsum.photos/300/200',
      name: 'Card 2',
      address: 'Address 2',
      price: "200",
    },
    {
      image: 'https://picsum.photos/300/200',
      name: 'Card 3',
      address: 'Address 3',
      price: "300",
    },
    {
      image: 'https://picsum.photos/300/200',
      name: 'Card 4',
      address: 'Address 4',
      price: "400",
    },
    {
      image: 'https://picsum.photos/300/200',
      name: 'Card 5',
      address: 'Address 5',
      price: "500",
    },
    {
      image: 'https://picsum.photos/300/200',
      name: 'Card 6',
      address: 'Address 6',
      price: "600",
    },
    {
      image: 'https://picsum.photos/300/200',
      name: 'Card 7',
      address: 'Address 7',
      price: "700",
    },
    {
      image: 'https://picsum.photos/300/200',
      name: 'Card 8',
      address: 'Address 8',
      price: "800",
    },
    {
      image: 'https://picsum.photos/300/200',
      name: 'Card 9',
      address: 'Address 9',
      price: "900",
    },
    {
      image: 'https://picsum.photos/300/200',
      name: 'HẺM ĐẬU - BÚN ĐẬU MẮM TÔM',
      address: '140e Lý Chính Thắng, Phường 7, Quận 3, Thành phố Hồ Chí Minh',
      price: '40.000 - 86.000',
    }
  ]
  const [action, setAction] = useState(ACTIONS_TYPE.NONE);
  return (
    <div
      className="container h-full w-full flex flex-col items-center justify-center"
    >
      <CardDeck cards={cards} action={action}  setAction={setAction} />
      <ListSimilar/>
      <CardActionButtons setAction={setAction} />
    </div>
  )
}

export default Home