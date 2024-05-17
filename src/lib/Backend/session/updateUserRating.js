const { getSession, updateSession } = require('@/lib/Backend/session/session.js');
const getRecommendation = require('@/lib/Backend/recommendation/recommendation.js');
const updateFavorites = require('@/lib/Backend/database/updateUser.js');

const likePoint = 0.4;
const dislikePoint = -0.2;


async function updateUserRating(sessionID, list_category, like, email) {
    let sessionData = getSession(sessionID);
    if (sessionData == null) {
        console.log("Invalid sessionID");
        return false;
    }
    let recommendationList = sessionData.recommendationList;
    let user_favorites = sessionData.user_favorites;
    let cnt_changes = sessionData.cnt_changes;
    if (list_category == null || list_category.length == 0) {
        console.log("Empty list_category");
        return false;
    }
    cnt_changes++;
    // user_favorites.loop();
    for (let i = 0; i < list_category.length; i++) {
        let category = list_category[i];
        let costRating = like ? likePoint : dislikePoint;
        user_favorites.updateRating(category, costRating);
    }
    if (cnt_changes >= 3) {
        let updateUser_rating = user_favorites.extractRating();
        let updateFavorites_result = await updateFavorites(email, updateUser_rating);
        recommendationList = await getRecommendation(null, false, user_favorites);
        cnt_changes = 0;
    }
    sessionData.cnt_changes = cnt_changes;
    sessionData.user_favorites = user_favorites;
    sessionData.recommendationList = recommendationList;
    updateSession(sessionID, sessionData);
    return true;
}

module.exports = updateUserRating;