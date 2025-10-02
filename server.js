const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files (frontend)
app.use(express.static(path.join(__dirname)));

// Parse JSON bodies
app.use(express.json());

// Example chat endpoint (replace with your AI logic)
app.post('/api/chat', (req, res) => {
    const userMessage = req.body.message;
        // Expanded academic and general knowledge base
        const knowledgeBase = {
            'hi': 'Hello! 👋 How can I help you today?',
            'hello': 'Hi there! How can I assist you?',
            'what can you do': "I can assist you with academic subjects, answer questions, and provide information.",
            'who are you': "I'm an AI chatbot designed to help with academic and general questions.",
            'mathematics': 'I can help with algebra, geometry, calculus, statistics, and arithmetic. Ask me about formulas, concepts, or problem solving.',
            'what is pi': 'Pi (π) is a mathematical constant approximately equal to 3.14159. It represents the ratio of a circle’s circumference to its diameter.',
            'what is the pythagorean theorem': 'The Pythagorean theorem states that in a right triangle, a² + b² = c², where c is the hypotenuse.',
            'science': 'I can help with physics, chemistry, biology, and earth science. Ask me about laws, theories, or scientific facts.',
            'what is photosynthesis': 'Photosynthesis is the process by which green plants use sunlight to convert water and carbon dioxide into food (glucose) and oxygen.',
            'what is gravity': 'Gravity is a force that attracts two bodies toward each other. On Earth, it gives weight to physical objects.',
            'language arts': 'I can help with grammar, literature, writing, and reading comprehension. Ask me about literary devices, famous authors, or grammar rules.',
            'what is a noun': 'A noun is a word that names a person, place, thing, or idea.',
            'who wrote romeo and juliet': 'Romeo and Juliet was written by William Shakespeare.',
            'social studies': 'I can help with history, geography, civics, and economics. Ask me about historical events, countries, or government systems.',
            'who was the first president of the usa': 'The first president of the United States was George Washington.',
            'what is democracy': 'Democracy is a system of government where citizens exercise power by voting.',
            'technology': 'I can answer questions about computers, programming, and the internet. Ask me about coding languages, hardware, or software.',
            'what is a computer': 'A computer is an electronic device that processes data and performs tasks according to instructions.',
            'what is javascript': 'JavaScript is a programming language commonly used to create interactive effects within web browsers.',
            'general knowledge': 'Ask me about famous people, places, inventions, or world facts.',
            'who invented the telephone': 'The telephone was invented by Alexander Graham Bell.',
            'what is the capital of france': 'The capital of France is Paris.',
            'thank you': 'You’re welcome! If you have more questions, just ask.',
            'bye': 'Goodbye! Have a great day!'
        };
        let aiResponse = knowledgeBase[userMessage?.toLowerCase()];
        if (!aiResponse) {
            aiResponse = "I'm sorry, I don't have an answer for that. Please ask about academic subjects, general knowledge, or say 'what can you do'.";
        }
        res.json({ response: aiResponse });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
