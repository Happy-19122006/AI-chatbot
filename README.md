# AI Chatbot with OpenAI Integration

A modern, responsive AI chatbot that integrates with OpenAI's API to provide ChatGPT-like functionality. Built for deployment on Vercel.

## Features

- 🤖 **OpenAI Integration**: Powered by OpenAI's GPT models
- 💬 **Real-time Chat**: Stream responses like ChatGPT
- 🎨 **Modern UI**: Beautiful, responsive design with space theme
- ⚡ **Fast Performance**: Optimized for Vercel serverless functions
- 🛡️ **Error Handling**: Graceful error handling and user feedback
- 📱 **Mobile Friendly**: Responsive design for all devices

## Quick Start

### 1. Get OpenAI API Key

1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Sign up or log in
3. Navigate to API Keys section
4. Create a new API key
5. Copy the key (you'll need it for deployment)

### 2. Deploy to Vercel

#### Option A: Deploy from GitHub (Recommended)

1. Fork this repository
2. Go to [Vercel](https://vercel.com/)
3. Click "New Project"
4. Import your forked repository
5. Add environment variables (see below)
6. Click "Deploy"

#### Option B: Deploy with Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variables
vercel env add OPENAI_API_KEY
```

### 3. Configure Environment Variables

In your Vercel dashboard, go to Project Settings → Environment Variables and add:

```
OPENAI_API_KEY=your_openai_api_key_here
```

## Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `OPENAI_API_KEY` | Your OpenAI API key | Yes | - |
| `DEFAULT_MODEL` | Default GPT model | No | gpt-3.5-turbo |
| `DEFAULT_TEMPERATURE` | Response creativity (0.0-2.0) | No | 0.7 |
| `DEFAULT_MAX_TOKENS` | Maximum response length | No | 1000 |

## API Endpoints

### POST `/api/chat-complete`
Non-streaming chat completion endpoint.

**Request:**
```json
{
  "messages": [
    {"role": "user", "content": "Hello!"}
  ],
  "model": "gpt-3.5-turbo",
  "temperature": 0.7,
  "max_tokens": 1000
}
```

**Response:**
```json
{
  "message": "Hello! How can I help you today?",
  "usage": {...},
  "model": "gpt-3.5-turbo",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### POST `/api/chat`
Streaming chat completion endpoint.

**Request:** Same as above
**Response:** Streaming text response

## Local Development

1. Clone the repository:
```bash
git clone <your-repo-url>
cd ai-chatbot
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env.local` file:
```
OPENAI_API_KEY=your_openai_api_key_here
```

4. Run development server:
```bash
vercel dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## Troubleshooting

### Common Issues

1. **"API key not configured" error**
   - Make sure `OPENAI_API_KEY` is set in Vercel environment variables
   - Check that the API key is valid and has credits

2. **Rate limit errors**
   - You've hit OpenAI's rate limits
   - Wait a few minutes before trying again
   - Consider upgrading your OpenAI plan

3. **Function timeout errors**
   - Increase the timeout in `vercel.json`
   - Optimize your prompts to be shorter
   - Use a faster model like `gpt-3.5-turbo`

4. **CORS errors**
   - Make sure your domain is allowed in CORS settings
   - Check that API routes are properly configured

### Performance Optimization

1. **Use streaming** for better user experience
2. **Implement caching** for repeated requests
3. **Optimize prompts** to reduce token usage
4. **Use appropriate models** (gpt-3.5-turbo for speed, gpt-4 for quality)

## Customization

### Changing the Model

Edit `script-openai.js` and modify the model parameter:

```javascript
body: JSON.stringify({
    messages: this.conversationHistory,
    model: 'gpt-4', // Change this
    temperature: 0.7,
    max_tokens: 1000
})
```

### Customizing the UI

The chatbot UI is styled in `style.css`. Key classes:
- `.chatbot-container`: Main chat container
- `.message`: Individual messages
- `.bot-message`: AI responses
- `.user-message`: User messages

### Adding Features

1. **Conversation History**: Implement localStorage for persistence
2. **File Uploads**: Add file upload capability
3. **Voice Input**: Integrate speech recognition
4. **Custom Prompts**: Add system prompts for specific use cases

## Security Considerations

1. **API Key Protection**: Never expose your API key in client-side code
2. **Rate Limiting**: Implement rate limiting to prevent abuse
3. **Input Validation**: Validate all user inputs
4. **CORS Configuration**: Properly configure CORS for your domain

## Support

If you encounter issues:

1. Check the browser console for errors
2. Check Vercel function logs
3. Verify your OpenAI API key and credits
4. Review the troubleshooting section above

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

**Made with ❤️ for the AI community**
