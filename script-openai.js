// OpenAI-Integrated AI Chatbot
class OpenAIChatbot {
    constructor() {
        this.messages = [];
        this.conversationHistory = [];
        this.isTyping = false;
        this.currentStream = null;
        
        this.initializeElements();
        this.setupEventListeners();
        this.initializeChatbot();
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
        // Add welcome message
        this.addMessage('🎯 **AI Chatbot Ready!** 🎯\n\n' +
            '👋 Hello! I\'m your AI assistant powered by OpenAI.\n\n' +
            '✅ **What I can do:**\n' +
            '• Answer questions and have conversations\n' +
            '• Help with coding and technical problems\n' +
            '• Provide explanations and tutorials\n' +
            '• Solve mathematical problems\n' +
            '• Assist with creative writing\n' +
            '• And much more!\n\n' +
            '**Ask me anything!** 💪', 'bot');
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

            // Send to OpenAI API
            await this.sendToOpenAI();

        } catch (error) {
            console.error('Error in sendMessage:', error);
            this.hideTypingIndicator();
            this.addMessage('I encountered an error while processing your message. Please try again.', 'bot');
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
            this.hideTypingIndicator();
            
            let errorMessage = 'I encountered an error while processing your request. ';
            
            if (error.message.includes('Rate limit')) {
                errorMessage += 'Please wait a moment and try again.';
            } else if (error.message.includes('API key')) {
                errorMessage += 'There\'s a configuration issue. Please contact support.';
            } else if (error.message.includes('timeout')) {
                errorMessage += 'The request timed out. Please try again.';
            } else if (error.message.includes('quota')) {
                errorMessage += 'API quota exceeded. Please check billing.';
            } else {
                errorMessage += 'Please try again.';
            }
            
            this.addMessage(errorMessage, 'bot');
        }
    }

    async sendToOpenAIStream() {
        try {
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

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
            }

            this.hideTypingIndicator();
            
            // Create a new message element for streaming
            const messageElement = this.createMessageElement('', 'bot');
            this.chatMessages.appendChild(messageElement);
            this.scrollToBottom();

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let fullResponse = '';

            while (true) {
                const { done, value } = await reader.read();
                
                if (done) break;
                
                const chunk = decoder.decode(value);
                fullResponse += chunk;
                
                // Update the message content
                const messageContent = messageElement.querySelector('.message-content p');
                messageContent.textContent = fullResponse;
                this.scrollToBottom();
            }

            // Add bot response to conversation
            this.conversationHistory.push({ role: 'assistant', content: fullResponse });

        } catch (error) {
            console.error('OpenAI Stream Error:', error);
            this.hideTypingIndicator();
            
            let errorMessage = 'I encountered an error while processing your request. ';
            
            if (error.message.includes('Rate limit')) {
                errorMessage += 'Please wait a moment and try again.';
            } else if (error.message.includes('API key')) {
                errorMessage += 'There\'s a configuration issue. Please contact support.';
            } else if (error.message.includes('timeout')) {
                errorMessage += 'The request timed out. Please try again.';
            } else {
                errorMessage += 'Please try again.';
            }
            
            this.addMessage(errorMessage, 'bot');
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

    // Utility method to clear conversation
    clearConversation() {
        this.conversationHistory = [];
        this.chatMessages.innerHTML = '';
        this.initializeChatbot();
    }

    // Utility method to export conversation
    exportConversation() {
        const dataStr = JSON.stringify(this.conversationHistory, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `conversation-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        URL.revokeObjectURL(url);
    }
}

// Initialize the chatbot when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new OpenAIChatbot();
});
