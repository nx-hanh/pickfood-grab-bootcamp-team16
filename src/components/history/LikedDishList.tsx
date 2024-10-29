"use client";

import HistorySkeleton from "@/components/history/HistorySkeleton";
import LikedDishGroup from "@/components/history/LikedDishGroup";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  LikedDish,
  asyncFetchLikedDishes,
  selectIsFetchLikedDishes,
  selectLikedDishes,
} from "@/lib/redux/features/dishes/dishesSlice";
import { FavoriteDishWithRestaurant } from "@/types/type";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { FC, useEffect } from "react";

interface LikedDishListProps {
  serverLikedDish: FavoriteDishWithRestaurant[];
}

const LikedDishList: FC<LikedDishListProps> = ({ serverLikedDish }) => {
  const router = useRouter();
  const likedDishes = useAppSelector(selectLikedDishes);
  const items = [...likedDishes];
  const dispatch = useAppDispatch();
  const isFetchLikedDishes = useAppSelector(selectIsFetchLikedDishes);
  const likedDishesSorted = items.sort((a: LikedDish, b: LikedDish) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
  useEffect(() => {
    dispatch(asyncFetchLikedDishes(serverLikedDish));
    //eslint-disable-next-line
  }, []);
  if (isFetchLikedDishes === "failed")
    return <p>Failed to fetch liked dishes</p>;
  return (
    <div className="h-full max-h-full w-full overflow-y-scroll overflow-x-hidden no-scrollbar">
      {isFetchLikedDishes === "idle" &&
        likedDishesSorted.length !== 0 &&
        likedDishesSorted.map((likedDish, index) => {
          return (
            <LikedDishGroup
              key={index}
              date={likedDish.date}
              dishes={likedDish.dishes}
            />
          );
        })}
      {isFetchLikedDishes === "loading" && <HistorySkeleton />}
      {isFetchLikedDishes === "idle" && likedDishesSorted.length === 0 && (
        <div className="h-full flex flex-col items-center justify-center">
          <p className="text-lg font-semibold mb-4">
            {"You haven't liked any dishes yet!"}
          </p>
          <Button
            className="border border-black w-[120px] flex justify-between items-center"
            onClick={() => router.push("/home")}
          >
            <p className="text-sm">{"Explore tasty foods"}</p>
            <ArrowRight size={16} />
          </Button>
        </div>
      )}
    </div>
  );
};

export default LikedDishList;
