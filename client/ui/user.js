let userId = null;

export function getUserName() {
    return prompt('Please enter your name:') ?? 'Unknown';
}

export function setUserId(id) {
    userId = id;
}

export function getUserId() {
    return userId;
}