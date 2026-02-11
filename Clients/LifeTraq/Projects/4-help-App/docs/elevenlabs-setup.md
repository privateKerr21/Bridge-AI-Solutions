# ElevenLabs Conversational AI Setup Guide

## Prerequisites

1. **ElevenLabs Account**: Sign up at [elevenlabs.io](https://elevenlabs.io)
2. **API Key**: Generate from your ElevenLabs dashboard
3. **Agent ID**: Create a conversational agent and note its ID

## Step 1: Create an ElevenLabs Account

1. Visit [https://elevenlabs.io](https://elevenlabs.io)
2. Sign up for an account (free tier available)
3. Verify your email address

## Step 2: Create a Conversational Agent

1. Log into your ElevenLabs dashboard
2. Navigate to "Conversational AI" section
3. Click "Create New Agent"
4. Configure your agent:
   - **Name**: 4-help Assistant
   - **Voice**: Choose an appropriate voice
   - **Language**: English (or as needed)
   - **System Prompt**: Define the agent's personality and role
   - **First Message**: Optional greeting message

5. Save your agent and copy the **Agent ID**

## Step 3: Configure the Web App

1. Open the 4-help app in your browser
2. In the Settings section, paste your **Agent ID**
3. Click "Save Settings"
4. The Agent ID will be stored in browser localStorage

## Step 4: Test the Connection

1. Click "Start Conversation"
2. Allow microphone permissions when prompted
3. Speak to test the voice interaction
4. The agent should respond with voice

## API Endpoints

The app uses the ElevenLabs WebSocket API:

```
wss://api.elevenlabs.io/v1/convai/conversation?agent_id={AGENT_ID}
```

## Audio Format

- **Sample Rate**: 16000 Hz
- **Format**: PCM 16-bit
- **Channels**: Mono

## Browser Requirements

- **HTTPS**: Required for microphone access (or localhost for testing)
- **Supported Browsers**:
  - Chrome/Edge (recommended)
  - Firefox
  - Safari 14.1+
  - Opera

## Troubleshooting

### "Failed to connect to ElevenLabs"
- Verify your Agent ID is correct
- Check that your ElevenLabs account is active
- Ensure you have API credits available

### Microphone Not Working
- Check browser permissions (click lock icon in address bar)
- Ensure HTTPS is enabled (or using localhost)
- Try a different browser
- Check if another app is using the microphone

### No Audio Response
- Check your device volume
- Verify audio output device is working
- Check browser audio permissions
- Test with different audio output device

### Connection Drops
- Check internet connection stability
- Verify API rate limits not exceeded
- Check ElevenLabs service status

## Security Notes

- Agent ID is stored in browser localStorage
- No API key needed for client-side integration
- Audio data streamed directly to ElevenLabs
- HTTPS required for production use

## Rate Limits

Check your ElevenLabs account for:
- Characters per month limit
- Concurrent connection limits
- API request limits

## Future Enhancements

- Add API key authentication (if required by ElevenLabs)
- Implement conversation history storage
- Add voice selection options
- Enable conversation settings customization
