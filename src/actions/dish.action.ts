import { getUserAndAccount, putRatingVector } from "@/actions/user.action";
import getDishes from "@/lib/Backend/getFoodData/getDishes";
import {
  ACTION_STATUS,
  CATEGORIES_MAP,
  DISH_ACTIONS,
  DISH_ACTIONS_TYPE,
} from "@/lib/constant";
import prisma from "@/lib/prisma";
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
  console.log();
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
