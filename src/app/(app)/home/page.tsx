"use client";
import React, { useEffect, useState } from "react";
import CardActionButtons from "@/components/home/CardActionButtons";
import CardDeck from "@/components/home/CardDeck";
import CardDeckSkeleton from "@/components/home/CardDeckSkeleton";
import { useAppDispatch, } from "@/lib/hooks/redux";
import { Dish, dishLiked, removeDish, selectRecommendedDishes, selectStatus } from "@/lib/redux/features/dishes/dishesSlice";
const ACTIONS_TYPE = {
  LIKE: "like",
  DISLIKE: "dislike",
  SKIP: "skip",
  NONE: "none",
};

const Home = () => {
  const dispatch = useAppDispatch();
  const [action, setAction] = useState<string>(ACTIONS_TYPE.NONE); //manage action for click button
  const [isSwiping, setIsSwiping] = useState<string>(ACTIONS_TYPE.NONE); //manage action for swipe card
  const handleAction = (action: string, dish: Dish) => {
    //TODO: send action to server
    switch (action) {
      case ACTIONS_TYPE.LIKE:
        dispatch(dishLiked(dish));
        break;
      case ACTIONS_TYPE.SKIP:
        dispatch(removeDish(dish));
        break;
      case ACTIONS_TYPE.DISLIKE:
        dispatch(removeDish(dish));
        break;
      default:
        break;
    }
  };
 
  return (
    <div className="relative h-full w-full max-w-screen-sm flex flex-col items-center justify-start">
      {/* {cards.length > 0 ? (<CardDeck
        action={action}
        setAction={setAction}
        setIsSwiping={setIsSwiping}
        handleAction={handleAction}
      />) : (
        <CardDeckSkeleton />)} */}
      <CardDeck
        action={action}
        setAction={setAction}
        setIsSwiping={setIsSwiping}
        handleAction={handleAction}
      />
      <CardActionButtons
        isSwiping={isSwiping}
        setAction={setAction}
      />
    </div>
  );
};

export default Home;
