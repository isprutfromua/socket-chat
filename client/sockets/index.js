export function initSockets() {
    if (!io || typeof io !== 'function') {
        throw new Error('socket library isn`t loaded')
    }

    let socket = io("http://localhost:3000", {
        withCredentials: true
    });

    return socket
}
