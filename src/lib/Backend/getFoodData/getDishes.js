const database = require('@/lib/Backend/database/Database.js');
const Dish = require('@/models/dishSchema.js');
const limit_dishes = 10;
const limit_dishes_category = limit_dishes / 5;

async function getDishes(recommendationList, category_sent_list) {
    let result = [];
    if (category_sent_list == null) {
        category_sent_list = {};
    }
    let cnt = 0;
    for (let i = 0; cnt < limit_dishes && i < recommendationList.length; i++) {
        let index = 0;
        let recommendationCategory = recommendationList[i].id;
        if (recommendationCategory in category_sent_list) {
            index = category_sent_list[recommendationCategory];
        }
        let limit_query = Math.min(limit_dishes - cnt, limit_dishes_category);
        let query = {
            category_id: recommendationCategory,
            rank: { $gt: index , $lte: index + limit_query}
        }
        const dishes = await database.findData(Dish, query, limit_query);
        if (dishes == null) continue;
        cnt += dishes.length;
        for (let i = 0; i < dishes.length; i++) {
            result.push({
                id: dishes[i].id,
                name: dishes[i].name,
                imgLink: dishes[i].imgLink,
                price: dishes[i].price,
                description: dishes[i].description,
                rank: dishes[i].rank
            });
        }
        category_sent_list[recommendationCategory] = index + dishes.length;
    }
    return [result, category_sent_list];
}

module.exports = getDishes;