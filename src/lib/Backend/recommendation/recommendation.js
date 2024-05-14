const database = require('@/lib/Backend/database/Database.js');
const User = require('@/models/userSchema.js');
const { recommendationSystem, RatingVector } = require('@/lib/Backend/recommendation/Recommendation_System.js');

async function getRecommendation(userdata) {
    let query = {
        email: userdata.email
    }
    let user = await database.findData(User, query);
    if (user == null) {
        return null;
    }
    let userRatingVector = new RatingVector(user[0].favorites);
    let tmp = recommendationSystem.getListSimilarity(userRatingVector);
    return recommendationSystem.getListSimilarity(userRatingVector);
}

module.exports = getRecommendation;