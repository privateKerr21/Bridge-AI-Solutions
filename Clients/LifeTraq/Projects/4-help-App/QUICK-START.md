# 4-help App - Quick Start Guide

## Instant Testing (No Setup Required!)

Your Agent ID is already embedded in the app. Just open and test!

### Option 1: Direct File Open (Easiest)

1. Navigate to: `Clients/LifeTraq/Projects/4-help-App/`
2. Double-click `4-help-standalone.html`
3. Click **"Start Conversation"**
4. Allow microphone permissions
5. Start speaking!

**Note**: Some browsers (like Chrome) may block microphone access when opening `file://` URLs. If this happens, use Option 2.

### Option 2: Local Server (Most Reliable)

```bash
cd "Clients/LifeTraq/Projects/4-help-App/src"
python -m http.server 8000
```

Then open: `http://localhost:8000`

### Option 3: Open from File Explorer

Right-click `4-help-standalone.html` → Open With → Your Browser

---

## What You'll See

1. **Ready to start** - Green dot, ready to connect
2. Click **"Start Conversation"**
3. **Connecting...** - Orange dot, establishing connection
4. **Listening...** - Green dot pulsing, microphone active
5. **Agent speaking...** - When AI responds
6. Conversation appears in the transcript below

---

## Troubleshooting

### "Microphone access denied"
- Click the lock icon in the address bar
- Allow microphone permissions
- Refresh and try again

### "Failed to connect to ElevenLabs"
- Check your internet connection
- Verify the Agent ID is still active in your ElevenLabs dashboard
- Open browser console (F12) to see detailed error messages

### No audio from agent
- Check your device volume
- Try a different browser (Chrome or Edge recommended)
- Check browser audio permissions

### Chrome blocks microphone on file://
- Use Option 2 (local server) instead
- Or try Firefox/Edge which are more permissive

---

## Browser Compatibility

**Best:** Chrome, Edge (Chromium)
**Good:** Firefox, Safari 14.1+
**Avoid:** Internet Explorer (not supported)

---

## Ready for Production?

When ready to deploy with HTTPS:

```bash
vercel --prod
```

This will give you a public HTTPS URL that works on all devices.

---

## Agent Configuration

Your ElevenLabs Agent ID is already embedded:
```
agent_2701kh4p4ehpe03a94h8pmhbxxa6
```

No configuration needed! 🎉
