import { createAppSlice } from "@/lib/redux/createAppSlice";
import { FavoriteDishWithRestaurant } from "@/types/type";
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
  distance?: number;
}
export const isDish = (obj: any): obj is Dish => {
  return (
    obj &&
    typeof obj === "object" &&
    "id" in obj &&
    typeof obj.id === "string" &&
    "category_id" in obj
  );
};
export interface LikedDish {
  dishes: Dish[];
  date: string;
}
export interface DishesState {
  dishes: Dish[];
  recommendedDishes: Dish[];
  likedDishes: LikedDish[];
  status: "idle" | "loading" | "failed" | "nomore";
  isFetchLikedDishes: "init" | "idle" | "loading" | "failed";
}

const initialState: DishesState = {
  dishes: [],
  recommendedDishes: [],
  likedDishes: [],
  status: "idle",
  isFetchLikedDishes: "init",
};

export const dishesSlice = createAppSlice({
  name: "dishes",
  initialState,
  reducers: (create) => ({
    resetDishes: create.reducer((state) => {
      state.dishes = [];
      state.recommendedDishes = [];
      state.likedDishes = [];
      state.status = "idle";
      state.isFetchLikedDishes = "init";
    }),
    addDishes: create.reducer((state, action: PayloadAction<Dish[]>) => {
      state.recommendedDishes = state.recommendedDishes.concat(action.payload);
      state.dishes = action.payload;
    }),
    dishLiked: create.reducer((state, action: PayloadAction<Dish>) => {
      const date = new Date();
      const likeDate = `${date.getFullYear()}-${
        date.getMonth() + 1
      }-${date.getDate()}`;
      const likedDish = state.likedDishes.find(
        (dish) => dish.date === likeDate
      );
      if (likedDish) {
        likedDish.dishes.push(action.payload);
      } else {
        state.likedDishes.push({
          date: likeDate,
          dishes: [action.payload],
        });
      }
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
      async ({ lat, long }: { lat: number; long: number }) => {
        const url = `/api/v2/recommend?lat=${lat}&long=${long}`;
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
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
          if (action.payload.length === 0) {
            state.status = "nomore";
            return;
          }
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
              distance: dish.distance,
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
    asyncFetchLikedDishes: create.asyncThunk(
      async (likedDish: FavoriteDishWithRestaurant[]) => {
        return likedDish;
      },
      {
        pending: (state) => {
          state.isFetchLikedDishes = "loading";
        },
        fulfilled: (state, action) => {
          action.payload.forEach((element) => {
            const date = new Date(element.createAt);
            const likeDate = `${date.getFullYear()}-${
              date.getMonth() + 1
            }-${date.getDate()}`;
            const likedDish = state.likedDishes.find(
              (dish) => dish.date === likeDate
            );
            const likedDishIds = likedDish?.dishes.map((item) => item.id) || [];
            if (likedDish) {
              if (!likedDishIds.includes(element.dish.id)) {
                likedDish.dishes.push({
                  id: element.dish.id,
                  name: element.dish.name,
                  description: element.dish.description,
                  price: element.dish.price,
                  image: element.dish.imgLink || "",
                  categories: element.dish.category,
                  category_id: element.dish.category_list_id,
                  address: element.dish.restaurant?.address || "",
                });
              }
            } else {
              state.likedDishes.push({
                date: likeDate,
                dishes: [
                  {
                    id: element.dish.id,
                    name: element.dish.name,
                    description: element.dish.description,
                    price: element.dish.price,
                    image: element.dish.imgLink || "",
                    categories: element.dish.category,
                    category_id: element.dish.category_list_id,
                    address: element.dish.restaurant?.address || "",
                  },
                ],
              });
            }
          });
          state.isFetchLikedDishes = "idle";
        },
        rejected: (state) => {
          state.isFetchLikedDishes = "failed";
        },
      }
    ),
  }),
  selectors: {
    selectDishes: (dishes) => dishes.dishes,
    selectRecommendedDishes: createSelector(
      [(dishes) => dishes.recommendedDishes],
      (recommendedDishes) => recommendedDishes.slice().reverse()
    ),
    selectLikedDishes: (dishes) => dishes.likedDishes,
    selectStatus: (dishes) => dishes.status,
    selectIsFetchLikedDishes: (dishes) => dishes.isFetchLikedDishes,
  },
});

export const {
  resetDishes,
  addDishes,
  dishLiked,
  removeDish,
  asyncUpdateDishes,
  asyncFetchLikedDishes,
} = dishesSlice.actions;

export const {
  selectDishes,
  selectRecommendedDishes,
  selectLikedDishes,
  selectStatus,
  selectIsFetchLikedDishes,
} = dishesSlice.selectors;
