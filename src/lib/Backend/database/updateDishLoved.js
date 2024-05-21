const database = require('@/lib/Backend/database/Database.js');
const FavoriteDish = require('@/models/favoriteDishSchema.js');

async function updateDishLoved(email, dish_id) {
    // insert a new dish into the database
    let newDish = new FavoriteDish({
        userEmail: email,
        dishID: dish_id
    });
    let status = await database.addData(newDish);
}

module.exports = updateDishLoved;