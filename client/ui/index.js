const currentUserMsgClasses = ['bg-blue-200', 'p-2', 'rounded-lg', 'self-end', 'text-right', 'max-w-lg'];
const userMsgClasses = ['bg-green-100', 'p-2', 'rounded-lg', 'max-w-lg', 'text-left']

const totalUsersElement = document.getElementById('totalUsers');
const messageForm = document.getElementById('messageForm');
const messageInput = document.getElementById('messageInput');
const chatMessages = document.getElementById('chatMessages');
const chatWrapper = document.getElementById('chatWrapper');

export function updateTotalUsersCount(count) {
    totalUsersElement.textContent = count;
}

export function displayChatMessage(isCurrentUser, sender, message) {
    const div = document.createElement('div');

    if (isCurrentUser) { 
        div.innerHTML = `<b>Me</b><br/> ${message}`;
        div.classList.add(...currentUserMsgClasses);
    } else {
        div.innerHTML = `<b>${sender}</b><br/> ${message}`;
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
