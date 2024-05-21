const { getSession, updateSession } = require('@/lib/Backend/session/session.js');

const likePoint = 0.4;
const dislikePoint = -0.2;


async function updateUserRating(sessionID, list_category, like, email) {
    let sessionData = getSession(sessionID);
    if (sessionData == null) {
        console.log("Invalid sessionID");
        return false;
    }
    let user_favorites = sessionData.user_favorites;
    let cnt_changes = sessionData.cnt_changes;
    if (list_category == null || list_category.length == 0) {
        console.log("Empty list_category");
        return false;
    }
    cnt_changes++;
    for (let i = 0; i < list_category.length; i++) {
        let category = list_category[i];
        let costRating = like ? likePoint : dislikePoint;
        user_favorites.updateRating(category, costRating);
    }
    sessionData.cnt_changes = cnt_changes;
    sessionData.user_favorites = user_favorites;
    updateSession(sessionID, sessionData);
    return true;
}

module.exports = updateUserRating;