const User = require('@/models/userSchema.js');
const database = require('@/lib/Backend/database/Database.js');


async function updateFavorites(email, favorite_category) {
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