'use client'
import React from 'react'
import CardDeck from '@/components/home/CardDeck'
import ListSimilar from '@/components/home/ListSimilar'
const Home = () => {
  return (
    <div
      className="container h-full w-full flex flex-col items-center justify-center"
    >
      <CardDeck/>
      <ListSimilar/>
    </div>
  )
}

export default Home