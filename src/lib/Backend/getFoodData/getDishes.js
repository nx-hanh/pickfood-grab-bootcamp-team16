const database = require('@/lib/Backend/database/Database.js');
const Dish = require('@/models/dishSchema.js');
const Restaurant = require('@/models/restaurantsSchema.js');
const limit_dishes = 30;
const limit_dishes_category = limit_dishes / 5;
const utils = require('@/lib/Backend/utils/utils.js');
const categoryMerchant = global.categoryMerchant;


async function getRestaurantIDList(gridX, gridY) {
    let query = {
        gridX: { $gte: gridX - 1, $lte: gridX + 1 },
        gridY: { $gte: gridY - 1, $lte: gridY + 1 }
    }
    let restaurantList = await Restaurant.find(query);
    let restaurantIDList = [];
    for (let i = 0; i < restaurantList.length; i++) {
        restaurantIDList.push(restaurantList[i]._id);
    }
    return restaurantIDList;
}

function maxCategoryCanGet(merchant_id, category_id) {
    if (categoryMerchant.has(merchant_id) && categoryMerchant.get(merchant_id).has(category_id)) {
        return categoryMerchant.get(merchant_id).get(category_id);
    }
    return 0;
}

async function getDishes(recommendationList, category_sent_list, lat, long) {
    let haveUserLocation = (lat != null && long != null);
    if (category_sent_list == null) {
        category_sent_list = {};
    }
    let gridID = utils.getGridID(lat, long);
    let restaurantIDList;
    if (!haveUserLocation) restaurantIDList = null;
    else restaurantIDList = await getRestaurantIDList(gridID.gridX, gridID.gridY);
    let numberOfDishes = 0;
    let result = [];
    let debug = false;
    for (let i = 0; numberOfDishes < limit_dishes && i < recommendationList.length; i++) {
        let index = 0;
        if (recommendationList[i].id in category_sent_list) {
            index = category_sent_list[recommendationList[i].id];
        }
        let restaurant_id_query;
        if (restaurantIDList != null) {
            restaurant_id_query = [];
            for (let j = 0; j < restaurantIDList.length; j++) {
                let maxCategory = maxCategoryCanGet(restaurantIDList[j].toString(), recommendationList[i].id);
                if (index < maxCategory) {
                    restaurant_id_query.push(restaurantIDList[j]);
                }  
            }
            if (restaurant_id_query.length == 0) continue;
        }
        let limit = Math.min(limit_dishes_category, limit_dishes - numberOfDishes);
        let pipeline = [
        {
            $lookup: {
                from: 'restaurants',
                localField: 'merchant_id',
                foreignField: '_id',
                as: 'restaurant'
            }
        },
        {
            $match: {
                category_id: recommendationList[i].id,
            }
        },
        {
            $skip: index
        },
        {
            $limit: limit
        },
        {
            $project: {
                '_id': 0,
                'id': 1,
                'name': 1,
                'imgLink': 1,
                'price': 1,
                'description': 1,
                'category': 1,
                'category_id': 1,
                'category_list_id': 1,
                'rank': 1,
                'restaurant.location': 1,
                'restaurant.address': 1,
              }
            }
        ];
        if (haveUserLocation) pipeline[1]['$match']['merchant_id'] = {$in: restaurant_id_query};
        let dishes = await database.aggregateData(Dish, pipeline);
        if (dishes == null) continue;
        let distance = -1;
        for (let j = 0; j < dishes.length; j++) {
            let restaurantLocation = dishes[j].restaurant[0].location;
            if (haveUserLocation) distance = utils.calculateDistance(lat, long, restaurantLocation[0], restaurantLocation[1]);
            result.push({
                id: dishes[j].id,
                name: dishes[j].name,
                imgLink: dishes[j].imgLink,
                price: dishes[j].price,
                description: dishes[j].description,
                category: dishes[j].category,
                category_id: dishes[j].category_list_id,
                address: dishes[j].restaurant[0].address,
                distance: distance,
            })
        }
        numberOfDishes += dishes.length;
        category_sent_list[recommendationList[i].id] = index + dishes.length;
    }
    result = utils.shuffleArray(result);
    return [result, category_sent_list];
}

module.exports = getDishes;