const database = require('@/lib/Backend/database/database.js');
const Dish = require('@/models/dishSchema.js');

async function getDishes() {
    let query = {
        category_id: 0
        // id: "VNITE20240501174140025926"
    }
    const dishes = await database.findData(Dish, query);
    if (dishes == null) return null;
    let result = [];
    for (let i = 0; i < dishes.length; i++) {
        result.push({
            id: dishes[i].id,
            name: dishes[i].name,
            imgLink: dishes[i].imgLink,
            price: dishes[i].price,
            description: dishes[i].description
            // location: dishes[i].location
        });
    }
    return result;
}

module.exports = getDishes;