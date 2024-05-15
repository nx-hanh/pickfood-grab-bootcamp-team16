"use client";
import React, { useState } from "react";
import CardDeck from "@/components/home/CardDeck";
import CardActionButtons from "@/components/home/CardActionButtons";
const ACTIONS_TYPE = {
  LIKE: "like",
  DISLIKE: "dislike",
  SKIP: "skip",
  NONE: "none",
};
const Home = () => {
  const cards = [
    {
      image: "https://picsum.photos/300/200",
      name: "Card 1",
      address: "Address 1",
      price: "100",
      categories: ["category 1", "category 2"],
    },
    {
      image: "https://picsum.photos/300/200",
      name: "Card 2",
      address: "Address 2",
      price: "200",
      categories: ["category 1", "category 2"],
    },
    {
      image: "https://picsum.photos/300/200",
      name: "Card 3",
      address: "Address 3",
      price: "300",
      categories: ["category 1", "category 2"],
    },
    {
      image: "https://picsum.photos/300/200",
      name: "Card 4",
      address: "Address 4",
      price: "400",
      categories: ["category 1", "category 2"],
    },
    {
      image: "https://picsum.photos/300/200",
      name: "Card 5",
      address: "Address 5",
      price: "500",
      categories: ["category 1", "category 2"],
    },
    {
      image: "https://picsum.photos/300/200",
      name: "Card 6",
      address: "Address 6",
      price: "600",
      categories: ["category 1", "category 2"],
    },
    {
      image: "https://picsum.photos/300/200",
      name: "Card 7",
      address: "Address 7",
      price: "700",
      categories: ["category 1", "category 2"],
    },
    {
      image: "https://picsum.photos/300/200",
      name: "Card 8",
      address: "Address 8",
      price: "800",
      categories: ["category 1", "category 2"],
    },
    {
      image: "https://picsum.photos/300/200",
      name: "Card 9",
      address: "Address 9",
      price: "900",
      categories: ["category 1", "category 2"],
    },
    {
      image: "https://picsum.photos/300/200",
      name: "HẺM ĐẬU - BÚN ĐẬU MẮM TÔM",
      address: "140e Lý Chính Thắng, Phường 7, Quận 3, Thành phố Hồ Chí Minh",
      price: "40.000 - 86.000",
      categories: ["Bún/Phở", "Bún đậu mắm tôm"],
    },
  ];
  const [action, setAction] = useState<string>(ACTIONS_TYPE.NONE); //manage action for click button
  const [isSwiping, setIsSwiping] = useState<string>(ACTIONS_TYPE.NONE); //manage action for swipe card
  const handleAction = (action: string) => {
    switch (action) {
      case ACTIONS_TYPE.LIKE:
        console.log("like");
        break;
      case ACTIONS_TYPE.SKIP:
        console.log("skip");
        break;
      case ACTIONS_TYPE.DISLIKE:
        console.log("dislike");
        break;
      default:
        break;
    }
  };

  return (
    <div className="h-full w-full flex flex-col items-center justify-start">
      <CardDeck
        cards={cards}
        action={action}
        setAction={setAction}
        setIsSwiping={setIsSwiping}
        handleAction={handleAction}
      />
      <CardActionButtons isSwiping={isSwiping} setAction={setAction} />
    </div>
  );
};

export default Home;
