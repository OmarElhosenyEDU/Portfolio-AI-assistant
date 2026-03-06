// js/chatbot.js

document.addEventListener('DOMContentLoaded', () => {
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotWindow = document.getElementById('chatbot-window');
    const closeChat = document.getElementById('close-chat');
    const chatMessages = document.getElementById('chat-messages');
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-btn');
    const chatLoading = document.getElementById('chat-loading');

    // Insert your Gemini API Key here
    const API_KEY = ''; 

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

        if (!API_KEY) {
            // Fallback to demo version if API key is missing
            setTimeout(() => {
                chatLoading.classList.add('hidden');
                
                const lowerText = text.toLowerCase();
                let botReply = "";
                
                // Greetings
                if (/^(hi|hello|hey|greetings|good morning|good afternoon)/.test(lowerText)) {
                    const greetings = ["Hello there! How can I help you today?", "Hi! What would you like to know about Alex?", "Greetings! I'm Alex's AI assistant. Ask me anything!"];
                    botReply = greetings[Math.floor(Math.random() * greetings.length)];
                } 
                // About the bot
                else if (lowerText.includes('who are you') || lowerText.includes('what are you') || lowerText.includes('your name') || lowerText.includes('are you ai') || lowerText.includes('are you human')) {
                    botReply = "I'm a demo AI assistant built specifically for Alex's portfolio. I'm here to answer your questions about his work, skills, and experience!";
                }
                // Capabilities
                else if (lowerText.includes('what can you do') || lowerText.includes('help')) {
                    botReply = "I can tell you about Alex's tech stack, his past projects, his work experience, and how to contact him. Just ask!";
                }
                // Education
                else if (lowerText.includes('education') || lowerText.includes('degree') || lowerText.includes('university') || lowerText.includes('college') || lowerText.includes('study')) {
                    botReply = "Alex holds a BSc in Computer Science from the University of Technology (2014 - 2018).";
                }
                // Location / Personal
                else if (lowerText.includes('where') && (lowerText.includes('live') || lowerText.includes('from') || lowerText.includes('located'))) {
                    botReply = "Alex is available for remote work globally, but you can reach out via his social links to discuss specific locations or relocation.";
                }
                // Hobbies
                else if (lowerText.includes('hobby') || lowerText.includes('hobbies') || lowerText.includes('free time') || lowerText.includes('fun')) {
                    botReply = "When he's not coding, Alex loves exploring new UI/UX trends, contributing to open-source, and learning about machine learning.";
                }
                // Jokes
                else if (lowerText.includes('joke') || lowerText.includes('funny') || lowerText.includes('laugh')) {
                    const jokes = [
                        "Why do programmers prefer dark mode? Because light attracts bugs!",
                        "How many programmers does it take to change a light bulb? None, that's a hardware problem.",
                        "I would tell you a UDP joke, but you might not get it."
                    ];
                    botReply = jokes[Math.floor(Math.random() * jokes.length)];
                }
                // Tech definitions (generic)
                else if (lowerText.includes('what is react')) {
                    botReply = "React is a popular JavaScript library for building user interfaces, and it's one of Alex's core skills!";
                }
                else if (lowerText.includes('what is javascript') || lowerText.includes('what is js')) {
                    botReply = "JavaScript is the programming language of the web. Alex uses it extensively for both frontend and backend development.";
                }
                // Farewell
                else if (lowerText.includes('bye') || lowerText.includes('goodbye') || lowerText.includes('see ya') || lowerText.includes('exit')) {
                    botReply = "Goodbye! Feel free to reach out to Alex via LinkedIn or GitHub. Have a great day!";
                }
                // Existing portfolio queries
                else if (lowerText.includes('skill') || lowerText.includes('tech') || lowerText.includes('stack') || lowerText.includes('language')) {
                    botReply = "Alex is highly skilled in JavaScript, React, Node.js, Python, PostgreSQL, and Docker. He also has a strong eye for UI/UX design using Figma.";
                } else if (lowerText.includes('project') || lowerText.includes('work') || lowerText.includes('portfolio')) {
                    botReply = "Alex's featured projects include the Nexus AI Dashboard, Aura E-Commerce storefront, and the Nova Design System.";
                } else if (lowerText.includes('experience') || lowerText.includes('background') || lowerText.includes('job') || lowerText.includes('resume')) {
                    botReply = "Alex has over 5 years of experience, currently working as a Senior Developer at TechCorp Inc. Previously, he was a Frontend Engineer at WebStudio.";
                } else if (lowerText.includes('contact') || lowerText.includes('hire') || lowerText.includes('email') || lowerText.includes('reach')) {
                    botReply = "You can connect with Alex via the social links in the 'Let's Connect' section. He is currently available for freelance opportunities!";
                } 
                // Catch-all
                else {
                    const fallbacks = [
                        "That's an interesting question! While I'm just a demo bot, I can tell you all about Alex's skills, projects, and experience.",
                        "I might not know the answer to that, but I do know Alex is a fantastic Full-Stack Developer. Want to hear about his projects?",
                        "I'm currently running in demo mode without an API key, so my knowledge is limited to Alex's portfolio. Ask me about his tech stack!",
                        "Hmm, I'm not sure about that. But did you know Alex built the Nexus AI Dashboard? Ask me about his work!"
                    ];
                    botReply = fallbacks[Math.floor(Math.random() * fallbacks.length)];
                }

                chatHistory.push({ role: 'bot', text: botReply });
                appendMessage('bot', botReply);
                saveHistory();
                scrollToBottom();
            }, 1000);
            return;
        }

        // Prepare the payload for Gemini API
        // Map our history roles to Gemini roles ('user' and 'model')
        const contents = chatHistory
            .filter(msg => msg.role === 'user' || msg.role === 'bot')
            .map(msg => ({
                role: msg.role === 'bot' ? 'model' : 'user',
                parts: [{ text: msg.text }]
            }));

        const apiPayload = {
            contents: contents,
            systemInstruction: {
                role: "system",
                parts: [{ text: systemInstruction }]
            }
        };

        try {
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(apiPayload)
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            
            let botReply = "Sorry, I couldn't process that.";
            if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts[0]) {
                botReply = data.candidates[0].content.parts[0].text;
            }
            
            // Handle the response
            chatHistory.push({ role: 'bot', text: botReply });
            appendMessage('bot', botReply);
            saveHistory();
        } catch (error) {
            console.error("API Error:", error);
            const errorMsg = "Sorry, I'm having trouble connecting right now. Please try again later.";
            chatHistory.push({ role: 'bot', text: errorMsg });
            appendMessage('bot', errorMsg);
            saveHistory();
        } finally {
            chatLoading.classList.add('hidden');
            scrollToBottom();
        }
    }

    sendBtn.addEventListener('click', handleSend);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    });

    initChat();
});
