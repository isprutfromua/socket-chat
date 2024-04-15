import { initSockets } from "./sockets";
import { setupMessageSending, displayChatMessage, updateTotalUsersCount } from "./ui";
import { getUserId, getUserName, setUserId } from "./ui/user";
import { showToast } from "./ui/toasts";

function setupEvents() {
    const socket = initSockets();

    socket.emit('join', getUserName());

    socket.on('connect', () => {
        setUserId(socket.id);
    });

    socket.on('disconnect', () => {
        socket.disconnect();
    });

    socket.on('user:join', ({ username }) => {
        showToast(`${username} joined the chat`, 'success');
    });

    socket.on('user:left', ({ username }) => {
        showToast(`${username} left the chat`, 'error');
    });

    socket.on('message', ({ id, sender, message }) => {
        displayChatMessage(id === getUserId(), sender, message);
    });

    socket.on('users:update:count', ({ users }) => {
        updateTotalUsersCount(users.length);
    });

    setupMessageSending((message) => {
        socket.emit('chat:message', message);
    })
}

function init() {
    setupEvents();
}

init();