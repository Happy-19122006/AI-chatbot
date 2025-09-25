// Simple API endpoint for mobile chatbot
export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { messages } = req.body;

    // Validate input
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Messages array is required' });
    }

    // Get the last user message
    const lastMessage = messages[messages.length - 1];
    const userMessage = lastMessage.content.toLowerCase();

    // Simple response logic for common questions
    let response = '';

    // Math questions
    if (userMessage.includes('2+2') || userMessage.includes('kitna') || userMessage.includes('hota')) {
      response = '2 + 2 = 4\n\n**Answer:** 4 (four)\n\nI can help you with more math problems! Just ask me any calculation.';
    }
    // Greetings
    else if (userMessage.includes('hello') || userMessage.includes('hi') || userMessage.includes('hey')) {
      response = 'Hello! 👋 How can I help you today? I can assist with math problems, answer questions, and have conversations!';
    }
    // How are you
    else if (userMessage.includes('how are you')) {
      response = 'I\'m doing great, thank you for asking! I\'m here and ready to help you with anything you need. How are you doing?';
    }
    // Math help
    else if (userMessage.includes('math') || userMessage.includes('calculate') || userMessage.includes('solve')) {
      response = 'I\'d be happy to help with math problems! Please provide the specific calculation or equation you\'d like me to solve. For example: "2+2", "5*3", "10-4", etc.';
    }
    // Default response
    else {
      response = 'That\'s an interesting question! 🤔 I\'d love to help you with that. I can provide information about:\n\n• **Math & Problem Solving** 🔢\n• **Science & Technology** 🔬\n• **Programming & Coding** 💻\n• **General Knowledge** 📚\n\nCould you tell me more about what specifically you\'d like to know?';
    }

    const responseData = {
      message: response,
      usage: { total_tokens: 50 },
      model: 'simple-chatbot',
      timestamp: new Date().toISOString()
    };

    console.log('Response generated successfully');
    return res.status(200).json(responseData);

  } catch (error) {
    console.error('API Error:', error);
    
    return res.status(500).json({ 
      error: 'An error occurred while processing your request. Please try again.',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}
