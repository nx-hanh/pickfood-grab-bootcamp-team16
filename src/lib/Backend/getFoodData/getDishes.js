const database = require('@/lib/Backend/database/database.js');
const Dish = require('@/models/dishSchema.js');
const getRecommendation = require('@/lib/Backend/recommendation/recommendation.js');

async function getDishes(userdata) {
    let recommendationList = await getRecommendation(userdata);
    let result = [];
    for (let i = 0; i < 5; i++) {
        let query = {
            category_id: recommendationList[i].id
        }
        const dishes = await database.findData(Dish, query, 10);
        if (dishes == null) return null;
        for (let i = 0; i < dishes.length; i++) {
            result.push({
                id: dishes[i].id,
                name: dishes[i].name,
                imgLink: dishes[i].imgLink,
                price: dishes[i].price,
                description: dishes[i].description
            });
        }
    }
    return result;
}

module.exports = getDishes;