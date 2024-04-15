const currentUserMsgClasses = ['bg-blue-200', 'p-2', 'rounded-lg', 'self-end', 'text-right', 'max-w-lg'];
const userMsgClasses = ['bg-green-100', 'p-2', 'rounded-lg', 'max-w-lg', 'text-left']

const totalUsersElement = document.getElementById('totalUsers');
const currentUserEl = document.getElementById('currentUser');
const messageForm = document.getElementById('messageForm');
const messageInput = document.getElementById('messageInput');
const chatMessages = document.getElementById('chatMessages');
const chatWrapper = document.getElementById('chatWrapper');

export function updateTotalUsersCount(count) {
    totalUsersElement.textContent = count;
}

export function updateUserName(userName) {
    currentUserEl.textContent = userName;
}

export function displayChatMessage(isCurrentUser, sender, message) {
    const div = document.createElement('div');

    if (isCurrentUser) { 
        div.innerHTML = `<b data-e2e="user-name">Me</b><br/><p data-e2e="user-msg">${message}</p>`;
        div.classList.add(...currentUserMsgClasses);
    } else {
        div.innerHTML = `<b data-e2e="user-name">${sender}</b><br/><p data-e2e="user-msg">${message}</p>`;
        div.classList.add(...userMsgClasses);
    }

    chatMessages.appendChild(div);
    chatWrapper.scrollTo(0, chatWrapper.scrollHeight);
}

export function setupMessageSending(cb) {
    messageForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const message = messageInput.value.trim();

        if (message !== '') {
            messageInput.value = '';
            cb(message);
        }
    });
}
