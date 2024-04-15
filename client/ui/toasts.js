const TOAST_COLORS = {
    'error': '#ff4444',
    'success': '#00c851',
    'DEFAULT': '#333333'
}

export function showToast(message, type = 'DEFAULT') {
    if (!Toastify) {
        throw new Error(`toastify library isn't loaded`)
    }
    
    Toastify({
        text: message,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: 'top',
        position: 'right',
        style: {
            background: TOAST_COLORS[type]
        },
    }).showToast();
}