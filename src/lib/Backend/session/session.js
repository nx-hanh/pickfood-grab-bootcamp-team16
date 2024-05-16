// lib/sessionStore.js
const { v4: uuidv4 } = require('uuid');

const sessions = new Map();
const sessionTimeouts = new Map();
const sessionExpirationTime = 1800000; // 30 minutes

function generateSessionID() {
    return uuidv4();
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

function deleteSession(sessionID) {
    clearTimeout(sessionTimeouts.get(sessionID)); // Clear existing timeout
    sessionTimeouts.delete(sessionID); // Remove from timeouts map
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

module.exports = { createSession, getSession };
