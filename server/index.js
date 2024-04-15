// server.js

const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const path = require("path");
const { userJoin, userLeave, getConnectedUsers } = require('./helpers/userManager');

app.get("/", (req, res) => {
    res.sendFile(path.resolve('index.html'));
});

io.on('connection', (socket) => {
    socket.on('join', (username) => {
        userJoin(socket.id, username);
        io.emit('userJoined', { username });
        // Send updated user count and list to all clients
        io.emit('updateUsers', { users: Array.from(getConnectedUsers()) });
    });

    socket.on('chatMessage', (message) => {
        const sender = getSenderUsername(socket.id);
        // Broadcast the message to all clients except the sender
        io.emit('message', { id: socket.id, sender, message });
    });

    socket.on('disconnect', () => {
        const user = userLeave(socket.id);
        if (user) {
            io.emit('userLeft', { username: user.username });
            io.emit('updateUsers', { users: Array.from(getConnectedUsers()) });
        }
    });
});

/**
 * Get the username of a user given their ID.
 * @param {string} id - The unique identifier of the user.
 * @returns {string} - The username of the user.
 */
function getSenderUsername(id) {
    const user = Array.from(getConnectedUsers()).find(user => user.id === id);
    return user ? user.username : 'Unknown';
}

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});