const User = require('@/models/userSchema.js');
const database = require('@/lib/Backend/database/database.js');


async function updateFavorites(email, favorite_category) {
    favorite_category = favorite_category.filter((item) => item < Number(process.env.MAX_CATEGORY));
    let favorite_set = new Set(favorite_category);
    favorite_category = Array.from(favorite_set);
    const update = {
        $set: {
            favorites: favorite_category
        }
    };
    const updateUser = await database.findAndUpdate(User, { email: email }, update);
    if (updateUser) {
        console.log("Favorites updated successfully");
        return true;
    }
    
    console.log("Failed to update favorites");
    return false;
}

module.exports = updateFavorites;