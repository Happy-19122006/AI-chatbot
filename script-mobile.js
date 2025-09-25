// Mobile-Optimized AI Chatbot
class MobileAIChatbot {
    constructor() {
        this.messages = [];
        this.conversationHistory = [];
        this.isTyping = false;
        this.useAPI = true;
        this.isMobile = this.detectMobile();
        
        this.initializeElements();
        this.setupEventListeners();
        this.initializeChatbot();
        this.testAPI();
        
        // Mobile-specific optimizations
        if (this.isMobile) {
            this.optimizeForMobile();
        }
    }

    detectMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
               window.innerWidth <= 768;
    }

    optimizeForMobile() {
        // Disable heavy animations on mobile
        const style = document.createElement('style');
        style.textContent = `
            @media (max-width: 768px) {
                .space-particles, .shooting-star, .nebula, .space-3d-container,
                .orbital-path, .planet, .sun, .galaxy, .black-hole, .supernova,
                .asteroid-belt, .comet {
                    display: none !important;
                }
                .stars {
                    animation: none;
                    background: #000;
                }
                .twinkling {
                    display: none;
                }
            }
        `;
        document.head.appendChild(style);
        
        // Optimize touch interactions
        document.body.style.touchAction = 'manipulation';
        document.body.style.webkitTouchCallout = 'none';
        document.body.style.webkitUserSelect = 'none';
    }

    initializeElements() {
        this.chatMessages = document.getElementById('chatMessages');
        this.messageInput = document.getElementById('messageInput');
        this.sendButton = document.getElementById('sendButton');
        this.typingIndicator = document.getElementById('typingIndicator');
        
        console.log('Mobile Elements found:', {
            chatMessages: !!this.chatMessages,
            messageInput: !!this.messageInput,
            sendButton: !!this.sendButton,
            typingIndicator: !!this.typingIndicator
        });
    }

    initializeChatbot() {
        // Add welcome message
        this.addMessage('🤖 **AI Assistant Ready!** 🤖\n\n' +
            '👋 Hello! I\'m your AI assistant. I can help you with many different topics!\n\n' +
            '✅ **What I can do:**\n' +
            '• **Math Problems**: Solve calculations like "2+2", "5*3", "10-4"\n' +
            '• **Science Questions**: Physics, chemistry, biology, earth science\n' +
            '• **Technology Help**: Computers, programming, internet, AI\n' +
            '• **Academic Subjects**: History, geography, language, literature\n' +
            '• **General Knowledge**: Current events, culture, health, wellness\n' +
            '• **Problem Solving**: Step-by-step explanations and solutions\n\n' +
            '**Examples of questions you can ask:**\n' +
            '• "2+2 kitna hota hai?" (What is 2+2?)\n' +
            '• "What is photosynthesis?"\n' +
            '• "How does the internet work?"\n' +
            '• "Explain the water cycle"\n' +
            '• "Help me with algebra"\n\n' +
            '**Ask me anything!** 💪', 'bot');
    }

    async testAPI() {
        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: [{ role: 'user', content: 'test' }],
                    model: 'gpt-3.5-turbo',
                    temperature: 0.7,
                    max_tokens: 10
                })
            });
            
            if (response.ok) {
                console.log('✅ API is working');
                this.useAPI = true;
            } else {
                console.log('❌ API not available, using fallback');
                this.useAPI = false;
            }
        } catch (error) {
            console.log('❌ API not available, using fallback');
            this.useAPI = false;
        }
    }

    setupEventListeners() {
        console.log('Setting up mobile event listeners...');
        
        if (this.sendButton) {
            this.sendButton.addEventListener('click', () => {
                this.sendMessage();
            });
            
            // Add touch feedback
            this.sendButton.addEventListener('touchstart', (e) => {
                e.target.style.transform = 'scale(0.95)';
            });
            
            this.sendButton.addEventListener('touchend', (e) => {
                e.target.style.transform = 'scale(1)';
            });
        }
        
        if (this.messageInput) {
            this.messageInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.sendMessage();
                }
            });
            
            // Mobile keyboard handling
            this.messageInput.addEventListener('focus', () => {
                setTimeout(() => {
                    this.scrollToBottom();
                }, 300);
            });
        }

        // Prevent zoom on double tap
        let lastTouchEnd = 0;
        document.addEventListener('touchend', (e) => {
            const now = (new Date()).getTime();
            if (now - lastTouchEnd <= 300) {
                e.preventDefault();
            }
            lastTouchEnd = now;
        }, false);
    }

    async sendMessage() {
        const message = this.messageInput.value.trim();
        if (!message || this.isTyping) return;

        try {
            console.log('Processing message:', message);

            // Add user message
            this.conversationHistory.push({ role: 'user', content: message });
            this.addMessage(message, 'user');
            this.messageInput.value = '';
            
            this.showTypingIndicator();

            // Try API first, then fallback
            if (this.useAPI) {
                await this.sendToAPI();
            } else {
                await this.sendLocalResponse();
            }

        } catch (error) {
            console.error('Error in sendMessage:', error);
            this.hideTypingIndicator();
            
            // Fallback to local response if API fails
            if (this.useAPI) {
                console.log('API failed, falling back to local responses');
                this.useAPI = false;
                await this.sendLocalResponse();
            } else {
                this.addMessage('I\'m having trouble connecting right now. Let me try a different approach...', 'bot');
                setTimeout(() => {
                    this.addMessage('I can still help you with basic questions! What would you like to know?', 'bot');
                }, 1000);
            }
        }
    }

    async sendToAPI() {
        try {
            console.log('Sending request to API...');
            
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    messages: this.conversationHistory,
                    model: 'gpt-3.5-turbo',
                    temperature: 0.7,
                    max_tokens: 1000
                })
            });

            console.log('Response status:', response.status);

            if (!response.ok) {
                let errorMessage = `HTTP error! status: ${response.status}`;
                try {
                    const errorData = await response.json();
                    errorMessage = errorData.error || errorMessage;
                } catch (e) {
                    console.error('Could not parse error response:', e);
                }
                throw new Error(errorMessage);
            }

            const data = await response.json();
            console.log('Received response:', data);
            
            this.hideTypingIndicator();
            
            // Add bot response
            this.conversationHistory.push({ role: 'assistant', content: data.message });
            this.addMessage(data.message, 'bot');

        } catch (error) {
            console.error('API Error:', error);
            throw error; // Re-throw to trigger fallback
        }
    }

    async sendLocalResponse() {
        // Simulate typing delay
        await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
        
        this.hideTypingIndicator();
        
        const response = this.generateLocalResponse(this.conversationHistory[this.conversationHistory.length - 1].content);
        
        // Add bot response
        this.conversationHistory.push({ role: 'assistant', content: response });
        this.addMessage(response, 'bot');
    }

    generateLocalResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        // Math problems - Check this FIRST before other checks
        if (this.isMathExpression(message)) {
            return this.solveMathExpression(message);
        }
        
        // Check for math-related words in Hindi/Urdu
        if (lowerMessage.includes('kitna') || lowerMessage.includes('कितना') || 
            lowerMessage.includes('hota') || lowerMessage.includes('होता') ||
            lowerMessage.includes('calculate') || lowerMessage.includes('math') || 
            lowerMessage.includes('solve') || lowerMessage.includes('गणना') ||
            lowerMessage.includes('जोड़') || lowerMessage.includes('घटाना') ||
            lowerMessage.includes('गुणा') || lowerMessage.includes('भाग')) {
            
            // Try to extract numbers from the message
            const numbers = message.match(/\d+/g);
            if (numbers && numbers.length >= 2) {
                // Try to find operators
                if (message.includes('+') || lowerMessage.includes('plus') || lowerMessage.includes('जोड़') || lowerMessage.includes('add')) {
                    return this.solveMathExpression(`${numbers[0]}+${numbers[1]}`);
                } else if (message.includes('-') || lowerMessage.includes('minus') || lowerMessage.includes('घटाना') || lowerMessage.includes('subtract')) {
                    return this.solveMathExpression(`${numbers[0]}-${numbers[1]}`);
                } else if (message.includes('*') || lowerMessage.includes('times') || lowerMessage.includes('multiply') || lowerMessage.includes('गुणा')) {
                    return this.solveMathExpression(`${numbers[0]}*${numbers[1]}`);
                } else if (message.includes('/') || lowerMessage.includes('divide') || lowerMessage.includes('भाग')) {
                    return this.solveMathExpression(`${numbers[0]}/${numbers[1]}`);
                } else {
                    // Default to addition if no operator found
                    return this.solveMathExpression(`${numbers[0]}+${numbers[1]}`);
                }
            }
            
            return "मैं गणित की समस्याओं में आपकी मदद कर सकता हूं! कृपया कोई विशिष्ट गणना या समीकरण दें जिसे मैं हल कर सकूं।\n\nI can help with math problems! Please provide a specific calculation or equation.";
        }
        
        // Greetings
        if (lowerMessage.includes('hi') || lowerMessage.includes('hello') || lowerMessage.includes('hey')) {
            return "Hello! 👋 How can I help you today?";
        }
        
        if (lowerMessage.includes('good morning')) {
            return "Good morning! ☀️ I hope you're having a wonderful day. What can I assist you with?";
        }
        
        if (lowerMessage.includes('good afternoon')) {
            return "Good afternoon! 🌞 How can I help you this afternoon?";
        }
        
        if (lowerMessage.includes('good evening')) {
            return "Good evening! 🌙 What brings you here this evening?";
        }
        
        // How are you
        if (lowerMessage.includes('how are you')) {
            return "I'm doing great, thank you for asking! I'm here and ready to help you with anything you need. How are you doing?";
        }
        
        // Coding questions
        if (lowerMessage.includes('code') || lowerMessage.includes('programming') || lowerMessage.includes('javascript') || lowerMessage.includes('python')) {
            return "I can help with coding questions! What programming language or specific problem would you like assistance with?";
        }
        
        // Science questions
        if (lowerMessage.includes('science') || lowerMessage.includes('biology') || lowerMessage.includes('chemistry') || lowerMessage.includes('physics')) {
            return "Science is fascinating! 🔬 I can help explain scientific concepts. What specific area of science interests you?";
        }
        
        // Thank you
        if (lowerMessage.includes('thank you') || lowerMessage.includes('thanks')) {
            return "You're very welcome! 😊 I'm glad I could help. Is there anything else you'd like to know or discuss?";
        }
        
        // Handle general questions and provide helpful responses
        return this.handleGeneralQuestion(message);
    }

    // Check if the message contains a mathematical expression
    isMathExpression(message) {
        const mathPattern = /^\s*\d+\s*[\+\-\*\/]\s*\d+\s*$/;
        const complexPattern = /^\s*\d+\s*[\+\-\*\/\(\)\.\s]+\s*\d*\s*$/;
        
        if (mathPattern.test(message.trim()) || complexPattern.test(message.trim())) {
            return true;
        }
        
        // Check for patterns like "2+2 kitna hota hai" or "2+2 कितना होता है"
        const hindiMathPattern = /\d+\s*[\+\-\*\/]\s*\d+\s*(kitna|hota|कितना|होता|equals|is)/i;
        if (hindiMathPattern.test(message)) {
            return true;
        }
        
        const lowerMessage = message.toLowerCase();
        if ((lowerMessage.includes('plus') || lowerMessage.includes('add') || 
             lowerMessage.includes('minus') || lowerMessage.includes('subtract') ||
             lowerMessage.includes('times') || lowerMessage.includes('multiply') ||
             lowerMessage.includes('divide') || lowerMessage.includes('equals') ||
             lowerMessage.includes('kitna') || lowerMessage.includes('hota')) && 
            /\d/.test(message)) {
            return true;
        }
        
        return false;
    }

    // Solve mathematical expressions
    solveMathExpression(message) {
        try {
            let expression = message.trim();
            
            // Extract math expression from Hindi/Urdu questions like "2+2 kitna hota hai"
            const mathMatch = expression.match(/(\d+\s*[\+\-\*\/]\s*\d+)/);
            if (mathMatch) {
                expression = mathMatch[1];
            }
            
            // Replace common words with operators
            expression = expression.replace(/\bplus\b/gi, '+');
            expression = expression.replace(/\badd\b/gi, '+');
            expression = expression.replace(/\bminus\b/gi, '-');
            expression = expression.replace(/\bsubtract\b/gi, '-');
            expression = expression.replace(/\btimes\b/gi, '*');
            expression = expression.replace(/\bmultiply\b/gi, '*');
            expression = expression.replace(/\bdivide\b/gi, '/');
            expression = expression.replace(/\bequals\b/gi, '=');
            
            // Clean up the expression
            expression = expression.replace(/\s+/g, '');
            
            // If it's an equation, extract just the left side
            if (expression.includes('=')) {
                expression = expression.split('=')[0];
            }
            
            // Validate expression
            if (!/^[\d\+\-\*\/\(\)\.\s]+$/.test(expression)) {
                throw new Error('Invalid characters in expression');
            }
            
            // Evaluate the expression safely
            const result = this.safeEvaluate(expression);
            
            if (isNaN(result)) {
                throw new Error('Invalid mathematical expression');
            }
            
            // Provide response in both English and Hindi/Urdu
            return `**Math Solution:** 🔢\n\n**Expression:** ${expression}\n**Result:** **${result}**\n\n**Answer:** ${result} (${this.numberToWords(result)})`;
            
        } catch (error) {
            console.error('Math evaluation error:', error);
            return `I can see you're asking about math! 🔢 However, I couldn't solve "${message}". Could you try rephrasing it? For example:\n\n• "2 + 2"\n• "5 * 3"\n• "10 - 4"\n• "8 / 2"`;
        }
    }
    
    // Convert numbers to words for better understanding
    numberToWords(num) {
        const words = {
            0: 'zero', 1: 'one', 2: 'two', 3: 'three', 4: 'four', 5: 'five',
            6: 'six', 7: 'seven', 8: 'eight', 9: 'nine', 10: 'ten',
            11: 'eleven', 12: 'twelve', 13: 'thirteen', 14: 'fourteen', 15: 'fifteen',
            16: 'sixteen', 17: 'seventeen', 18: 'eighteen', 19: 'nineteen', 20: 'twenty'
        };
        
        if (words[num]) {
            return words[num];
        } else if (num < 100) {
            const tens = Math.floor(num / 10);
            const ones = num % 10;
            return `${words[tens * 10] || tens + 'ty'}${ones ? '-' + words[ones] : ''}`;
        } else {
            return num.toString();
        }
    }

    // Handle general questions with comprehensive responses
    handleGeneralQuestion(message) {
        const lowerMessage = message.toLowerCase();
        
        // Science questions
        if (lowerMessage.includes('science') || lowerMessage.includes('physics') || lowerMessage.includes('chemistry') || lowerMessage.includes('biology')) {
            return "🔬 **Science Topics I Can Help With:**\n\n• **Physics**: Force, motion, energy, light, sound\n• **Chemistry**: Elements, compounds, reactions, periodic table\n• **Biology**: Cells, plants, animals, human body\n• **Earth Science**: Weather, climate, geology\n\nWhat specific science topic interests you?";
        }
        
        // Technology questions
        if (lowerMessage.includes('computer') || lowerMessage.includes('technology') || lowerMessage.includes('internet') || lowerMessage.includes('ai')) {
            return "💻 **Technology Topics I Can Help With:**\n\n• **Computers**: Hardware, software, programming\n• **Internet**: How it works, websites, online safety\n• **AI & Machine Learning**: Artificial intelligence basics\n• **Mobile Technology**: Smartphones, apps, mobile networks\n\nWhat technology topic would you like to know about?";
        }
        
        // History questions
        if (lowerMessage.includes('history') || lowerMessage.includes('historical') || lowerMessage.includes('ancient') || lowerMessage.includes('war')) {
            return "📚 **History Topics I Can Help With:**\n\n• **Ancient History**: Egypt, Greece, Rome, India\n• **World Wars**: Causes, events, consequences\n• **Indian History**: Independence, freedom fighters\n• **World History**: Major events and civilizations\n\nWhat historical period or event interests you?";
        }
        
        // Geography questions
        if (lowerMessage.includes('country') || lowerMessage.includes('city') || lowerMessage.includes('world') || lowerMessage.includes('earth') || lowerMessage.includes('geography')) {
            return "🌍 **Geography Topics I Can Help With:**\n\n• **Countries**: Capitals, populations, cultures\n• **Continents**: Features, climate, wildlife\n• **Oceans & Seas**: Names, locations, characteristics\n• **Mountains & Rivers**: World's highest peaks, longest rivers\n\nWhat geographical feature or place interests you?";
        }
        
        // Language questions
        if (lowerMessage.includes('language') || lowerMessage.includes('english') || lowerMessage.includes('grammar') || lowerMessage.includes('vocabulary')) {
            return "📖 **Language Topics I Can Help With:**\n\n• **English Grammar**: Tenses, parts of speech, sentence structure\n• **Vocabulary**: Word meanings, synonyms, antonyms\n• **Writing**: Essays, letters, creative writing\n• **Reading**: Comprehension, literature analysis\n\nWhat language topic would you like help with?";
        }
        
        // Health questions
        if (lowerMessage.includes('health') || lowerMessage.includes('body') || lowerMessage.includes('disease') || lowerMessage.includes('medicine')) {
            return "🏥 **Health Topics I Can Help With:**\n\n• **Human Body**: Organs, systems, functions\n• **Nutrition**: Healthy eating, vitamins, minerals\n• **Exercise**: Physical fitness, sports, activities\n• **Mental Health**: Stress management, emotions\n\nWhat health topic interests you?";
        }
        
        // What is questions
        if (lowerMessage.startsWith('what is') || lowerMessage.startsWith('what are') || lowerMessage.startsWith('what does')) {
            const subject = message.replace(/what is|what are|what does/gi, '').trim();
            return this.getDetailedExplanation(subject);
        }
        
        // How questions
        if (lowerMessage.startsWith('how') || lowerMessage.includes('how do') || lowerMessage.includes('how does')) {
            return "That's a great 'how' question! 🤔 I'd be happy to explain the process step by step. Could you provide a bit more detail about what specifically you'd like to know how to do?\n\nI can help explain:\n• How things work\n• How to solve problems\n• How to do tasks\n• How processes happen";
        }
        
        // Why questions
        if (lowerMessage.startsWith('why') || lowerMessage.includes('why do') || lowerMessage.includes('why does')) {
            return "Excellent 'why' question! 🤔 I'd love to explain the reasoning behind that. Could you tell me more about what specific 'why' you're curious about?\n\nI can help explain:\n• Why things happen\n• Why things work the way they do\n• Why certain decisions are made\n• Why processes occur";
        }
        
        // Default comprehensive response
        return `That's an interesting question! 🤔 I'd love to help you with that. Here's what I can assist you with:\n\n**📚 Academic Subjects:**\n• **Mathematics**: Algebra, geometry, calculus, statistics\n• **Science**: Physics, chemistry, biology, earth science\n• **Language Arts**: Grammar, literature, writing\n• **Social Studies**: History, geography, civics\n\n**💻 Technology & Skills:**\n• **Programming**: JavaScript, Python, web development\n• **Computer Science**: Algorithms, data structures\n• **Digital Skills**: Internet, software, online tools\n\n**🌍 General Knowledge:**\n• **Current Events**: News, world affairs\n• **Culture**: Art, music, literature\n• **Health & Wellness**: Nutrition, exercise, mental health\n\n**Ask me anything specific!** For example:\n• "What is photosynthesis?"\n• "How does the internet work?"\n• "Explain the water cycle"\n• "Help me with algebra"`;
    }

    // Get detailed explanations for common topics
    getDetailedExplanation(topic) {
        const lowerTopic = topic.toLowerCase().trim();
        
        // Water
        if (lowerTopic === 'water') {
            return `**Water** 💧\n\nWater is one of the most essential substances on Earth!\n\n**What is water?**\n• Chemical formula: H₂O (2 hydrogen atoms + 1 oxygen atom)\n• A transparent, tasteless, odorless liquid\n• Essential for all known forms of life\n\n**Properties of water:**\n• Freezes at 0°C (32°F)\n• Boils at 100°C (212°F)\n• Universal solvent - dissolves many substances\n• Has surface tension\n• Expands when frozen (unlike most liquids)\n\n**Why is water important?**\n• Makes up 60-70% of human body\n• Required for all biological processes\n• Covers 71% of Earth's surface\n• Essential for agriculture and industry\n\n**Fun facts:**\n• Water can exist in three states: liquid, solid (ice), and gas (steam)\n• Only 3% of Earth's water is fresh water\n• The human brain is about 75% water\n\nWould you like to know more about water's role in nature, the water cycle, or something specific about water?`;
        }
        
        // Computer
        if (lowerTopic === 'computer') {
            return `**Computer** 💻\n\nComputers are incredible machines that process information!\n\n**What is a computer?**\n• An electronic device that processes data\n• Follows instructions (programs) to perform tasks\n• Can store, retrieve, and process information\n\n**Types of computers:**\n• **Desktop**: For home and office use\n• **Laptop**: Portable computers\n• **Tablet**: Touch-screen devices\n• **Smartphone**: Pocket-sized computers\n• **Server**: Powerful computers for networks\n\n**How computers work:**\n• **Input**: Keyboard, mouse, touch screen\n• **Processing**: CPU (Central Processing Unit)\n• **Storage**: RAM (temporary) and hard drive (permanent)\n• **Output**: Screen, speakers, printer\n\n**Computer components:**\n• **CPU**: The "brain" that processes instructions\n• **RAM**: Temporary memory for running programs\n• **Hard Drive**: Permanent storage for files\n• **Motherboard**: Connects all components\n• **Graphics Card**: Handles visual processing\n\n**Fun facts:**\n• First computers were room-sized machines\n• Modern smartphones are more powerful than early supercomputers\n• Computers use binary code (1s and 0s)\n• The internet connects billions of computers worldwide\n\nWould you like to know about computer programming, how the internet works, or computer history?`;
        }
        
        // Default for unknown topics
        return `Great question about "${topic}"! 🤔 I'd be happy to explain that. Let me give you a comprehensive answer:\n\n**${topic}** is an interesting topic! While I have detailed knowledge about many subjects like water, computers, science, math, and technology, I'd need to know more about what specific aspect of "${topic}" you're curious about.\n\n**I can provide detailed explanations about:**\n• Water, fire, air, earth (basic elements)\n• Computers and technology 💻\n• Science and mathematics 🔬\n• History and geography 🌍\n• Language and literature 📚\n• Health and wellness 🏥\n\nCould you ask me about one of these topics, or tell me more specifically what you'd like to know about "${topic}"?`;
    }

    // Safely evaluate mathematical expressions
    safeEvaluate(expression) {
        try {
            if (expression.includes('/0')) {
                throw new Error('Division by zero');
            }
            
            const func = new Function('return ' + expression);
            return func();
        } catch (error) {
            throw new Error('Invalid expression');
        }
    }

    addMessage(content, sender) {
        const messageElement = this.createMessageElement(content, sender);
        this.chatMessages.appendChild(messageElement);
        this.scrollToBottom();
    }

    createMessageElement(content, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;

        const avatarDiv = document.createElement('div');
        avatarDiv.className = 'message-avatar';
        
        if (sender === 'bot') {
            avatarDiv.innerHTML = '<i class="fas fa-robot"></i>';
        } else {
            avatarDiv.innerHTML = '<i class="fas fa-user"></i>';
        }

        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        
        const textP = document.createElement('p');
        textP.textContent = content;
        
        const timeSpan = document.createElement('span');
        timeSpan.className = 'message-time';
        timeSpan.textContent = this.getCurrentTime();

        contentDiv.appendChild(textP);
        contentDiv.appendChild(timeSpan);

        messageDiv.appendChild(avatarDiv);
        messageDiv.appendChild(contentDiv);

        return messageDiv;
    }

    showTypingIndicator() {
        this.isTyping = true;
        this.typingIndicator.style.display = 'flex';
        this.scrollToBottom();
    }

    hideTypingIndicator() {
        this.isTyping = false;
        this.typingIndicator.style.display = 'none';
    }

    scrollToBottom() {
        setTimeout(() => {
            this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
        }, 100);
    }

    getCurrentTime() {
        const now = new Date();
        return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
}

// Initialize the mobile chatbot when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new MobileAIChatbot();
});
