import { getUserAndAccount, putRatingVector } from "@/actions/user.action";
import getDishes, {
  getRestaurantIDList,
} from "@/lib/backend/getFoodData/getDishes";
import { ACTION_STATUS, DISH_ACTIONS } from "@/lib/constant";
import prisma from "@/lib/prisma";
import { getGridID, shuffleArray } from "@/lib/utils";
import {
  DISH_ACTIONS_TYPE,
  DishExtend,
  DishWithRestaurant,
  FavoriteDishWithRestaurant,
} from "@/types/type";
interface GetRecommendDishesParams {
  location?: LocationInLatLong;
  userEmail: string;
}

export const getRecommendDishes = async ({
  location,
  userEmail,
}: GetRecommendDishesParams) => {
  const user = await prisma.user.findFirst({
    where: { email: userEmail, onboardingCompleted: true },
  });
  if (!user) {
    throw new Error("User not found or onboarding not completed");
  }
  const account = await prisma.account.findFirst({
    where: { userId: user.id },
  });
  if (!account) {
    throw new Error("User account not found");
  }
  const data = await getDishes(
    account.recommendDishes as RecommendationElement[],
    account.recommendedMark as RecommendedMark,
    location?.lat,
    location?.long
  );
  await prisma.account.update({
    where: { id: account.id },
    data: {
      recommendedMark: data[1],
    },
  });
  return { dishes: data[0] };
};

export const reactDish = async ({
  email,
  dishId,
  reaction,
}: {
  email: string;
  dishId: string;
  reaction: DISH_ACTIONS_TYPE;
}) => {
  const data: ActionReturn<boolean> = {
    status: ACTION_STATUS.success,
    message: "Favorites updated successfully",
    data: true,
  };
  const isLike = reaction === DISH_ACTIONS.LIKE;
  const isDislike = reaction === DISH_ACTIONS.DISLIKE;
  if (!isLike && !isDislike) {
    data.status = ACTION_STATUS.fail;
    data.message = "Invalid reaction";
    data.data = false;
    return JSON.parse(JSON.stringify(data));
  }
  const UserData = await getUserAndAccount(email);
  if (!UserData) {
    data.status = ACTION_STATUS.fail;
    data.message = "Failed to update favorites";
    data.data = false;
    return JSON.parse(JSON.stringify(data));
  }
  const dish = await prisma.dishes.findFirst({
    where: { id: dishId },
  });
  if (!dish) {
    data.status = ACTION_STATUS.fail;
    data.message = "Dish not found";
    data.data = false;
    return JSON.parse(JSON.stringify(data));
  }
  if (isLike) {
    const updateFavoritesDish = await prisma.favoritedishes.create({
      data: {
        userEmail: email,
        dishID: dishId,
        v: 0,
        createAt: new Date(),
      },
    });
    if (!updateFavoritesDish) {
      data.status = ACTION_STATUS.fail;
      data.message = "Failed to update favorites";
      data.data = false;
      return JSON.parse(JSON.stringify(data));
    }
  }
  const likePoint = 0.4;
  const dislikePoint = -0.2;
  const updatePoint = isLike ? likePoint : dislikePoint;
  const isUpdateRating = await putRatingVector(
    dish.category,
    email,
    updatePoint
  );
  if (!isUpdateRating) {
    data.status = ACTION_STATUS.fail;
    data.message = "Failed to update rating vector";
    data.data = false;
    return JSON.parse(JSON.stringify(data));
  }
  return JSON.parse(JSON.stringify(data));
};
export const getLikedDishes = async (email: string) => {
  const data: ActionReturn<FavoriteDishWithRestaurant[]> = {
    status: ACTION_STATUS.success,
    message: "Favorites updated successfully",
  };
  const likedDishes = await prisma.favoritedishes.findMany({
    where: { userEmail: email },
    include: {
      dish: {
        include: {
          restaurant: {
            select: { address: true },
          },
        },
      },
    },
  });
  data.data = likedDishes;
  return JSON.parse(JSON.stringify(data));
};
export const getRecommendDish = async (email: string) => {
  const data: ActionReturn<DishExtend> = {
    status: ACTION_STATUS.success,
    message: "Favorites updated successfully",
  };
  const UserData = await getUserAndAccount(email);
  if (!UserData) {
    data.status = ACTION_STATUS.fail;
    data.message = "Failed to update favorites";
    return JSON.parse(JSON.stringify(data));
  }
  if (UserData.account.currentRecommend) {
    data.data = UserData.account.currentRecommend as DishExtend;
    return JSON.parse(JSON.stringify(data));
  }
  const location = UserData.account.location as LocationInLatLong;
  const recommendation = await getDishes(
    UserData.account.recommendDishes as RecommendationElement[],
    {},
    location?.lat,
    location?.long
  );
  data.data = recommendation[0][0];
  await prisma.account.update({
    where: { id: UserData.account.id },
    data: {
      currentRecommend: recommendation[0][0] as DishExtend,
    },
  });
  return JSON.parse(JSON.stringify(data));
};

export const getNearByDishes = async (email: string) => {
  const data: ActionReturn<DishWithRestaurant[]> = {
    status: ACTION_STATUS.success,
    message: "Favorites updated successfully",
  };
  const UserData = await getUserAndAccount(email);
  if (!UserData) {
    data.status = ACTION_STATUS.fail;
    data.message = "Failed to update favorites";
    return JSON.parse(JSON.stringify(data));
  }
  const location = UserData.account.location as LocationInLatLong;
  const gridID: GridID = getGridID(location.lat, location.long);
  const restaurantIDList = await getRestaurantIDList(
    gridID.gridX,
    gridID.gridY,
    3
  );
  const dishes = await prisma.dishes.findMany({
    where: { merchant_id: { in: restaurantIDList } },
    include: {
      restaurant: {
        select: { location: true, address: true },
      },
    },
  });
  const shuffleDishes = shuffleArray(dishes) as DishWithRestaurant[];
  data.data = shuffleDishes.slice(54);
  return JSON.parse(JSON.stringify(data));
};
