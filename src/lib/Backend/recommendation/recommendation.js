const database = require('@/lib/Backend/database/Database.js');
const User = require('@/models/userSchema.js');
const { recommendationSystem, RatingVector } = require('@/lib/Backend/recommendation/Recommendation_System.js');

async function getRecommendation(userdata, return_user_favorites = false, userRatingVector = null) {
    console.log("Running getRecommendation")
    if (userRatingVector == null) {
        let query = {
            email: userdata.email
        }
        let user = await database.findData(User, query);
        if (user == null) {
            return null;
        }
        userRatingVector = new RatingVector(user[0].favorites);
    }
    // userRatingVector.loop();
    let rcm_result = recommendationSystem.getListSimilarity(userRatingVector);
    if (!return_user_favorites) return rcm_result;
    return [rcm_result, userRatingVector];
}

module.exports = getRecommendation;