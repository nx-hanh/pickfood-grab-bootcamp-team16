import { createAppSlice } from "@/lib/redux/createAppSlice";
import { PayloadAction, createSelector } from "@reduxjs/toolkit";

export interface Dish {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  categories: string[];
  category_id: number[];
  address: string;
}
export const isDish = (obj: any): obj is Dish => {
  return (
    obj && typeof obj === "object" && 
    "id" in obj && typeof obj.id === "string" &&
    "category_id" in obj && typeof obj.category_id === "string"
  );
}
export interface LikedDish {
  dish: Dish;
  likedAt: string;
}
export interface DishesState {
  dishes: Dish[];
  recommendedDishes: Dish[];
  likedDishes: LikedDish[];
  status: "idle" | "loading" | "failed";
}

const initialState: DishesState = {
  dishes: [],
  recommendedDishes: [],
  likedDishes: [],
  status: "idle",
};

export const dishesSlice = createAppSlice({
  name: "dishes",
  initialState,
  reducers: (create) => ({
    addDishes: create.reducer((state, action: PayloadAction<Dish[]>) => {
      state.recommendedDishes = state.recommendedDishes.concat(action.payload);
      state.dishes = action.payload;
    }),
    dishLiked: create.reducer((state, action: PayloadAction<Dish>) => {
      const date = new Date();
      const likeDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
      state.likedDishes.push({ dish: action.payload, likedAt: likeDate });
      state.recommendedDishes = state.recommendedDishes.filter(
        (dish) => dish.id !== action.payload.id
      );
    }),
    removeDish: create.reducer((state, action: PayloadAction<Dish>) => {
      state.recommendedDishes = state.recommendedDishes.filter(
        (dish) => dish.id !== action.payload.id
      );
    }),
    asyncUpdateDishes: create.asyncThunk(
      async (token: string) => {
        const response = await fetch("/api/getdishes", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        });
        return response.json().then((data) => data.dishes);
      },
      {
        pending: (state) => {
          state.status = "loading";
        },
        fulfilled: (state, action) => {
          state.status = "idle";
          const newDishes = action.payload.map((dish: any) => {
            return {
              id: dish.id,
              name: dish.name,
              description: dish.description,
              price: dish.price,
              image: dish.imgLink,
              categories: dish.category,
              category_id: dish.category_id,
              address: dish.address,
            };
          });
          state.dishes = newDishes;
          state.recommendedDishes = state.recommendedDishes.concat(newDishes);
        },
        rejected: (state) => {
          state.status = "failed";
        },
      }
    ),
  }),
  selectors: {
    selectDishes: (dishes) => dishes.dishes,
    selectRecommendedDishes: createSelector([dishes => dishes.recommendedDishes], (recommendedDishes) => recommendedDishes.slice().reverse()),
    selectLikedDishes: (dishes) => dishes.likedDishes,
    selectStatus: (dishes) => dishes.status,
  },
});

export const {
  addDishes,
  dishLiked,
  removeDish,
  asyncUpdateDishes,
} = dishesSlice.actions;

export const {
  selectDishes,
  selectRecommendedDishes,
  selectLikedDishes,
  selectStatus,
} = dishesSlice.selectors;
