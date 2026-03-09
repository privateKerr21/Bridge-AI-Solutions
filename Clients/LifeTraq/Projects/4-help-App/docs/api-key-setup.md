# Getting Your ElevenLabs API Key

## Steps to Get Your API Key

1. **Log into ElevenLabs**
   - Go to: https://elevenlabs.io
   - Sign in to your account

2. **Navigate to Profile Settings**
   - Click your profile icon (top right)
   - Select "Profile" or "Settings"

3. **Find API Keys Section**
   - Look for "API Keys" in the left sidebar
   - Or go directly to: https://elevenlabs.io/app/settings/api-keys

4. **Generate or Copy API Key**
   - If you don't have a key, click "Generate API Key"
   - Copy your API key (it looks like: `sk_...`)
   - **Important**: Save this key securely - you won't be able to see it again!

## Adding the API Key to Your App

### Method 1: Embed Directly (Current Setup)

Edit the file and replace `YOUR_ELEVENLABS_API_KEY`:

**In `src/app.js`:**
```javascript
this.apiKey = 'sk_your_actual_api_key_here';
```

**In `4-help-standalone.html`:**
Find the same line and replace with your key.

### Method 2: Environment Variable (Future Enhancement)

For better security, we can move the API key to an environment variable:

1. Create `.env` file (already gitignored)
2. Add: `ELEVENLABS_API_KEY=sk_your_key_here`
3. Update code to read from environment

## Security Notes

⚠️ **Important Security Considerations:**

1. **Never commit API keys to public repositories**
   - The current setup embeds the key in code
   - This is OK for private repos or internal use
   - For public repos, use environment variables

2. **API Key Visibility**
   - Client-side apps expose API keys in browser
   - Anyone can view source and see your key
   - Consider rate limiting in ElevenLabs dashboard

3. **Better Approach for Production**
   - Use a backend proxy server
   - Keep API key on server-side
   - Client calls your server, server calls ElevenLabs
   - This keeps your key secure

## Current Implementation

For now, we're embedding the API key directly since:
- Fast to implement and test
- Repository is private
- Client is trusted user

For production or public release, implement server-side proxy.

## Testing After Adding API Key

1. Add your API key to the code
2. Save the file
3. Refresh browser or redeploy
4. Click "Start Conversation"
5. Should now connect successfully!

## Troubleshooting

### "Authentication failed" error
- Check that API key is correct (starts with `sk_`)
- Verify key is active in ElevenLabs dashboard
- Ensure no extra spaces or quotes in the key

### Connection still drops immediately
- Check browser console for specific error
- Verify Agent ID is also correct
- Check ElevenLabs account for API usage limits

### Rate limiting errors
- Check your ElevenLabs plan limits
- Consider upgrading plan if needed
- Implement retry logic with backoff
