/* eslint-disable @next/next/no-img-element */
"use client";
import { DISH_ACTIONS } from "@/lib/constant";
import { cn } from "@/lib/utils";
import { DishWithRestaurant } from "@/types/type";
import { HeartFilledIcon, HeartIcon } from "@radix-ui/react-icons";
import { useState } from "react";

interface DishCardProps {
  dish: DishWithRestaurant;
}

const DishCard = ({ dish }: DishCardProps) => {
  const [react, setReact] = useState<string>("none");
  const priceInFormatted = new Intl.NumberFormat("vn-VN", {
    style: "currency",
    currency: "VND",
  }).format(dish.price);
  const twoLastCharacterAsNumber = parseInt(dish.id.toString().slice(-2), 16);
  const heightMap = {
    0: "h-[150px] lg:h-[300px]",
    1: "h-[160px] lg:h-[320px]",
    2: "h-[170px] lg:h-[340px]",
    3: "h-[180px] lg:h-[360px]",
    4: "h-[190px] lg:h-[380px]",
    5: "h-[200px] lg:h-[400px]",
  };
  const height = heightMap[twoLastCharacterAsNumber % 6] || "h-[300px]";
  return (
    <article
      className={cn(
        "relative w-full bg-white shadow-lg rounded-xl flex flex-col",
        height
      )}
      aria-label="Interactive food card"
    >
      <img
        src={dish.imgLink || "/src/assets/images/bg-welcome-mobile.jpg"}
        alt="Delicious Food"
        loading="lazy"
        className="w-full h-[85%] rounded-t-xl"
      />
      <div className="flex items-end rounded-xl absolute top-0 w-full h-full bg-gradient-to-t from-white from-[25%] via-transparent via-[50%] to-transparent">
        <div className="w-full px-1 md:px-4 py-2 text-sm text-black flex flex-col justify-between">
          <div className="md:space-y-2">
            <p className="text-base md:text-2xl font-black line-clamp-2">
              {dish.name}
            </p>
            <p className="line-clamp-1 md:line-clamp-2">{dish.description}</p>
            <p className="hidden md:flex line-clamp-2">
              <span className="font-semibold">Address: </span>
              <span className="font-light italic">
                {dish.restaurant?.address}
              </span>
            </p>
            <div className="flex items-center justify-between ">
              <span className="text-sm md:text-lg shadow-md font-extrabold bg-green-200 rounded-full px-3 py-1">
                {priceInFormatted}
              </span>
              <button
                onClick={() =>
                  setReact(
                    react === DISH_ACTIONS.LIKE
                      ? DISH_ACTIONS.NONE
                      : DISH_ACTIONS.LIKE
                  )
                }
                aria-label="Like this dish"
                aria-pressed={react === DISH_ACTIONS.LIKE}
                type="button"
                className="mr-2"
              >
                {react === DISH_ACTIONS.LIKE ? (
                  <HeartFilledIcon className="size-8 text-green-500" />
                ) : (
                  <HeartIcon className="size-8 text-green-500" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default DishCard;
