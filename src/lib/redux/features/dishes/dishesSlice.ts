import { createSlice } from "@reduxjs/toolkit";

export interface Dish {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  categories: string[];
  address: string;
}
export interface LikedDish {
  dish: Dish;
  likedAt: Date;
}
export interface DishesState {
  dishes: Dish[];
  likedDishes: LikedDish[];
  status: "idle" | "loading" | "failed";
}

const initialState: DishesState = {
  dishes: [],
  likedDishes: [],
  status: "idle",
};

export const dishesSlice = createSlice({
  name: "dishes",
  initialState,
  reducers: {
    dishesLoading(state) {
      state.status = "loading";
    },
    dishesReceived(state, action) {
      state.dishes = action.payload;
      state.status = "idle";
    },
    dishLiked(state, action) {
      state.likedDishes.push(action.payload);
    },
    dishUnLiked(state, action) {
      state.likedDishes = state.likedDishes.filter(
        (likedDish) => likedDish.dish.id !== action.payload
      );
    },
    addDishes(state, action) {
        state.dishes.push(...action.payload);
        },
    removeDish(state, action) {
        state.dishes = state.dishes.filter((dish) => dish.id !== action.payload);
    },
  },
  selectors: {
    selectDishes: (dishes) => dishes.dishes,
    selectLikedDishes: (dishes) => dishes.likedDishes,
    selectStatus: (dishes) => dishes.status,
  },
});

export const {dishesLoading, dishesReceived, dishLiked, dishUnLiked, addDishes, removeDish} = dishesSlice.actions;

export const {selectDishes, selectLikedDishes, selectStatus} = dishesSlice.selectors;
