// userManager.js

/**
 * Represents a user in the chat application.
 * @typedef {Object} User
 * @property {string} id - The unique identifier of the user.
 * @property {string} username - The username of the user.
 */

// Using a Set to store connected users
const connectedUsers = new Set();

/**
 * Add a user to the list of connected users.
 * @param {string} id - The unique identifier of the user.
 * @param {string} username - The username of the user.
 * @returns {void}
 */
function userJoin(id, username) {
    connectedUsers.add({ id, username });
}

/**
 * Remove a user from the list of connected users.
 * @param {string} id - The unique identifier of the user.
 * @returns {User|undefined} - The user object if found and removed, undefined otherwise.
 */
function userLeave(id) {
    for (const user of connectedUsers) {
        if (user.id === id) {
            connectedUsers.delete(user);
            return user;
        }
    }
}

/**
 * Get the list of connected users.
 * @returns {Set<User>} - A Set containing all connected users.
 */
function getConnectedUsers() {
    return connectedUsers;
}

module.exports = {
    userJoin,
    userLeave,
    getConnectedUsers
};
