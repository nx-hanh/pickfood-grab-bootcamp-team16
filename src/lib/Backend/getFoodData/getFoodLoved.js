const database = require('@/lib/Backend/database/Database.js');
const FavoriteDish = require('@/models/favoriteDishSchema.js');

async function getFoodLoved(email) {
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
    const pipeline = [
        {
            $lookup: {
                from: "dishes",
                localField: "dishID",
                foreignField: "id",
                as: "dishes"
            }
        },
        {
            $match: {
                userEmail: email,
                createAt: {
                    $gte: threeDaysAgo
                }
            }
        },
        {
            $lookup: {
                from: "restaurants",
                localField: "dishes.merchant_id",
                foreignField: "_id",
                as: "restaurants"
            }
        },
        {
            $project: {
                '_id': 0,
                'dishID': 1,
                'createAt': 1,
                'dishes.name': 1,
                'dishes.imgLink': 1,
                'dishes.price': 1,
                'dishes.description': 1,
                'dishes.category': 1,
                'restaurants.address': 1,
            }
        }
    ];
    let lovedFood = await database.aggregateData(FavoriteDish, pipeline);
    let result = []
    for (let i = 0; i < lovedFood.length; i++) {
        result.push({
            id: lovedFood[i].dishID,
            name: lovedFood[i].userEmail,
            imgLink: lovedFood[i].dishes[0].imgLink,
            price: lovedFood[i].dishes[0].price,
            description: lovedFood[i].dishes[0].description,
            category: lovedFood[i].dishes[0].category,
            address: lovedFood[i].restaurants[0].address,
            timeStamp: new Date(lovedFood[i].createAt).getTime()
        });
    }
    return result;
}

module.exports = getFoodLoved;