// js/chatbot.js

const API_KEY = ""; // Leave empty for enhanced demo mode, or add Gemini API key

const portfolioData = {
    name: "Omar Elhoseny",
    role: "Full-Stack Developer & UI/UX Enthusiast",
    skills: "My skills include JavaScript, React, Node.js, Python, PostgreSQL, and Docker.",
    projects: "I have worked on several projects including Nexus AI Dashboard, Aura E-Commerce, and Nova Design System.",
    experience: "I am currently a Senior Developer at TechCorp Inc. Previously, I worked as a Frontend Engineer at WebStudio and a UI Designer at CreativeG.",
    education: "I hold a BSc in Computer Science from the University of Technology, and certifications in AWS and Advanced React Patterns.",
    contact: "You can reach me at omar@example.com or download my CV from the page."
};

function getDemoResponse(message) {
    const lowerMsg = message.toLowerCase();
    if (lowerMsg.includes("skill") || lowerMsg.includes("tech") || lowerMsg.includes("stack")) return portfolioData.skills;
    if (lowerMsg.includes("project") || lowerMsg.includes("work") || lowerMsg.includes("portfolio")) return portfolioData.projects;
    if (lowerMsg.includes("experience") || lowerMsg.includes("job") || lowerMsg.includes("work")) return portfolioData.experience;
    if (lowerMsg.includes("education") || lowerMsg.includes("degree") || lowerMsg.includes("study") || lowerMsg.includes("cert")) return portfolioData.education;
    if (lowerMsg.includes("contact") || lowerMsg.includes("email") || lowerMsg.includes("hire") || lowerMsg.includes("reach")) return portfolioData.contact;
    if (lowerMsg.includes("name") || lowerMsg.includes("who are you")) return `I am ${portfolioData.name}, a ${portfolioData.role}.`;
    
    return "I can only answer questions about this portfolio, try asking about my skills or projects!";
}

document.addEventListener('DOMContentLoaded', () => {
    const chatToggle = document.getElementById('chatbot-toggle');
    const chatWindow = document.getElementById('chatbot-window');
    const closeChat = document.getElementById('close-chat');
    const chatMessages = document.getElementById('chat-messages');
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-btn');
    const loadingIndicator = document.getElementById('chat-loading');

    // Load history safely
    let chatHistory = [];
    try {
        const stored = localStorage.getItem('chatHistory');
        if (stored) {
            chatHistory = JSON.parse(stored);
            if (!Array.isArray(chatHistory)) chatHistory = [];
        }
    } catch (e) {
        console.error("Failed to parse chat history", e);
        chatHistory = [];
    }

    function saveHistory() {
        localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
    }

    function appendMessage(text, sender, save = true) {
        const msgDiv = document.createElement('div');
        msgDiv.classList.add('msg');
        msgDiv.classList.add(sender);
        msgDiv.textContent = text;
        
        // Insert before loading indicator
        chatMessages.insertBefore(msgDiv, loadingIndicator);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        if (save) {
            chatHistory.push({ text, sender });
            saveHistory();
        }
    }

    function renderHistory() {
        // Clear current messages except loading
        const msgs = chatMessages.querySelectorAll('.msg');
        msgs.forEach(m => m.remove());

        if (chatHistory.length === 0) {
            // Initial greeting
            appendMessage("HI, how can i help you?", 'bot', true);
        } else {
            chatHistory.forEach(msg => {
                appendMessage(msg.text, msg.sender, false);
            });
        }
    }

    renderHistory();

    chatToggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        chatWindow.classList.toggle('hidden');
        if (!chatWindow.classList.contains('hidden')) {
            chatInput.focus();
        }
    });

    closeChat.addEventListener('click', () => {
        chatWindow.classList.add('hidden');
    });

    async function handleSend() {
        const text = chatInput.value.trim();
        if (!text) return;

        // User message
        appendMessage(text, 'user');
        chatInput.value = '';
        
        // Show loading
        loadingIndicator.classList.remove('hidden');
        chatMessages.scrollTop = chatMessages.scrollHeight;

        if (API_KEY) {
            // Real Gemini API Call
            try {
                const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: [{ parts: [{ text: `You are a helpful portfolio assistant for ${portfolioData.name}. Answer the following: ${text}` }] }]
                    })
                });
                const data = await response.json();
                const botReply = data.candidates[0].content.parts[0].text;
                
                loadingIndicator.classList.add('hidden');
                appendMessage(botReply, 'bot');
            } catch (error) {
                console.error("Gemini API Error:", error);
                loadingIndicator.classList.add('hidden');
                appendMessage("Sorry, I encountered an error connecting to the API.", 'bot');
            }
        } else {
            // Enhanced Demo Mode
            setTimeout(() => {
                const botReply = getDemoResponse(text);
                loadingIndicator.classList.add('hidden');
                appendMessage(botReply, 'bot');
            }, 1000);
        }
    }

    sendBtn.addEventListener('click', handleSend);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSend();
    });
});
