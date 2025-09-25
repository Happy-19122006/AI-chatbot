// Fallback AI Chatbot with Local Responses
class FallbackChatbot {
    constructor() {
        this.messages = [];
        this.conversationHistory = [];
        this.isTyping = false;
        this.useAPI = true; // Try API first, fallback to local responses
        
        this.initializeElements();
        this.setupEventListeners();
        this.initializeChatbot();
        this.testAPI();
    }

    initializeElements() {
        this.chatMessages = document.getElementById('chatMessages');
        this.messageInput = document.getElementById('messageInput');
        this.sendButton = document.getElementById('sendButton');
        this.typingIndicator = document.getElementById('typingIndicator');
        
        console.log('Elements found:', {
            chatMessages: !!this.chatMessages,
            messageInput: !!this.messageInput,
            sendButton: !!this.sendButton,
            typingIndicator: !!this.typingIndicator
        });
    }

    initializeChatbot() {
        // Add welcome message with clear academic focus
        this.addMessage('🎓 **Academic AI Assistant Ready!** 🎓\n\n' +
            '👋 Hello! I\'m your specialized academic assistant.\n\n' +
            '📚 **My Expertise:**\n' +
            '• **Mathematics** (Algebra, Geometry, Calculus, Statistics)\n' +
            '• **Science** (Physics, Chemistry, Biology, Earth Science)\n' +
            '• **Language Arts** (Grammar, Literature, Writing)\n' +
            '• **Social Studies** (History, Geography, Civics)\n' +
            '• **Problem Solving** (Step-by-step solutions)\n\n' +
            '🎯 **How I Help:**\n' +
            '• Provide accurate, educational explanations\n' +
            '• Solve problems with detailed steps\n' +
            '• Offer study tips and learning strategies\n' +
            '• Answer academic questions comprehensively\n\n' +
            '**Ask me any academic question!** 📖', 'bot');
            
        // Initialize academic knowledge base
        this.initializeAcademicKnowledge();
    }
    
