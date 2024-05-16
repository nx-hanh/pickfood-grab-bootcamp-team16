"use client";
import React, { useEffect, useState } from "react";
import CardActionButtons from "@/components/home/CardActionButtons";
import CardDeck from "@/components/home/CardDeck";
import CardDeckSkeleton from "@/components/home/CardDeckSkeleton";
const ACTIONS_TYPE = {
  LIKE: "like",
  DISLIKE: "dislike",
  SKIP: "skip",
  NONE: "none",
};
interface Card {
  id: string;
  image: string;
  name: string;
  address: string;
  price: string;
  description: string;
  categories: string[];
}

const Home = () => {
  const [cards, setCards] = useState<Card[]>([]);
  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/getdishes", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // "Authorization": "Bearer " + localStorage.getItem("token"),
          Authorization:
            "eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..KTokkVdOFHJcHSxKhQNSMQ.DfrW16Xa_qvjxPdLBWOVMT-ZW_l40CUe-RMozAZTDyo.1c_l2vxId23RD_UWF8R5HA",
        },
      })
      const data = await response.json();
      const cardData: Card[] = data.dishes.map((card: any) => {
        return {
          id: card.id,
          image: card.imgLink,
          name: card.name,
          address: card.address,
          price: card.price.toString(),
          description: card.description,
          categories: card.categories,
        };
      });
      setCards(cardData.reverse());
    }
    fetchData();
  }, []);
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
    <div className="relative h-full w-full max-w-screen-sm flex flex-col items-center justify-start">
      {cards.length > 0 ? (<CardDeck
        cards={cards}
        action={action}
        setAction={setAction}
        setIsSwiping={setIsSwiping}
        handleAction={handleAction}
      />) : (
        <CardDeckSkeleton />)}
      <CardActionButtons
        isSwiping={isSwiping}
        setAction={setAction}
      />
    </div>
  );
};

export default Home;
