// --- CONFIGURATION ---
// Configuration moved to backend (/api/chat.js) for security



const chatFab = document.getElementById('chatFab');
const chatWindow = document.getElementById('chatWindow');
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const chatSend = document.getElementById('chatSend');
const chatClose = document.getElementById('chatClose');


chatFab.addEventListener('click', () => {
    chatWindow.classList.toggle('active');
    if (chatWindow.classList.contains('active')) {
        chatInput.focus();
    }
});

chatClose.addEventListener('click', () => {
    chatWindow.classList.remove('active');
});

async function sendMessage() {
    const text = chatInput.value.trim();
    if (!text) return;


    appendMessage(text, 'user');
    chatInput.value = '';


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
    if (msgDiv) {
        msgDiv.innerHTML = formatMarkdown(newText);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}

chatSend.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});
