/**
 * This file initializes an Express application, sets up HTTP and Socket.IO servers, and defines event listeners for socket connections.
 * @module server
 */

const express = require("express");
const app = express();
const http = require("http").Server(app);
/** @type {import('socket.io').Server} */
const io = require("socket.io")(http, {
    cors: {
        origin: "http://localhost:1234",
        credentials: true
    }
});
const path = require("path");
const { userJoin, userLeave, getConnectedUsers } = require('./helpers/userManager');

/**
 * Event listener for socket connection.
 * @name connection
 * @function
 * @memberof module:server
 * @param {import('socket.io').Socket} socket - The socket object representing a client connection.
 * @returns {void}
 */
io.on('connection', (socket) => {
    /**
     * Event listener for a user joining the chat.
     * @name join
     * @function
     * @memberof module:server~connection
     * @param {string} username - The username of the joining user.
     * @returns {void}
     */
    socket.on('join', (username) => {
        userJoin(socket.id, username);
        io.emit('user:join', { username });
        io.emit('users:update:count', { users: Array.from(getConnectedUsers()) });
    });

    /**
     * Event listener for receiving chat messages.
     * @name chat:message
     * @function
     * @memberof module:server~connection
     * @param {string} message - The message sent by the user.
     * @returns {void}
     */
    socket.on('chat:message', (message) => {
        const sender = getSenderUsername(socket.id);
        io.emit('message', { id: socket.id, sender, message });
    });

    /**
     * Event listener for socket disconnection.
     * @name disconnect
     * @function
     * @memberof module:server~connection
     * @returns {void}
     */
    socket.on('disconnect', () => {
        const user = userLeave(socket.id);
        if (user) {
            io.emit('user:left', { username: user.username });
            io.emit('users:update:count', { users: Array.from(getConnectedUsers()) });
        }
    });
});

/**
 * Retrieves the username of a user given their ID.
 * @function
 * @memberof module:server
 * @param {string} id - The unique identifier of the user.
 * @returns {string} - The username of the user.
 */
function getSenderUsername(id) {
    const user = Array.from(getConnectedUsers()).find(user => user.id === id);
    return user ? user.username : 'Unknown';
}

const PORT = process.env.PORT || 3000;

/**
 * Starts the HTTP server.
 * @function
 * @memberof module:server
 * @param {number} PORT - The port number on which the server will listen.
 * @returns {void}
 */
http.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
