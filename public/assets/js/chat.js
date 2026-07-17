// Configuration moved to backend (/api/chat.js) for security

// Use event delegation for Next.js SPA compatibility
document.addEventListener('click', (e) => {
    const chatFab = e.target.closest('#chatFab');
    if (chatFab) {
        const chatWindow = document.getElementById('chatWindow');
        const chatInput = document.getElementById('chatInput');
        if (chatWindow) {
            chatWindow.classList.toggle('active');
            if (chatWindow.classList.contains('active') && chatInput) {
                chatInput.focus();
            }
        }
        return;
    }

    const chatClose = e.target.closest('#chatClose');
    if (chatClose) {
        const chatWindow = document.getElementById('chatWindow');
        if (chatWindow) chatWindow.classList.remove('active');
        return;
    }

    const chatSend = e.target.closest('#chatSend');
    if (chatSend) {
        sendMessage();
        return;
    }
});

document.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && e.target.id === 'chatInput') {
        sendMessage();
    }
});

async function sendMessage() {
    const chatInput = document.getElementById('chatInput');
    const text = chatInput ? chatInput.value.trim() : '';
    if (!text) return;

    appendMessage(text, 'user');
    if (chatInput) chatInput.value = '';

    const loadingId = 'ai-loading-' + Date.now();
    appendMessage("Thinking...", 'ai', loadingId);

    try {
        const responseText = await callGeminiAPI(text);
        updateMessage(loadingId, responseText);
    } catch (error) {
        console.error("Gemini Connection Error:", error);
        updateMessage(loadingId, "I'm having trouble connecting to my brain right now. Please check if your API Key is correct or contact me directly!");
    }
}

async function callGeminiAPI(prompt) {
    const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt })
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Request failed with status: ${response.status}`);
    }

    const data = await response.json();
    return data.text;
}

function formatMarkdown(text) {
    let formatted = text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/^\s*[\-\*]\s*(.*?)$/gm, '<li>$1</li>');

    formatted = formatted.replace(/(<li>.*?<\/li>)+/gs, (match) => `<ul>${match}</ul>`);

    return formatted.replace(/\n/g, '<br>');
}

function appendMessage(text, sender, id = null) {
    const chatMessages = document.getElementById('chatMessages');
    if (!chatMessages) return;

    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${sender}`;
    if (id) msgDiv.id = id;

    if (sender === 'ai') {
        msgDiv.innerHTML = formatMarkdown(text);
    } else {
        msgDiv.textContent = text;
    }

    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function updateMessage(id, newText) {
    const msgDiv = document.getElementById(id);
    const chatMessages = document.getElementById('chatMessages');
    if (msgDiv) {
        msgDiv.innerHTML = formatMarkdown(newText);
        if (chatMessages) chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}
