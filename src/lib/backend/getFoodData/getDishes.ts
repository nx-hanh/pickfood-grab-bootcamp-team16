import prisma from "@/lib/prisma";
import { calculateDistance, getGridID, shuffleArray } from "@/lib/utils";
import { DishExtend } from "@/types/type";
import { dishes } from "@prisma/client";
import * as fs from "fs";

const limit_dishes = 30;
const limit_dishes_category = limit_dishes / 6;
const prefixFileName = `${process.cwd()}/src/lib/backend/getFoodData/`;

function loadCategoriesOfMerchant() {
  const categoryMerchant: Map<string, Map<number, number>> = new Map();
  let categories = fs
    .readFileSync(`${prefixFileName}category_idOfMerchant.txt`, "utf8")
    .split("\n");
  // let cnt = 0;
  for (let i = 0; i < categories.length; i++) {
    let category = categories[i].split(" ");
    let merchant_id = category[0];
    let category_id = parseInt(category[1]);
    if (!categoryMerchant.has(merchant_id)) {
      categoryMerchant.set(merchant_id, new Map());
    }
    let cnt = categoryMerchant.get(merchant_id)?.get(category_id);
    if (cnt == undefined) {
      cnt = 0;
    }
    categoryMerchant.get(merchant_id)?.set(category_id, ++cnt);
  }
  return categoryMerchant;
}

const categoryMerchant: Map<
  string,
  Map<number, number>
> = loadCategoriesOfMerchant();

export async function getRestaurantIDList(
  gridX: number,
  gridY: number,
  range = 1
): Promise<string[]> {
  const restaurantList = await prisma.restaurants.findMany({
    where: {
      gridX: { gte: gridX - range, lte: gridX + range },
      gridY: { gte: gridY - range, lte: gridY + range },
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
): Promise<[DishExtend[], Record<string, number>]> {
  const category_sent_list = recommendedMark ? recommendedMark : {};
  const haveUserLocation = lat != null && long != null;
  const gridID: GridID = getGridID(lat, long);
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
          ? calculateDistance(
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

  return [shuffleArray(result), category_sent_list];
}

export default getDishes;
