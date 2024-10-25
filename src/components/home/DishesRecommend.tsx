"use client";
import React, { useState } from "react";
import CardActionButtons from "@/components/home/CardActionButtons";
import CardDeck from "@/components/home/CardDeck";
import { useAppDispatch } from "@/hooks/redux";
import {
  Dish,
  dishLiked,
  isDish,
  removeDish,
} from "@/lib/redux/features/dishes/dishesSlice";
import { DISH_ACTIONS, DISH_ACTIONS_TYPE } from "@/lib/constant";
import { reactDish } from "@/actions/dish.action";

const DishesRecommended = ({ email }: { email: string }) => {
  const dispatch = useAppDispatch();
  const [action, setAction] = useState<string>(DISH_ACTIONS.NONE); //manage action for click button
  const [isSwiping, setIsSwiping] = useState<string>(DISH_ACTIONS.NONE); //manage action for swipe card
  const fetchReactDish = async (dish: Dish, action: string) => {
    await fetch("/api/v2/recommend/react", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ dishId: dish.id, react: action }),
    });
  };
  const handleAction = (action: string, dish: Dish) => {
    switch (action) {
      case DISH_ACTIONS.LIKE:
        if (isDish(dish)) {
          dispatch(dishLiked(dish));
          fetchReactDish(dish, action);
        }
        break;
      case DISH_ACTIONS.SKIP:
        if (isDish(dish)) {
          dispatch(removeDish(dish));
        }
        break;
      case DISH_ACTIONS.DISLIKE:
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
    <>
      <CardDeck
        action={action}
        setAction={setAction}
        setIsSwiping={setIsSwiping}
        handleAction={handleAction}
      />
      <CardActionButtons isSwiping={isSwiping} setAction={setAction} />
    </>
  );
};

export default DishesRecommended;
