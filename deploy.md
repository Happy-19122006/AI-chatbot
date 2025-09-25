# Deployment Guide for Vercel

## Step-by-Step Deployment Instructions

### 1. Prepare Your Files

Make sure you have these files in your project:
- `index.html` (updated to use script-openai.js)
- `script-openai.js` (new OpenAI-integrated frontend)
- `style.css` (existing styles)
- `api/chat.js` (streaming endpoint)
- `api/chat-complete.js` (non-streaming endpoint)
- `vercel.json` (Vercel configuration)
- `package.json` (dependencies)
- `env.template` (environment variables template)

### 2. Get OpenAI API Key

1. Visit [OpenAI Platform](https://platform.openai.com/)
2. Sign up or log in to your account
3. Navigate to "API Keys" in the left sidebar
4. Click "Create new secret key"
5. Copy the key (starts with `sk-`)
6. **Important**: Save this key securely - you won't be able to see it again

### 3. Deploy to Vercel

#### Method 1: GitHub + Vercel (Recommended)

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Add OpenAI integration"
   git push origin main
   ```

2. **Deploy on Vercel:**
   - Go to [vercel.com](https://vercel.com/)
   - Click "New Project"
   - Import your GitHub repository
   - Click "Deploy"

3. **Add Environment Variables:**
   - Go to your project dashboard on Vercel
   - Click "Settings" → "Environment Variables"
   - Add: `OPENAI_API_KEY` = `your_actual_api_key`
   - Click "Save"

4. **Redeploy:**
   - Go to "Deployments" tab
   - Click "Redeploy" on the latest deployment

#### Method 2: Vercel CLI

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   vercel
   ```

4. **Add Environment Variables:**
   ```bash
   vercel env add OPENAI_API_KEY
   # Paste your API key when prompted
   ```

5. **Redeploy:**
   ```bash
   vercel --prod
   ```

### 4. Test Your Deployment

1. Visit your Vercel URL
2. Try sending a message like "Hello!"
3. Check the browser console for any errors
4. Verify the response comes from OpenAI

### 5. Troubleshooting

#### If you get "API key not configured":
- Check that `OPENAI_API_KEY` is set in Vercel environment variables
- Make sure you redeployed after adding the environment variable
- Verify the API key is correct and has credits

#### If you get rate limit errors:
- Check your OpenAI usage limits
- Consider upgrading your OpenAI plan
- Add rate limiting to your API

#### If responses are slow or timeout:
- Check Vercel function logs
- Increase timeout in `vercel.json`
- Use a faster model like `gpt-3.5-turbo`

#### If you get CORS errors:
- Check that your domain is properly configured
- Verify API routes are working
- Check browser network tab for failed requests

### 6. Environment Variables Reference

| Variable | Value | Description |
|----------|-------|-------------|
| `OPENAI_API_KEY` | `sk-...` | Your OpenAI API key (required) |

### 7. Optional Environment Variables

You can also add these for customization:

| Variable | Default | Description |
|----------|---------|-------------|
| `DEFAULT_MODEL` | `gpt-3.5-turbo` | Default OpenAI model |
| `DEFAULT_TEMPERATURE` | `0.7` | Response creativity (0.0-2.0) |
| `DEFAULT_MAX_TOKENS` | `1000` | Maximum response length |

### 8. Monitoring and Maintenance

1. **Check OpenAI Usage:**
   - Monitor your API usage on OpenAI platform
   - Set up billing alerts

2. **Monitor Vercel Functions:**
   - Check function logs in Vercel dashboard
   - Monitor performance and errors

3. **Update Dependencies:**
   ```bash
   npm update
   vercel --prod
   ```

### 9. Security Best Practices

1. **Never expose API keys** in client-side code
2. **Use environment variables** for all secrets
3. **Implement rate limiting** to prevent abuse
4. **Validate all inputs** before sending to OpenAI
5. **Monitor for unusual usage patterns**

### 10. Performance Optimization

1. **Use streaming** for better user experience
2. **Implement caching** for repeated requests
3. **Optimize prompts** to reduce token usage
4. **Use appropriate models** based on your needs

## Success Checklist

- [ ] OpenAI API key is configured in Vercel
- [ ] All files are uploaded to your repository
- [ ] Vercel deployment is successful
- [ ] Environment variables are set
- [ ] Chatbot responds to messages
- [ ] No errors in browser console
- [ ] No errors in Vercel function logs

## Next Steps

Once your chatbot is working:

1. **Customize the UI** to match your brand
2. **Add conversation history** with localStorage
3. **Implement user authentication** if needed
4. **Add file upload capabilities**
5. **Set up monitoring and analytics**
6. **Implement rate limiting**
7. **Add custom system prompts**

Your AI chatbot should now be working perfectly on Vercel with OpenAI integration! 🎉
