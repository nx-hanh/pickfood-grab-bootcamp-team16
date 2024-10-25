"use server";
import { auth } from "@/auth";
import getRecommendation from "@/lib/backend/recommendation/recommendation";
import { RatingVector } from "@/lib/backend/recommendation/recommendationSystem";
import { ACTION_STATUS, CATEGORIES_MAP } from "@/lib/constant";
import prisma from "@/lib/prisma";
export const getUserAndAccount = async (email: string) => {
  const user = await prisma.user.findFirst({
    where: { email },
  });
  if (!user) {
    return null;
  }
  const account = await prisma.account.findFirst({
    where: { userId: user.id },
  });
  if (!account) {
    return null;
  }
  return {
    user,
    account,
  };
};

export const updateFavorites = async (email: string, favorites: string[]) => {
  const data: ActionReturn<void> = {
    status: ACTION_STATUS.success,
    message: "Favorites updated successfully",
  };
  try {
    //update ratingVector in the database
    await putRatingVector(favorites, email);

    const user = await prisma.user.update({
      where: { email },
      data: {
        favorites,
        onboardingCompleted: true,
      },
    });
    if (!user) {
      data.status = ACTION_STATUS.fail;
      data.message = "Failed to update favorites";
    }
    //re-calculate recommendations
    await generateRecommendDishes(email);
  } catch (error) {
    data.status = ACTION_STATUS.fail;
    data.message = `Failed to update favorites`;
    data.error = error as Error;
  }
  return JSON.parse(JSON.stringify(data));
};
export const putRatingVector = async (
  favorites: string[],
  email: string,
  updatePoint?: number
) => {
  const user = await prisma.user.findFirst({
    where: { email },
  });
  if (!user) {
    return false;
  }
  const account = await prisma.account.findFirst({
    where: { userId: user.id },
  });
  if (!account) {
    return false;
  }
  const ratingVector = account.ratingVector || {};
  const point = updatePoint ? updatePoint : 1;
  favorites.forEach((favorites) => {
    const isExist = ratingVector[CATEGORIES_MAP.get(favorites)!];
    ratingVector[CATEGORIES_MAP.get(favorites)!] = isExist
      ? (parseFloat(isExist) + point).toString()
      : point.toString();
  });
  await prisma.account.update({
    where: { id: account.id },
    data: {
      ratingVector,
    },
  });
  return true;
};

export const generateRecommendDishes = async (email: string) => {
  // Implement recommendation logic here
  const user = await prisma.user.findFirst({
    where: { email, onboardingCompleted: true },
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
  const userRatingVectors: RatingVectorConstructor = [];
  if (account.ratingVector) {
    //rating vector in db like {categoryIndex: ratingValue, e.g 1: 0.5}
    for (const [key, value] of Object.entries(account.ratingVector)) {
      userRatingVectors.push({
        category: parseInt(key),
        rate: parseFloat(value),
      });
    }
  } else {
    user.favorites.forEach((item) => {
      userRatingVectors.push({
        category: CATEGORIES_MAP.get(item)!,
        rate: 1, // Assuming all dishes in the favorite list have the same rating
      });
    });
  }
  const userRatingVector = new RatingVector(userRatingVectors);
  // Implement logic to get user rating vector from user account
  const recommendations = await getRecommendation({
    userRatingVector,
  });
  await prisma.account.update({
    where: { id: account.id },
    data: {
      ratingVector: Object.fromEntries(
        userRatingVectors.map((item) => [
          item.category.toString(),
          item.rate?.toString() || 1,
        ])
      ),
      recommendDishes: recommendations,
    },
  });
};

export const resetRecommendData = async () => {
  const data: ActionReturn<void> = {
    status: ACTION_STATUS.success,
    message: "Favorites updated successfully",
  };
  const session = await auth();
  if (!session) {
    data.status = ACTION_STATUS.fail;
    data.message = "Not authenticated";
    return JSON.parse(JSON.stringify(data));
  }
  const email = session.user.email!;
  const UserData = await getUserAndAccount(email);
  if (!UserData) {
    data.status = ACTION_STATUS.fail;
    data.message = "User not found completed";
    return JSON.parse(JSON.stringify(data));
  }
  await generateRecommendDishes(email);
  await resetRecommendedMarkAndCurrentRecommend(UserData.account.id);
  return JSON.parse(JSON.stringify(data));
};
const resetRecommendedMarkAndCurrentRecommend = async (accountId: string) => {
  await prisma.account.update({
    where: { id: accountId },
    data: {
      recommendedMark: {},
      currentRecommend: null,
    },
  });
};

export const updateCurrentLocation = async ({
  email,
  location,
}: {
  email: string;
  location: LocationInLatLong;
}) => {
  const UserData = await getUserAndAccount(email);
  if (!UserData) return false;
  const updateAccount = await prisma.account.update({
    where: { id: UserData.account.id },
    data: {
      location: location,
    },
  });
  if (!updateAccount) return false;
  return true;
};
