import { dishes, favoritedishes } from "@prisma/client";

export type DishExtend = dishes & {
  address?: string;
  distance?: number;
};
export type LikedDishReturn = favoritedishes & {
  dish: dishes & {
    restaurant: {
      address: string;
    } | null;
  };
};
export type DISH_ACTIONS_TYPE = "like" | "dislike" | "skip" | "none";
