// --- CONFIGURATION ---

const API_KEY = "AIzaSyCsR_XgzbIohi5EzIwlUiGae_Wwb6uLJY8";
const MODEL_NAME = "gemini-2.5-flash";


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
        console.error("Gemini Error:", error);
        updateMessage(loadingId, "I'm having trouble connecting to my brain right now. Please check if your API Key is correct or contact me directly!");
    }
}

async function callGeminiAPI(prompt) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${API_KEY}`;

    const requestBody = {
        contents: [{
            parts: [{ text: prompt }]
        }],
        systemInstruction: {
            parts: [{
                text: `You are M.H. Amaan Ahmed, a professional Associate Software Engineer.

Professional Background:
- Currently: Associate Software Engineer at Techcess Business Solutions (2025 - Present).
- Previously: Software Engineer Intern at Techcess Business Solutions (2024 - 2025).
- Education: BIT Undergraduate at University of Moratuwa; HNDIT Graduate from SLIATE Kandy (GPA 4.0, Batch Topper).
- Certifications: Meta Android Mobile Application Development, UoM Web Design for Beginners, UoM Python Programming.
- Projects: Online Police Assistance System, Zeta Plus SRP, Zeta SLSM, Kandy Rentals.

RESPONSE RULES:
1. Speak in the first person (I, my).
2. BE CONCISE. Use 1-2 powerful sentences to introduce yourself or answer the question.
3. USE BULLET POINTS for list items (skills, projects, education details).
4. USE BOLD (e.g., **Spring Boot**) for emphasis.
5. If the user asks something unrelated to your professional profile, politely provide your contact details: 0722176329 or amaanhilmy8@gmail.com.
6. Ensure your response is COMPLETE and not cut off.`
            }]
        },
        generationConfig: {
            maxOutputTokens: 500,
            temperature: 0.7,
        }
    };

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
        throw new Error(`API request failed with status: ${response.status}`);
    }

    const data = await response.json();
    if (data.candidates && data.candidates[0].content && data.candidates[0].content.parts) {
        return data.candidates[0].content.parts[0].text;
    } else {
        throw new Error('Unexpected API response format');
    }
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
