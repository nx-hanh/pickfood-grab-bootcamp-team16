import { dishes, favoritedishes } from "@prisma/client";

export type DishExtend = dishes & {
  address?: string;
  distance?: number;
};
export type DishWithRestaurant = dishes & {
  restaurant: {
    address: string;
  } | null;
};
export type FavoriteDishWithRestaurant = favoritedishes & {
  dish: DishWithRestaurant;
};
export type DISH_ACTIONS_TYPE = "like" | "dislike" | "skip" | "none";
