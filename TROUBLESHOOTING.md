# Troubleshooting Guide

## Current Issue: Chatbot Not Responding

Based on the screenshot showing error messages, here's how to fix your chatbot:

## Quick Fix Steps

### 1. Check API Endpoint
Visit: `https://your-vercel-url.vercel.app/api/test`

You should see a JSON response like:
```json
{
  "status": "success",
  "message": "API endpoint is working!",
  "environment": {
    "hasOpenAIKey": true
  }
}
```

### 2. Verify Environment Variables
In your Vercel dashboard:
1. Go to Project Settings → Environment Variables
2. Make sure `OPENAI_API_KEY` is set
3. The value should start with `sk-`

### 3. Check OpenAI API Key
1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Check your API key is valid
3. Verify you have credits/billing set up
4. Test the key in OpenAI's playground

## Common Issues and Solutions

### Issue 1: "API key not configured" Error
**Cause:** Environment variable not set in Vercel
**Solution:**
1. Go to Vercel dashboard → Settings → Environment Variables
2. Add: `OPENAI_API_KEY` = `your_actual_key`
3. Redeploy your project

### Issue 2: Rate Limit Errors
**Cause:** Exceeded OpenAI rate limits
**Solution:**
1. Check your OpenAI usage dashboard
2. Wait a few minutes before trying again
3. Consider upgrading your OpenAI plan

### Issue 3: Function Timeout
**Cause:** Vercel function taking too long
**Solution:**
1. Check `vercel.json` has correct timeout settings
2. Use faster model like `gpt-3.5-turbo`
3. Reduce `max_tokens` parameter

### Issue 4: CORS Errors
**Cause:** Cross-origin request issues
**Solution:**
1. Verify CORS headers in API routes
2. Check `vercel.json` configuration
3. Ensure domain is properly configured

## Testing Your Setup

### Test 1: API Endpoint
```bash
curl https://your-vercel-url.vercel.app/api/test
```

### Test 2: OpenAI Integration
```bash
curl -X POST https://your-vercel-url.vercel.app/api/chat \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"Hello"}]}'
```

### Test 3: Browser Console
1. Open browser developer tools (F12)
2. Go to Console tab
3. Look for error messages
4. Check Network tab for failed requests

## Fallback Solution

The current setup uses `script-fallback.js` which:
1. **First tries** the OpenAI API
2. **If API fails**, uses intelligent local responses
3. **Always responds** to user messages
4. **Provides helpful** fallback conversations

This ensures your chatbot works even if:
- OpenAI API is down
- API key is invalid
- Rate limits are exceeded
- Network issues occur

## Deployment Checklist

Before deploying, ensure:
- [ ] `package.json` has OpenAI dependency
- [ ] `vercel.json` has correct configuration
- [ ] API routes are in `/api/` folder
- [ ] Environment variables are set
- [ ] OpenAI API key is valid
- [ ] Billing is set up on OpenAI

## Debug Information

### Check Vercel Function Logs
1. Go to Vercel dashboard
2. Click on your project
3. Go to "Functions" tab
4. Click on a function to see logs

### Common Error Messages
- `"API key not configured"` → Set OPENAI_API_KEY
- `"Rate limit exceeded"` → Wait or upgrade plan
- `"Invalid API key"` → Check key validity
- `"Insufficient quota"` → Add billing to OpenAI account

## Quick Test Commands

### Test API locally (if using Vercel CLI):
```bash
vercel dev
# Then visit http://localhost:3000/api/test
```

### Test OpenAI key directly:
```bash
curl https://api.openai.com/v1/models \
  -H "Authorization: Bearer YOUR_API_KEY"
```

## Still Not Working?

If you're still having issues:

1. **Check the browser console** for specific error messages
2. **Verify your Vercel deployment** is successful
3. **Test the API endpoints** directly
4. **Check OpenAI account** has credits
5. **Use the fallback script** (already implemented)

The fallback script ensures your chatbot will always respond, even if the OpenAI API is unavailable.

## Contact Support

If issues persist:
1. Check Vercel function logs
2. Verify OpenAI account status
3. Test API endpoints manually
4. Check browser console errors

Your chatbot should now work with either OpenAI integration or intelligent fallback responses!
