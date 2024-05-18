"use client";
import React, { useState } from "react";
import CardActionButtons from "@/components/home/CardActionButtons";
import CardDeck from "@/components/home/CardDeck";
import { useAppDispatch, } from "@/lib/hooks/redux";
import { Dish, dishLiked, isDish, removeDish } from "@/lib/redux/features/dishes/dishesSlice";
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
  const fetchReactDish = async (dish: Dish, action: string) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token") || "";
      const response = await fetch("/api/reactdishes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token,
        },
        body: JSON.stringify({
          categories: dish.category_id,
          like: action === ACTIONS_TYPE.LIKE,
        }),
      });
      if (!response.ok) {
        console.error("Error:", response.statusText);
      }
    }
  }
  const handleAction = (action: string, dish: Dish) => {
    switch (action) {
      case ACTIONS_TYPE.LIKE:
        if (isDish(dish)) {
          dispatch(dishLiked(dish));
          fetchReactDish(dish, action);
        }
        break;
      case ACTIONS_TYPE.SKIP:
        if (isDish(dish)) {
          dispatch(removeDish(dish));
        }
        break;
      case ACTIONS_TYPE.DISLIKE:
        if (isDish(dish)) {
          dispatch(removeDish(dish));
          fetchReactDish(dish, action);
        }
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
