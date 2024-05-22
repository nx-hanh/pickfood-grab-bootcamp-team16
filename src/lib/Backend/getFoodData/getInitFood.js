const database = require('@/lib/Backend/database/Database.js');
const User = require('@/models/userSchema.js');

async function getInitFood(email) {
    const user = await database.findData(User, { email: email });
    if (user) {
        return user[0].init_favorites;
    }
    return [];
}

module.exports = getInitFood;