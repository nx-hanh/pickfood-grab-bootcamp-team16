// lib/sessionStore.js
const { v4: uuidv4 } = require('uuid');
const updateFavorites = require('@/lib/Backend/database/updateUser.js');
const getRecommendation = require('@/lib/Backend/recommendation/recommendation.js');

let sessions = global.sessions;
let sessionTimeouts = global.sessionTimeouts;

const sessionExpirationTime = 1800000; // 30 minutes
// set sessionExpirationTime to 30 seconds for testing
// const sessionExpirationTime = 30000; // 30 seconds

function generateSessionID() {
    return uuidv4();
}

async function saveSessionData(sessionData, runRecommendation = true) {
    let updateUser_rating = sessionData.user_favorites.extractRating();
    let updateFavorites_result = await updateFavorites(sessionData.email, updateUser_rating);
    if (runRecommendation) {
        sessionData.recommendationList = await getRecommendation(null, false, sessionData.user_favorites);
    }
    console.log(`Updated user rating for ${sessionData.email}`)
    sessionData.cnt_changes = 0;
    return sessionData;
}

function createSession(data, expirationTime = sessionExpirationTime) { // Default expiration time is 30 minutes
    const sessionID = generateSessionID();
    sessions.set(sessionID, { data });
    setSessionTimeout(sessionID, expirationTime);
    return sessionID;
}

function getSession(sessionID) {
    const session = sessions.get(sessionID);
    if (session) {
        resetSessionTimeout(sessionID); // Reset expiration timeout
        return session.data;
    }
    return null;
}

function updateSession(sessionID, data) {
    if (sessions.has(sessionID)) {
        sessions.get(sessionID).data = data;
        resetSessionTimeout(sessionID); // Reset expiration timeout
        return true;
    }
    return false;
}

async function deleteSession(sessionID) {
    clearTimeout(sessionTimeouts.get(sessionID)); // Clear existing timeout
    sessionTimeouts.delete(sessionID); // Remove from timeouts map
    await saveSessionData(sessions.get(sessionID).data, false); // Update user rating
    console.log(`Deleted session ${sessionID}`)
    return sessions.delete(sessionID); // Delete from sessions map
}

function setSessionTimeout(sessionID, expirationTime) {
    const timeout = setTimeout(() => {
        deleteSession(sessionID);
    }, expirationTime);
    sessionTimeouts.set(sessionID, timeout);
}

function resetSessionTimeout(sessionID) {
    clearTimeout(sessionTimeouts.get(sessionID)); // Clear existing timeout
    setSessionTimeout(sessionID, sessionExpirationTime); // Reset expiration time to 30 hour
}

module.exports = { createSession, getSession, updateSession, saveSessionData };
