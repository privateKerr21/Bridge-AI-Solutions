# 4-help App

## Project Overview

A voice-enabled web application that will eventually be published as a native mobile app. The app integrates ElevenLabs Conversational AI for voice interactions.

## Project Status

**Phase**: Complete - Ready for Testing
**Started**: 2026-02-10
**Current Focus**: Testing and refinement

## Technology Stack

### Current (Web App)
- HTML/CSS/JavaScript
- ElevenLabs Conversational AI API
- WebRTC for audio streaming
- Responsive design (mobile-first)

### Future (Native App)
- Target platforms: iOS/Android
- Consider: React Native, Flutter, or native development
- Voice agent integration will carry over

## Features

### Phase 1 - Voice Agent Integration ✓
- [x] ElevenLabs Conversational AI connection
- [x] Microphone permission handling
- [x] Real-time voice streaming
- [x] Audio playback of agent responses
- [x] Complete UI with conversation transcript
- [x] Standalone HTML version for easy testing

## Quick Start

**Agent ID is pre-configured!** Just open and test:

1. Open `4-help-standalone.html` in your browser
2. Click "Start Conversation"
3. Allow microphone permissions
4. Start speaking!

See `QUICK-START.md` for detailed instructions and troubleshooting.

## Documentation

- `QUICK-START.md` - Instant testing guide
- `context.md` - Current project state
- `plan.md` - Technical decisions and architecture
- `tasks.md` - Action items and checklist
- `docs/elevenlabs-setup.md` - ElevenLabs configuration details
- `docs/testing-guide.md` - Comprehensive testing checklist

## Development

### Local Testing
- **Standalone**: Open `4-help-standalone.html` directly (easiest)
- **With Server**: Run `python -m http.server 8000` in `/src` folder
- **Modular Version**: Use files in `/src` folder for development

### Deployment
Deploys automatically via Vercel when pushed to main branch

## Configuration

ElevenLabs Agent ID is embedded in the code:
```
agent_2701kh4p4ehpe03a94h8pmhbxxa6
```

No additional setup needed! The agent is ready to use.
