// js/chatbot.js

document.addEventListener('DOMContentLoaded', () => {
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotWindow = document.getElementById('chatbot-window');
    const closeChat = document.getElementById('close-chat');
    const chatMessages = document.getElementById('chat-messages');
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-btn');
    const chatLoading = document.getElementById('chat-loading');

    // Load history from local storage
    let chatHistory = JSON.parse(localStorage.getItem('chatHistory')) || [];

    // System instruction for the AI
    const systemInstruction = `
You are a professional assistant for Alex's portfolio.
You must only answer questions related to Alex (skills, background, contact info, projects like Nexus AI, Aura E-Commerce).
If the user asked anything unrelated to the portfolio owner politely reply: "I can only answer questions about Alex's portfolio" and suggest asking about the owner's skills or projects.
    `;

    // Initialize Chat
    function initChat() {
        if (chatHistory.length === 0) {
            // Start conversation without API request
            const initialMsg = { role: 'bot', text: 'Hi, how can I help you today?' };
            chatHistory.push(initialMsg);
            saveHistory();
        }
        renderHistory();
    }

    function saveHistory() {
        localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
    }

    function renderHistory() {
        chatMessages.innerHTML = '';
        chatHistory.forEach(msg => {
            appendMessage(msg.role, msg.text);
        });
        scrollToBottom();
    }

    function appendMessage(role, text) {
        const msgDiv = document.createElement('div');
        msgDiv.classList.add('msg', role);
        msgDiv.textContent = text;
        chatMessages.appendChild(msgDiv);
        scrollToBottom();
    }

    function scrollToBottom() {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function toggleChat() {
        chatbotWindow.classList.toggle('hidden');
        if (!chatbotWindow.classList.contains('hidden')) {
            chatInput.focus();
        }
    }

    chatbotToggle.addEventListener('click', toggleChat);
    closeChat.addEventListener('click', toggleChat);

    async function handleSend() {
        const text = chatInput.value.trim();
        if (!text) return;

        // Add user message
        chatHistory.push({ role: 'user', text });
        appendMessage('user', text);
        chatInput.value = '';
        saveHistory();

        // Show loading
        chatLoading.classList.remove('hidden');
        scrollToBottom();

        // Prepare messages for API call
        // The logic is clearly commented here so you can insert your API key later.
        
        /* 
        // --- API INTEGRATION LOGIC ---
        // 1. Prepare the payload
        const apiPayload = {
            contents: chatHistory.map(msg => ({
                role: msg.role === 'bot' ? 'model' : 'user',
                parts: [{ text: msg.text }]
            })),
            systemInstruction: {
                role: "system",
                parts: [{ text: systemInstruction }]
            }
        };

        // 2. Make the API request (Example using Google Gemini API REST endpoint)
        try {
            const API_KEY = 'YOUR_API_KEY'; // Insert your API key here
            const response = await fetch(\`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=\${API_KEY}\`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(apiPayload)
            });
            
            const data = await response.json();
            const botReply = data.candidates[0].content.parts[0].text;
            
            // 3. Handle the response
            chatHistory.push({ role: 'bot', text: botReply });
            appendMessage('bot', botReply);
            saveHistory();
            chatLoading.classList.add('hidden');
            scrollToBottom();
        } catch (error) {
            console.error("API Error:", error);
            appendMessage('bot', "Sorry, I'm having trouble connecting right now.");
            chatLoading.classList.add('hidden');
            scrollToBottom();
        }
        // -----------------------------
        */

        // Simulated API response for demonstration purposes
        setTimeout(() => {
            chatLoading.classList.add('hidden');
            
            // Simple mock logic to demonstrate the system instruction constraint
            const lowerText = text.toLowerCase();
            let botReply = "";
            
            if (lowerText.includes('skill') || lowerText.includes('tech') || lowerText.includes('stack')) {
                botReply = "Alex is highly skilled in JavaScript, React, Node.js, Python, PostgreSQL, and Docker. He also has a strong eye for UI/UX design using Figma.";
            } else if (lowerText.includes('project') || lowerText.includes('work')) {
                botReply = "Alex's featured projects include the Nexus AI Dashboard, Aura E-Commerce storefront, and the Nova Design System.";
            } else if (lowerText.includes('experience') || lowerText.includes('background')) {
                botReply = "Alex has over 5 years of experience, currently working as a Senior Developer at TechCorp Inc. Previously, he was a Frontend Engineer at WebStudio.";
            } else if (lowerText.includes('contact') || lowerText.includes('hire')) {
                botReply = "You can connect with Alex via the social links in the 'Let's Connect' section. He is currently available for freelance opportunities!";
            } else {
                botReply = "I can only answer questions about Alex's portfolio. You can ask me about his skills, experience, or projects.";
            }

            chatHistory.push({ role: 'bot', text: botReply });
            appendMessage('bot', botReply);
            saveHistory();
            scrollToBottom();
        }, 1500);
    }

    sendBtn.addEventListener('click', handleSend);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    });

    initChat();
});