    initializeAcademicKnowledge() {
        // Curated academic knowledge base
        this.academicKnowledge = {
            mathematics: {
                algebra: {
                    topics: ['linear equations', 'quadratic equations', 'polynomials', 'factoring'],
                    formulas: {
                        'quadratic formula': 'x = (-b ± √(b²-4ac)) / 2a',
                        'slope formula': 'm = (y₂-y₁)/(x₂-x₁)',
                        'distance formula': 'd = √((x₂-x₁)² + (y₂-y₁)²)'
                    }
                },
                geometry: {
                    topics: ['triangles', 'circles', 'polygons', 'coordinate geometry'],
                    formulas: {
                        'area of triangle': 'A = (1/2) × base × height',
                        'area of circle': 'A = πr²',
                        'circumference': 'C = 2πr',
                        'pythagorean theorem': 'a² + b² = c²'
                    }
                },
                calculus: {
                    topics: ['derivatives', 'integrals', 'limits', 'applications'],
                    formulas: {
                        'power rule': 'd/dx(xⁿ) = nxⁿ⁻¹',
                        'chain rule': 'd/dx(f(g(x))) = f\'(g(x)) × g\'(x)',
                        'product rule': 'd/dx(fg) = f\'g + fg\''
                    }
                }
            },
            science: {
                physics: {
                    topics: ['mechanics', 'thermodynamics', 'waves', 'electricity'],
                    formulas: {
                        'newton second law': 'F = ma',
                        'kinetic energy': 'KE = (1/2)mv²',
                        'potential energy': 'PE = mgh',
                        'wave equation': 'v = fλ'
                    }
                },
                chemistry: {
                    topics: ['atomic structure', 'chemical bonding', 'reactions', 'stoichiometry'],
                    formulas: {
                        'ideal gas law': 'PV = nRT',
                        'molarity': 'M = n/V',
                        'percent composition': '% = (mass of element/mass of compound) × 100'
                    }
                },
                biology: {
                    topics: ['cell biology', 'genetics', 'evolution', 'ecology'],
                    concepts: {
                        'photosynthesis': '6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂',
                        'cellular respiration': 'C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + ATP',
                        'dna structure': 'Double helix with base pairs A-T, G-C'
                    }
                }
            },
            literature: {
                genres: ['poetry', 'prose', 'drama', 'non-fiction'],
                elements: ['plot', 'character', 'setting', 'theme', 'symbolism'],
                devices: ['metaphor', 'simile', 'alliteration', 'personification', 'irony']
            }
        };
        
        // Study strategies database
        this.studyStrategies = {
            mathematics: [
                "Practice problems daily - start with easier ones and gradually increase difficulty",
                "Show all your work step-by-step to identify where you make mistakes",
                "Create formula sheets for quick reference during practice",
                "Use the Feynman technique - explain concepts in simple terms"
            ],
            science: [
                "Make concept maps to visualize relationships between ideas",
                "Use the scientific method to approach problems systematically",
                "Connect theory to real-world applications and examples",
                "Practice with diagrams and visual representations"
            ],
            literature: [
                "Read actively - take notes on themes, symbols, and character development",
                "Analyze the author's use of literary devices and their effects",
                "Connect the text to historical and cultural context",
                "Practice writing thesis statements and supporting arguments"
            ],
            general: [
                "Use spaced repetition for memorization - review at increasing intervals",
                "Create study groups to discuss and explain concepts to others",
                "Take breaks every 25-30 minutes to maintain focus",
                "Use multiple senses - read, write, say, and visualize information"
            ]
        };
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
                console.log('✅ OpenAI API is working');
                this.useAPI = true;
            } else {
                console.log('❌ OpenAI API not available, using fallback responses');
                this.useAPI = false;
            }
        } catch (error) {
            console.log('❌ OpenAI API not available, using fallback responses');
            this.useAPI = false;
        }
    }

    setupEventListeners() {
        console.log('Setting up event listeners...');
        
        if (this.sendButton) {
            this.sendButton.addEventListener('click', () => {
                console.log('Send button clicked');
                this.sendMessage();
            });
        } else {
            console.error('Send button not found!');
        }
        
        if (this.messageInput) {
            this.messageInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    console.log('Enter key pressed');
                    this.sendMessage();
                }
            });
        } else {
            console.error('Message input not found!');
        }

        // Add floating animation to input on focus
        if (this.messageInput) {
            this.messageInput.addEventListener('focus', () => {
                this.messageInput.style.transform = 'translateY(-2px)';
                this.messageInput.style.boxShadow = '0 0 25px rgba(100, 150, 255, 0.3)';
            });

            this.messageInput.addEventListener('blur', () => {
                this.messageInput.style.transform = 'translateY(0)';
                this.messageInput.style.boxShadow = '0 0 20px rgba(100, 150, 255, 0.2)';
            });
        }
    }

    async sendMessage() {
        const message = this.messageInput.value.trim();
        if (!message || this.isTyping) return;

        try {
            console.log('Processing message:', message);

            // Add user message to conversation
            this.conversationHistory.push({ role: 'user', content: message });
            this.addMessage(message, 'user');
            this.messageInput.value = '';
            
            this.showTypingIndicator();

            // Try API first, then fallback
            if (this.useAPI) {
                await this.sendToOpenAI();
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
                this.addMessage('I encountered an error while processing your message. Please try again.', 'bot');
            }
        }
    }

    async sendToOpenAI() {
        try {
            console.log('Sending request to OpenAI API...');
            
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
            
            // Add bot response to conversation
            this.conversationHistory.push({ role: 'assistant', content: data.message });
            this.addMessage(data.message, 'bot');

        } catch (error) {
            console.error('OpenAI API Error:', error);
            throw error; // Re-throw to trigger fallback
        }
    }

    async sendLocalResponse() {
        // Simulate typing delay
        await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
        
        this.hideTypingIndicator();
        
        const response = this.generateLocalResponse(this.conversationHistory[this.conversationHistory.length - 1].content);
        
        // Add bot response to conversation
        this.conversationHistory.push({ role: 'assistant', content: response });
        this.addMessage(response, 'bot');
    }

    generateLocalResponse(message) {
        const lowerMessage = message.toLowerCase();
        
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
        
        // Animals and Biology
        if (lowerMessage.includes('animal') || lowerMessage.includes('animals') || lowerMessage.includes('kon hote hai')) {
            return "Animals are living organisms that are part of the kingdom Animalia! 🐾\n\n**Key characteristics of animals:**\n• They are multicellular\n• They can move and respond to their environment\n• They need to eat other organisms for energy\n• They reproduce sexually\n\n**Examples include:**\n• Mammals (dogs, cats, humans)\n• Birds (eagles, sparrows)\n• Fish (salmon, goldfish)\n• Reptiles (snakes, lizards)\n• Insects (butterflies, ants)\n\nWould you like to know about a specific type of animal?";
        }
        
        if (lowerMessage.includes('dog') || lowerMessage.includes('puppy')) {
            return "Dogs are amazing animals! 🐕\n\n**About dogs:**\n• They are mammals and carnivores\n• Domesticated from wolves thousands of years ago\n• Known as 'man's best friend'\n• Come in many breeds and sizes\n• Are very loyal and intelligent\n• Can be trained to do many tasks\n\nDogs make wonderful pets and companions!";
        }
        
        if (lowerMessage.includes('cat') || lowerMessage.includes('kitten')) {
            return "Cats are fascinating animals! 🐱\n\n**About cats:**\n• They are mammals and carnivores\n• Very independent and agile\n• Excellent hunters with sharp claws\n• Can see well in the dark\n• Make purring sounds when happy\n• Come in many breeds and colors\n\nCats are popular pets around the world!";
        }
        
        // Math problems and calculations
        if (this.isMathExpression(message)) {
            return this.solveMathExpression(message);
        }
        
        if (lowerMessage.includes('calculate') || lowerMessage.includes('math') || lowerMessage.includes('solve')) {
            return "I'd be happy to help with math problems! Please provide the specific calculation or equation you'd like me to solve.";
        }
        
        // Coding questions
        if (lowerMessage.includes('code') || lowerMessage.includes('programming') || lowerMessage.includes('javascript') || lowerMessage.includes('python')) {
            return "I can help with coding questions! What programming language or specific problem would you like assistance with?";
        }
        
        // Science questions
        if (lowerMessage.includes('science') || lowerMessage.includes('biology') || lowerMessage.includes('chemistry') || lowerMessage.includes('physics')) {
            return "Science is fascinating! 🔬 I can help explain scientific concepts. What specific area of science interests you - biology, chemistry, physics, or something else?";
        }
        
        // Geography questions
        if (lowerMessage.includes('country') || lowerMessage.includes('city') || lowerMessage.includes('world') || lowerMessage.includes('earth')) {
            return "I love geography! 🌍 Our world has so many amazing places to explore. What country, city, or geographic feature would you like to learn about?";
        }
        
        // History questions
        if (lowerMessage.includes('history') || lowerMessage.includes('historical') || lowerMessage.includes('ancient') || lowerMessage.includes('war')) {
            return "History is full of fascinating stories! 📚 What historical period, event, or person would you like to know about?";
        }
        
        // What is questions with detailed explanations
        if (lowerMessage.startsWith('what is') || lowerMessage.startsWith('what are')) {
            const subject = message.replace(/what is|what are/gi, '').trim();
            return this.getDetailedExplanation(subject);
        }
        
        // Handle follow-up responses like "yes", "more", "elaborate"
        if (lowerMessage === 'yes' || lowerMessage === 'more' || lowerMessage === 'elaborate' || lowerMessage === 'tell me more') {
            return this.handleFollowUpRequest();
        }
        
        // How questions
        if (lowerMessage.startsWith('how') || lowerMessage.includes('how do') || lowerMessage.includes('how does')) {
            return "That's a great 'how' question! I'd be happy to explain the process step by step. Could you provide a bit more detail about what specifically you'd like to know how to do?";
        }
        
        // Why questions
        if (lowerMessage.startsWith('why') || lowerMessage.includes('why do') || lowerMessage.includes('why does')) {
            return "Excellent 'why' question! I'd love to explain the reasoning behind that. Could you tell me more about what specific 'why' you're curious about?";
        }
        
        // Academic Help and Study Strategies
        if (lowerMessage.includes('study tips') || lowerMessage.includes('how to study') || lowerMessage.includes('study strategy')) {
            return this.getStudyStrategies(lowerMessage);
        }
        
        if (lowerMessage.includes('formula') || lowerMessage.includes('equation')) {
            return this.getAcademicFormula(lowerMessage);
        }
        
        if (lowerMessage.includes('help') || lowerMessage.includes('academic help')) {
            return "🎓 **Academic Help Available!**\n\nI can assist with:\n\n• **Mathematics**: Algebra, Geometry, Calculus, Statistics\n• **Science**: Physics, Chemistry, Biology, Earth Science\n• **Language Arts**: Grammar, Literature, Writing\n• **Social Studies**: History, Geography, Civics\n• **Study Strategies**: Tips for effective learning\n• **Problem Solving**: Step-by-step solutions\n\n**Ask me:**\n• 'study tips for math'\n• 'explain photosynthesis'\n• 'solve 2x + 5 = 13'\n• 'what is the quadratic formula'\n\nWhat academic topic would you like help with?";
        }
        
        // Thank you
        if (lowerMessage.includes('thank you') || lowerMessage.includes('thanks')) {
            return "You're very welcome! 😊 I'm glad I could help. Is there anything else you'd like to know or discuss?";
        }
        
        // Weather
        if (lowerMessage.includes('weather') || lowerMessage.includes('rain') || lowerMessage.includes('sunny')) {
            return "Weather is always changing! ☀️🌧️ I can explain weather patterns, seasons, or climate. What aspect of weather interests you?";
        }
        
        // Food
        if (lowerMessage.includes('food') || lowerMessage.includes('eat') || lowerMessage.includes('cooking') || lowerMessage.includes('recipe')) {
            return "Food is delicious! 🍕 I can help with recipes, cooking tips, or information about different cuisines. What would you like to know about food?";
        }
        
        // Sports
        if (lowerMessage.includes('sport') || lowerMessage.includes('football') || lowerMessage.includes('basketball') || lowerMessage.includes('cricket')) {
            return "Sports are exciting! ⚽ I can tell you about different sports, rules, famous athletes, or teams. What sport interests you?";
        }
        
        // Music
        if (lowerMessage.includes('music') || lowerMessage.includes('song') || lowerMessage.includes('sing') || lowerMessage.includes('instrument')) {
            return "Music is wonderful! 🎵 I can discuss different genres, instruments, famous musicians, or music theory. What aspect of music interests you?";
        }
        
        // Books
        if (lowerMessage.includes('book') || lowerMessage.includes('read') || lowerMessage.includes('story') || lowerMessage.includes('novel')) {
            return "Books are magical! 📚 I can recommend books, discuss literature, or help with reading comprehension. What kind of books do you enjoy?";
        }
        
        // Technology
        if (lowerMessage.includes('computer') || lowerMessage.includes('phone') || lowerMessage.includes('internet') || lowerMessage.includes('ai')) {
            return "Technology is fascinating! 💻 I can explain how computers work, discuss AI, or help with tech questions. What technology topic interests you?";
        }
        
        // Time and Date
        if (lowerMessage.includes('time') || lowerMessage.includes('date') || lowerMessage.includes('what time') || lowerMessage.includes('what date')) {
            const now = new Date();
            const timeString = now.toLocaleTimeString();
            const dateString = now.toLocaleDateString();
            return `**Current Time & Date:** 🕐\n\n**Time:** ${timeString}\n**Date:** ${dateString}\n\nIs there anything specific about time or dates you'd like to know?`;
        }
        
        // Quick Facts
        if (lowerMessage.includes('fact') || lowerMessage.includes('interesting') || lowerMessage.includes('fun fact')) {
            const facts = [
                "**Fun Fact:** 🐙 Octopuses have three hearts and blue blood!",
                "**Fun Fact:** 🌍 Earth is the only planet in our solar system not named after a god!",
                "**Fun Fact:** 🦒 A giraffe's tongue can be up to 20 inches long!",
                "**Fun Fact:** 🐝 Honey never spoils - archaeologists have found edible honey in ancient Egyptian tombs!",
                "**Fun Fact:** 🦋 Butterflies taste with their feet!",
                "**Fun Fact:** 🐨 Koalas sleep 18-22 hours per day!",
                "**Fun Fact:** 🌙 The Moon is moving away from Earth at about 1.5 inches per year!",
                "**Fun Fact:** 🐧 Penguins can jump as high as 6 feet in the air!"
            ];
            return facts[Math.floor(Math.random() * facts.length)];
        }
        
        // Jokes
        if (lowerMessage.includes('joke') || lowerMessage.includes('funny') || lowerMessage.includes('laugh')) {
            const jokes = [
                "**Joke:** 😄 Why don't scientists trust atoms? Because they make up everything!",
                "**Joke:** 😄 What do you call a fake noodle? An impasta!",
                "**Joke:** 😄 Why did the scarecrow win an award? He was outstanding in his field!",
                "**Joke:** 😄 What do you call a bear with no teeth? A gummy bear!",
                "**Joke:** 😄 Why don't eggs tell jokes? They'd crack each other up!",
                "**Joke:** 😄 What do you call a dinosaur that crashes his car? Tyrannosaurus Wrecks!"
            ];
            return jokes[Math.floor(Math.random() * jokes.length)];
        }
        
        // Definitions
        if (lowerMessage.startsWith('define') || lowerMessage.startsWith('what does') || lowerMessage.startsWith('meaning of')) {
            const word = message.replace(/define|what does|meaning of/gi, '').trim();
            return `I'd be happy to define "${word}" for you! However, I need to know the specific word you'd like defined. Could you ask me to define a particular word? For example:\n\n• "define computer"\n• "what does 'photosynthesis' mean"\n• "meaning of democracy"`;
        }
        
        // Default response with more helpful suggestions
        return "That's an interesting question! 🤔 I'd love to help you with that. I can provide information about:\n\n• **Animals & Nature** 🐾\n• **Science & Technology** 🔬\n• **History & Geography** 🌍\n• **Math & Problem Solving** 🔢\n• **Language & Literature** 📚\n• **Sports & Entertainment** ⚽\n\nCould you tell me more about what specifically you'd like to know? I'm here to help explain and provide detailed information!";
    }

    // Check if the message contains a mathematical expression
    isMathExpression(message) {
        // Check for basic arithmetic expressions
        const mathPattern = /^\s*\d+\s*[\+\-\*\/]\s*\d+\s*$/;
        const complexPattern = /^\s*\d+\s*[\+\-\*\/\(\)\.\s]+\s*\d*\s*$/;
        const equationPattern = /^\s*\d*\s*[\+\-\*\/\(\)\.\s\d]+\s*=\s*\d*\s*$/;
        
        // Check for simple expressions like "2+2", "5*3", "10-4", "8/2"
        if (mathPattern.test(message.trim())) {
            return true;
        }
        
        // Check for more complex expressions
        if (complexPattern.test(message.trim())) {
            return true;
        }
        
        // Check for equations
        if (equationPattern.test(message.trim())) {
            return true;
        }
        
        // Check for common math keywords with numbers
        const lowerMessage = message.toLowerCase();
        if ((lowerMessage.includes('plus') || lowerMessage.includes('add') || 
             lowerMessage.includes('minus') || lowerMessage.includes('subtract') ||
             lowerMessage.includes('times') || lowerMessage.includes('multiply') ||
             lowerMessage.includes('divide') || lowerMessage.includes('equals')) && 
            /\d/.test(message)) {
            return true;
        }
        
        return false;
    }

    // Solve mathematical expressions
    solveMathExpression(message) {
        try {
            let expression = message.trim();
            
            // Replace common words with operators
            expression = expression.replace(/\bplus\b/gi, '+');
            expression = expression.replace(/\badd\b/gi, '+');
            expression = expression.replace(/\bminus\b/gi, '-');
            expression = expression.replace(/\bsubtract\b/gi, '-');
            expression = expression.replace(/\btimes\b/gi, '*');
            expression = expression.replace(/\bmultiply\b/gi, '*');
            expression = expression.replace(/\bdivide\b/gi, '/');
            expression = expression.replace(/\bequals\b/gi, '=');
            
            // Clean up the expression (remove extra spaces, handle = signs)
            expression = expression.replace(/\s+/g, '');
            
            // If it's an equation, extract just the left side
            if (expression.includes('=')) {
                expression = expression.split('=')[0];
            }
            
            // Validate expression contains only numbers and operators
            if (!/^[\d\+\-\*\/\(\)\.\s]+$/.test(expression)) {
                throw new Error('Invalid characters in expression');
            }
            
            // Evaluate the expression safely
            const result = this.safeEvaluate(expression);
            
            if (isNaN(result)) {
                throw new Error('Invalid mathematical expression');
            }
            
            return `**Math Solution:** 🔢\n\n**Expression:** ${message}\n**Result:** **${result}**\n\n**Step-by-step:**\n${this.getMathSteps(expression, result)}`;
            
        } catch (error) {
            console.error('Math evaluation error:', error);
            return `I can see you're asking about math! 🔢 However, I couldn't solve "${message}". Could you try rephrasing it? For example:\n\n• "2 + 2"\n• "5 * 3"\n• "10 - 4"\n• "8 / 2"\n\nI can solve basic arithmetic expressions!`;
        }
    }

    // Safely evaluate mathematical expressions
    safeEvaluate(expression) {
        try {
            // Replace division by zero checks
            if (expression.includes('/0')) {
                throw new Error('Division by zero');
            }
            
            // Use Function constructor for safe evaluation
            const func = new Function('return ' + expression);
            return func();
        } catch (error) {
            throw new Error('Invalid expression');
        }
    }

    // Generate step-by-step solution for math problems
    getMathSteps(expression, result) {
        const steps = [];
        
        // Handle parentheses first
        if (expression.includes('(')) {
            steps.push('1. Solve expressions in parentheses first');
        }
        
        // Handle multiplication and division
        if (expression.includes('*') || expression.includes('/')) {
            steps.push('2. Perform multiplication and division from left to right');
        }
        
        // Handle addition and subtraction
        if (expression.includes('+') || expression.includes('-')) {
            steps.push('3. Perform addition and subtraction from left to right');
        }
        
        steps.push(`4. Final result: ${result}`);
        
        return steps.join('\n');
    }

    // Get detailed explanations for common topics
    getDetailedExplanation(topic) {
        const lowerTopic = topic.toLowerCase().trim();
        
        // Water
        if (lowerTopic === 'water') {
            return `**Water** 💧\n\nWater is one of the most essential substances on Earth! Here's what you should know:\n\n**What is water?**\n• Chemical formula: H₂O (2 hydrogen atoms + 1 oxygen atom)\n• A transparent, tasteless, odorless liquid\n• Essential for all known forms of life\n\n**Properties of water:**\n• Freezes at 0°C (32°F)\n• Boils at 100°C (212°F)\n• Universal solvent - dissolves many substances\n• Has surface tension\n• Expands when frozen (unlike most liquids)\n\n**Why is water important?**\n• Makes up 60-70% of human body\n• Required for all biological processes\n• Covers 71% of Earth's surface\n• Essential for agriculture and industry\n\n**Fun facts:**\n• Water can exist in three states: liquid, solid (ice), and gas (steam)\n• Only 3% of Earth's water is fresh water\n• The human brain is about 75% water\n\nWould you like to know more about water's role in nature, the water cycle, or something specific about water?`;
        }
        
        // Fire
        if (lowerTopic === 'fire') {
            return `**Fire** 🔥\n\nFire is a fascinating chemical reaction! Here's the science behind it:\n\n**What is fire?**\n• A rapid oxidation process (burning)\n• Requires three elements: fuel, heat, and oxygen\n• Produces heat, light, and various gases\n\n**The Fire Triangle:**\n• **Fuel**: Wood, paper, gas, etc.\n• **Heat**: Temperature high enough to ignite\n• **Oxygen**: From the air around us\n\n**How fire works:**\n• Heat breaks down fuel molecules\n• Oxygen combines with fuel molecules\n• This creates new molecules and releases energy\n• The energy appears as heat and light\n\n**Fire safety:**\n• Never play with fire\n• Keep flammable materials away from heat sources\n• Know how to use fire extinguishers\n• Have smoke detectors in your home\n\n**Fun facts:**\n• Fire can reach temperatures over 1,000°C\n• Different fuels create different colored flames\n• Fire has been used by humans for over 1 million years\n\nWould you like to know about fire safety, the chemistry of fire, or how to build a campfire safely?`;
        }
        
        // Air
        if (lowerTopic === 'air') {
            return `**Air** 💨\n\nAir is the invisible mixture of gases that surrounds our planet!\n\n**What is air?**\n• A mixture of gases that make up Earth's atmosphere\n• Invisible but essential for life\n• Has weight and takes up space\n\n**Composition of air:**\n• **Nitrogen**: 78% (most abundant)\n• **Oxygen**: 21% (what we breathe)\n• **Other gases**: 1% (argon, carbon dioxide, water vapor, etc.)\n\n**Properties of air:**\n• Has pressure (air pressure)\n• Can be compressed and expanded\n• Gets thinner at higher altitudes\n• Conducts sound waves\n\n**Why is air important?**\n• Essential for breathing (oxygen)\n• Protects Earth from harmful radiation\n• Helps regulate temperature\n• Allows weather to happen\n• Enables flight for birds and airplanes\n\n**Fun facts:**\n• Air pressure at sea level is about 14.7 pounds per square inch\n• The atmosphere extends about 300 miles above Earth\n• Without air, there would be no sound\n• Air can hold water vapor, creating humidity\n\nWould you like to know about air pressure, the atmosphere, or how breathing works?`;
        }
        
        // Earth
        if (lowerTopic === 'earth') {
            return `**Earth** 🌍\n\nEarth is our amazing home planet! Here's what makes it special:\n\n**What is Earth?**\n• The third planet from the Sun\n• The only known planet with life\n• Made of rock, metal, water, and air\n\n**Earth's structure:**\n• **Crust**: Thin outer layer (5-70 km thick)\n• **Mantle**: Hot, flowing rock layer\n• **Outer Core**: Liquid metal\n• **Inner Core**: Solid metal center\n\n**Earth's features:**\n• **Surface**: 71% water, 29% land\n• **Atmosphere**: Protects us from space\n• **Magnetic field**: Protects from solar radiation\n• **Gravity**: Keeps everything grounded\n\n**Why Earth is special:**\n• Perfect distance from Sun for liquid water\n• Strong magnetic field for protection\n• Stable climate for life\n• Rich in oxygen for breathing\n• Diverse ecosystems\n\n**Fun facts:**\n• Earth is about 4.5 billion years old\n• Travels around Sun at 67,000 mph\n• Rotates once every 24 hours\n• Has one natural satellite: the Moon\n• Home to over 8 million species\n\nWould you like to know about Earth's layers, the water cycle, or how Earth formed?`;
        }
        
        // Computer
        if (lowerTopic === 'computer') {
            return `**Computer** 💻\n\nComputers are incredible machines that process information!\n\n**What is a computer?**\n• An electronic device that processes data\n• Follows instructions (programs) to perform tasks\n• Can store, retrieve, and process information\n\n**Types of computers:**\n• **Desktop**: For home and office use\n• **Laptop**: Portable computers\n• **Tablet**: Touch-screen devices\n• **Smartphone**: Pocket-sized computers\n• **Server**: Powerful computers for networks\n\n**How computers work:**\n• **Input**: Keyboard, mouse, touch screen\n• **Processing**: CPU (Central Processing Unit)\n• **Storage**: RAM (temporary) and hard drive (permanent)\n• **Output**: Screen, speakers, printer\n\n**Computer components:**\n• **CPU**: The "brain" that processes instructions\n• **RAM**: Temporary memory for running programs\n• **Hard Drive**: Permanent storage for files\n• **Motherboard**: Connects all components\n• **Graphics Card**: Handles visual processing\n\n**Fun facts:**\n• First computers were room-sized machines\n• Modern smartphones are more powerful than early supercomputers\n• Computers use binary code (1s and 0s)\n• The internet connects billions of computers worldwide\n\nWould you like to know about computer programming, how the internet works, or computer history?`;
        }
        
        // Default for unknown topics
        return `Great question about "${topic}"! 🤔 I'd be happy to explain that. Let me give you a comprehensive answer:\n\n**${topic}** is an interesting topic! While I have detailed knowledge about many subjects like water, fire, air, earth, computers, animals, and science, I'd need to know more about what specific aspect of "${topic}" you're curious about.\n\n**I can provide detailed explanations about:**\n• Water, fire, air, earth (basic elements)\n• Animals and nature 🐾\n• Science and technology 🔬\n• Math and calculations 🔢\n• History and geography 🌍\n• Computers and programming 💻\n\nCould you ask me about one of these topics, or tell me more specifically what you'd like to know about "${topic}"?`;
    }

    // Handle follow-up requests
    handleFollowUpRequest() {
        // Get the last user message before "yes" to understand context
        const lastUserMessage = this.conversationHistory[this.conversationHistory.length - 2];
        if (lastUserMessage && lastUserMessage.role === 'user') {
            const lastMessage = lastUserMessage.content.toLowerCase();
            
            // If they were asking about water
            if (lastMessage.includes('water')) {
                return `**More about Water** 💧\n\n**The Water Cycle:**\n• **Evaporation**: Water turns to vapor and rises\n• **Condensation**: Vapor forms clouds\n• **Precipitation**: Rain, snow, hail fall to Earth\n• **Collection**: Water gathers in rivers, lakes, oceans\n\n**Water in the Human Body:**\n• Regulates body temperature\n• Transports nutrients and oxygen\n• Removes waste products\n• Lubricates joints\n• Protects organs and tissues\n\n**Water Conservation Tips:**\n• Turn off taps when not using\n• Fix leaky faucets\n• Take shorter showers\n• Use water-efficient appliances\n• Collect rainwater for plants\n\n**Interesting Water Facts:**\n• A person can survive weeks without food but only days without water\n• Water is the only substance that naturally exists in three states on Earth\n• Hot water freezes faster than cold water (Mpemba effect)\n• Water molecules are attracted to each other (cohesion)\n\nWould you like to know about water pollution, the ocean, or something else about water?`;
            }
            
            // If they were asking about any other topic
            return `I'd be happy to provide more details! 🌟 However, I want to make sure I give you the most helpful information. Could you tell me:\n\n• What specific aspect interests you most?\n• What would you like to know more about?\n• Are you looking for examples, facts, or practical applications?\n\nI can provide detailed information about:\n• **Science topics** (water, fire, air, earth, chemistry, physics)\n• **Animals and nature** (characteristics, habitats, behaviors)\n• **Technology** (computers, programming, internet)\n• **Math** (calculations, formulas, problem-solving)\n• **History and geography** (events, places, cultures)\n\nWhat would you like to explore further?`;
        }
        
        // Generic follow-up response
        return `I'm here to help with more information! 📚 What specific topic would you like to know more about? I can provide detailed explanations on many subjects. Just let me know what interests you!`;
    }

    // Get study strategies for specific subjects
    getStudyStrategies(message) {
        if (message.includes('math')) {
            return `📚 **Study Tips for Mathematics:**\n\n${this.studyStrategies.mathematics.map((tip, index) => `${index + 1}. ${tip}`).join('\n')}\n\n**Additional Tips:**\n• Work on problems until you can do them without looking at examples\n• Review previous chapters regularly to maintain knowledge\n• Join study groups to discuss challenging problems\n• Ask questions when you don't understand - there are no stupid questions!`;
        } else if (message.includes('science')) {
            return `🔬 **Study Tips for Science:**\n\n${this.studyStrategies.science.map((tip, index) => `${index + 1}. ${tip}`).join('\n')}\n\n**Additional Tips:**\n• Understand the 'why' behind formulas, not just memorize them\n• Use flashcards for vocabulary and key concepts\n• Practice drawing diagrams and labeling parts\n• Connect scientific concepts to everyday experiences`;
        } else if (message.includes('literature') || message.includes('english')) {
            return `📖 **Study Tips for Literature:**\n\n${this.studyStrategies.literature.map((tip, index) => `${index + 1}. ${tip}`).join('\n')}\n\n**Additional Tips:**\n• Keep a reading journal to track your thoughts and questions\n• Practice writing analytical paragraphs about themes\n• Learn to identify literary devices and their effects\n• Discuss texts with others to gain different perspectives`;
        } else {
            return `🎯 **General Study Strategies:**\n\n${this.studyStrategies.general.map((tip, index) => `${index + 1}. ${tip}`).join('\n')}\n\n**Subject-Specific Tips:**\n• Ask for 'study tips for math' for mathematics strategies\n• Ask for 'study tips for science' for science strategies\n• Ask for 'study tips for literature' for literature strategies\n\nWhat subject would you like specific study tips for?`;
        }
    }

    // Get academic formulas and equations
    getAcademicFormula(message) {
        const lowerMessage = message.toLowerCase();
        
        // Math formulas
        if (lowerMessage.includes('quadratic')) {
            return `📐 **Quadratic Formula:**\n\n**Formula:** x = (-b ± √(b²-4ac)) / 2a\n\n**When to use:** For solving quadratic equations in the form ax² + bx + c = 0\n\n**Example:** Solve x² - 5x + 6 = 0\n• a = 1, b = -5, c = 6\n• x = (5 ± √(25-24)) / 2\n• x = (5 ± 1) / 2\n• x = 3 or x = 2\n\n**Remember:** The discriminant (b²-4ac) tells you about the nature of solutions!`;
        }
        
        if (lowerMessage.includes('pythagorean')) {
            return `📐 **Pythagorean Theorem:**\n\n**Formula:** a² + b² = c²\n\n**When to use:** For right triangles where c is the hypotenuse\n\n**Example:** Find hypotenuse if legs are 3 and 4\n• a² + b² = c²\n• 3² + 4² = c²\n• 9 + 16 = c²\n• 25 = c²\n• c = 5\n\n**Remember:** This only works for right triangles!`;
        }
        
        if (lowerMessage.includes('slope')) {
            return `📈 **Slope Formula:**\n\n**Formula:** m = (y₂-y₁)/(x₂-x₁)\n\n**When to use:** To find the slope of a line given two points\n\n**Example:** Find slope of line through (2,3) and (5,9)\n• m = (9-3)/(5-2)\n• m = 6/3\n• m = 2\n\n**Remember:** Slope represents the rate of change!`;
        }
        
        // Physics formulas
        if (lowerMessage.includes('newton') || lowerMessage.includes('force')) {
            return `⚡ **Newton's Second Law:**\n\n**Formula:** F = ma\n\n**Where:**\n• F = Force (Newtons)\n• m = Mass (kg)\n• a = Acceleration (m/s²)\n\n**Example:** What force is needed to accelerate a 5kg object at 3m/s²?\n• F = ma\n• F = (5kg)(3m/s²)\n• F = 15 N\n\n**Remember:** Force causes acceleration!`;
        }
        
        if (lowerMessage.includes('kinetic energy')) {
            return `⚡ **Kinetic Energy Formula:**\n\n**Formula:** KE = (1/2)mv²\n\n**Where:**\n• KE = Kinetic Energy (Joules)\n• m = Mass (kg)\n• v = Velocity (m/s)\n\n**Example:** Find KE of a 2kg object moving at 4m/s\n• KE = (1/2)(2)(4)²\n• KE = (1/2)(2)(16)\n• KE = 16 J\n\n**Remember:** Kinetic energy increases with velocity squared!`;
        }
        
        // Chemistry formulas
        if (lowerMessage.includes('ideal gas') || lowerMessage.includes('gas law')) {
            return `🧪 **Ideal Gas Law:**\n\n**Formula:** PV = nRT\n\n**Where:**\n• P = Pressure (atm)\n• V = Volume (L)\n• n = Moles\n• R = Gas constant (0.0821 L·atm/mol·K)\n• T = Temperature (K)\n\n**Example:** Find volume of 2 moles of gas at 1 atm and 300K\n• PV = nRT\n• (1)V = (2)(0.0821)(300)\n• V = 49.26 L\n\n**Remember:** Temperature must be in Kelvin!`;
        }
        
        // Default response
        return `📚 **Academic Formulas Available:**\n\n**Mathematics:**\n• Ask for 'quadratic formula'\n• Ask for 'pythagorean theorem'\n• Ask for 'slope formula'\n\n**Physics:**\n• Ask for 'newton second law'\n• Ask for 'kinetic energy formula'\n\n**Chemistry:**\n• Ask for 'ideal gas law'\n\n**Biology:**\n• Ask for 'photosynthesis equation'\n\nWhat specific formula would you like to learn about?`;
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

// Initialize the chatbot when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new FallbackChatbot();
});
