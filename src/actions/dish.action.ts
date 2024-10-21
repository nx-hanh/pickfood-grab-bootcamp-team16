import getDishes from "@/lib/Backend/getFoodData/getDishes";
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
