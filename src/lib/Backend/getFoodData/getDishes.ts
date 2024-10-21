// 'use server';
import utils from "@/lib/Backend/utils/utils";
import prisma from "@/lib/prisma";
import { dishes } from "@prisma/client";

const limit_dishes = 30;
const limit_dishes_category = limit_dishes / 6;
const categoryMerchant: Map<
  string,
  Map<number, number>
> = global.categoryMerchant;

interface GridID {
  gridX: number;
  gridY: number;
}

async function getRestaurantIDList(
  gridX: number,
  gridY: number
): Promise<string[]> {
  const restaurantList = await prisma.restaurants.findMany({
    where: {
      gridX: { gte: gridX - 1, lte: gridX + 1 },
      gridY: { gte: gridY - 1, lte: gridY + 1 },
    },
    select: { id: true },
  });

  return restaurantList.map((restaurant) => restaurant.id.toString());
}

function maxCategoryCanGet(merchant_id: string, category_id: number): number {
  const merchant = categoryMerchant.get(merchant_id);
  return merchant?.get(category_id) ?? 0;
}
async function getDishes(
  recommendationList: RecommendationElement[],
  recommendedMark: RecommendedMark = {},
  lat?: number,
  long?: number
): Promise<[dishes[], Record<string, number>]> {
  const category_sent_list = recommendedMark ? recommendedMark : {};
  const haveUserLocation = lat != null && long != null;
  const gridID: GridID = utils.getGridID(lat, long);
  const restaurantIDList = haveUserLocation
    ? await getRestaurantIDList(gridID.gridX, gridID.gridY)
    : null;

  let numberOfDishes = 0;
  const result: (dishes & {
    address: string;
    distance: number;
  })[] = [];

  for (
    let i = 0;
    numberOfDishes < limit_dishes && i < recommendationList.length;
    i++
  ) {
    const recommendation = recommendationList[i];
    let index = category_sent_list[recommendation.id] || 0;

    let restaurant_id_query: string[] | undefined;
    if (restaurantIDList) {
      restaurant_id_query = restaurantIDList.filter((restaurantId) => {
        const maxCategory = maxCategoryCanGet(restaurantId, recommendation.id);
        return index < maxCategory;
      });
      if (restaurant_id_query.length === 0) continue;
    }

    const limit = Math.min(
      limit_dishes_category,
      limit_dishes - numberOfDishes
    );

    const dishes = await prisma.dishes.findMany({
      where: {
        category_id: recommendation.id,
        ...(restaurant_id_query && {
          merchant_id: { in: restaurant_id_query },
        }),
      },
      skip: index,
      take: limit,
      include: {
        restaurant: {
          select: { location: true, address: true },
        },
      },
    });

    if (dishes.length === 0) continue;

    dishes.forEach((dish) => {
      const restaurantLocation = dish.restaurant?.location;
      const distance =
        haveUserLocation && restaurantLocation
          ? utils.calculateDistance(
              lat!,
              long!,
              restaurantLocation[0],
              restaurantLocation[1]
            )
          : -1;

      result.push({
        ...dish,
        address: dish.restaurant?.address || "",
        distance,
      });
    });

    numberOfDishes += dishes.length;
    category_sent_list[recommendation.id] = index + dishes.length;
  }

  return [utils.shuffleArray(result), category_sent_list];
}

export default getDishes;
