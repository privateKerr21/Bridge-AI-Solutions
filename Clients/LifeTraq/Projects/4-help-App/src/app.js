/**
 * 4-help App - ElevenLabs Voice Agent Integration
 * Voice conversation interface using ElevenLabs Conversational AI
 */

class VoiceAssistant {
    constructor() {
        this.isConnected = false;
        this.isRecording = false;
        this.websocket = null;
        this.audioContext = null;
        this.mediaStream = null;
        // ElevenLabs Agent ID and API key for voice mode
        this.agentId = 'agent_2701kh4p4ehpe03a94h8pmhbxxa6';
        this.apiKey = 'sk_af398b207c12087b1b16dbe340b91c51aff16c0384aac1ae';

        // Chipp.ai API key for text mode
        this.chippApiKey = 'live_ffbdb9fb54f6ebbd1f324528e5f00df4c0e0e8c53c14c4cd3ba16fce4ddb65f7';
        this.chippAppId = 'hopeai4helpinbuild-10038341';

        // Audio queue for sequential playback
        this.audioQueue = [];
        this.isPlayingAudio = false;

        // Text conversation history
        this.conversationHistory = [];

        this.initializeElements();
        this.attachEventListeners();
        // this.updateStatus('ready', 'Ready to start');
    }

    initializeElements() {
        // Voice mode elements
        this.voiceMode = document.getElementById('voiceMode');
        this.hopeCircle = document.getElementById('hopeCircle');
        this.listeningIndicator = document.getElementById('listeningIndicator');

        // Text mode elements
        this.textMode = document.getElementById('textMode');

        // Mode toggle buttons
        this.showTextModeBtn = document.getElementById('showTextMode');
        this.backToVoiceBtn = document.getElementById('backToVoice');

        // Current mode
        this.currentMode = 'voice'; // 'voice' or 'text'
    }

    attachEventListeners() {
        // Hope circle click (voice mode)
        this.hopeCircle.addEventListener('click', () => this.toggleConversation());

        // Mode switching
        this.showTextModeBtn.addEventListener('click', () => this.switchToTextMode());
        this.backToVoiceBtn.addEventListener('click', () => this.switchToVoiceMode());
    }

    switchToTextMode() {
        this.currentMode = 'text';
        this.voiceMode.classList.add('hidden');
        this.textMode.classList.remove('hidden');
    }

    switchToVoiceMode() {
        this.currentMode = 'voice';
        this.textMode.classList.add('hidden');
        this.voiceMode.classList.remove('hidden');
    }

    async toggleConversation() {
        if (this.isConnected) {
            this.stopConversation();
        } else {
            await this.startConversation();
        }
    }

    async startConversation() {
        try {
            // this.updateStatus('connecting', 'Connecting...');
            this.hopeCircle.classList.add('active');

            // Request microphone access
            this.mediaStream = await navigator.mediaDevices.getUserMedia({
                audio: {
                    echoCancellation: true,
                    noiseSuppression: true,
                    autoGainControl: true
                }
            });

            // Initialize audio context
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)({
                sampleRate: 16000
            });

            // Connect to ElevenLabs Conversational AI
            await this.connectToElevenLabs();

            this.isConnected = true;
            this.isRecording = true;
            // this.updateStatus('active', 'Listening');

            console.log('Conversation started');
        } catch (error) {
            console.error('Error starting conversation:', error);
            // this.updateStatus('error', 'Error: ' + error.message);
            this.hopeCircle.classList.remove('active');

            if (error.name === 'NotAllowedError') {
                alert('Microphone access is required. Please allow microphone permissions and try again.');
            } else {
                alert('Failed to start conversation: ' + error.message);
            }
        }
    }

    async connectToElevenLabs() {
        return new Promise((resolve, reject) => {
            // ElevenLabs Conversational AI WebSocket endpoint
            // Include API key and specify signed URL for audio output
            const wsUrl = `wss://api.elevenlabs.io/v1/convai/conversation?agent_id=${this.agentId}`;

            this.websocket = new WebSocket(wsUrl);

            this.websocket.onopen = () => {
                console.log('Connected to ElevenLabs');
                this.startAudioStreaming();
                resolve();
            };

            this.websocket.onmessage = (event) => {
                this.handleWebSocketMessage(event);
            };

            this.websocket.onerror = (error) => {
                console.error('WebSocket error:', error);
                reject(new Error('Failed to connect to ElevenLabs. Check your Agent ID.'));
            };

            this.websocket.onclose = () => {
                console.log('Disconnected from ElevenLabs');
                if (this.isConnected) {
                    this.stopConversation();
                }
            };
        });
    }

    startAudioStreaming() {
        if (!this.mediaStream || !this.audioContext) return;

        const source = this.audioContext.createMediaStreamSource(this.mediaStream);
        const processor = this.audioContext.createScriptProcessor(4096, 1, 1);

        source.connect(processor);
        processor.connect(this.audioContext.destination);

        processor.onaudioprocess = (e) => {
            if (!this.isRecording || !this.websocket || this.websocket.readyState !== WebSocket.OPEN) {
                return;
            }

            // Get audio data and convert to appropriate format
            const audioData = e.inputBuffer.getChannelData(0);
            const int16Data = this.floatTo16BitPCM(audioData);

            // Convert to base64 and send as JSON
            const base64Audio = this.arrayBufferToBase64(int16Data);
            this.websocket.send(JSON.stringify({
                user_audio_chunk: base64Audio
            }));
        };

        this.audioProcessor = processor;
    }

    floatTo16BitPCM(float32Array) {
        const int16Array = new Int16Array(float32Array.length);
        for (let i = 0; i < float32Array.length; i++) {
            const s = Math.max(-1, Math.min(1, float32Array[i]));
            int16Array[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
        }
        return int16Array.buffer;
    }

    arrayBufferToBase64(buffer) {
        const bytes = new Uint8Array(buffer);
        let binary = '';
        for (let i = 0; i < bytes.byteLength; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return btoa(binary);
    }

    handleWebSocketMessage(event) {
        try {
            console.log('Received message type:', typeof event.data, event.data instanceof Blob ? 'Blob' : 'Text');

            // Handle different message types from ElevenLabs
            if (event.data instanceof Blob) {
                console.log('Received audio blob:', event.data.size, 'bytes');
                // Audio response from agent
                this.playAudioResponse(event.data);
            } else {
                // Text/JSON response
                const data = JSON.parse(event.data);
                console.log('Received JSON message:', data);

                // Handle audio chunk in base64 format
                if (data.audio) {
                    console.log('Received base64 audio chunk');
                    this.playBase64Audio(data.audio);
                }

                // Handle audio event (alternative field name)
                if (data.audio_event && data.audio_event.audio_base_64) {
                    console.log('Received audio_event with base64 audio');
                    this.playBase64Audio(data.audio_event.audio_base_64);
                }

                // Handle agent response with text
                if (data.type === 'agent_response' && data.agent_response_event) {
                    const response = data.agent_response_event.agent_response;
                    console.log('Agent response text:', response);
                    this.addMessage('agent', response);
                }

                // Handle transcript messages
                if (data.type === 'transcript') {
                    if (data.role === 'user') {
                        this.addMessage('user', data.text);
                    } else if (data.role === 'agent') {
                        this.addMessage('agent', data.text);
                    }
                }

                // Handle user transcript
                if (data.type === 'user_transcript' && data.user_transcription_event) {
                    const transcription = data.user_transcription_event.user_transcript;
                    console.log('User transcript:', transcription);
                    this.addMessage('user', transcription);
                }

                // Handle interruption
                if (data.type === 'interruption') {
                    console.log('Agent interrupted');
                }

                // Handle other message types
                if (data.type === 'conversation_initiation_metadata') {
                    console.log('Conversation initiated:', data);
                }
            }
        } catch (error) {
            console.error('Error handling message:', error, event.data);
        }
    }

    async playAudioResponse(audioBlob) {
        try {
            const arrayBuffer = await audioBlob.arrayBuffer();
            const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);

            const source = this.audioContext.createBufferSource();
            source.buffer = audioBuffer;
            source.connect(this.audioContext.destination);
            source.start(0);

            // this.updateStatus('active', 'Hope is speaking');

            source.onended = () => {
                if (this.isConnected) {
                    // this.updateStatus('active', 'Listening');
                }
            };
        } catch (error) {
            console.error('Error playing audio:', error);
        }
    }

    async playBase64Audio(base64Audio) {
        // Add audio chunk to queue
        this.audioQueue.push(base64Audio);
        console.log('Added audio chunk to queue. Queue length:', this.audioQueue.length);

        // Start processing queue if not already playing
        if (!this.isPlayingAudio) {
            this.processAudioQueue();
        }
    }

    async processAudioQueue() {
        if (this.audioQueue.length === 0) {
            this.isPlayingAudio = false;
            if (this.isConnected) {
                // this.updateStatus('active', 'Listening');
            }
            return;
        }

        this.isPlayingAudio = true;
        const base64Audio = this.audioQueue.shift();

        try {
            console.log('Processing audio chunk, length:', base64Audio.length);

            // Decode base64 to binary
            const binaryString = atob(base64Audio);
            const bytes = new Uint8Array(binaryString.length);
            for (let i = 0; i < binaryString.length; i++) {
                bytes[i] = binaryString.charCodeAt(i);
            }

            // ElevenLabs sends PCM16 audio at 22kHz, mono
            const sampleRate = 22050;
            const numChannels = 1;
            const int16Array = new Int16Array(bytes.buffer);

            // Create AudioBuffer
            const audioBuffer = this.audioContext.createBuffer(
                numChannels,
                int16Array.length,
                sampleRate
            );

            // Convert Int16 PCM to Float32
            const channelData = audioBuffer.getChannelData(0);
            for (let i = 0; i < int16Array.length; i++) {
                channelData[i] = int16Array[i] / 32768.0;
            }

            // Play the audio
            const source = this.audioContext.createBufferSource();
            source.buffer = audioBuffer;
            source.connect(this.audioContext.destination);

            // this.updateStatus('active', 'Hope is speaking');

            source.onended = () => {
                // Process next chunk in queue
                this.processAudioQueue();
            };

            source.start(0);

        } catch (error) {
            console.error('Error processing audio chunk:', error);
            // Continue with next chunk even if this one failed
            this.processAudioQueue();
        }
    }

    stopConversation() {
        this.isConnected = false;
        this.isRecording = false;

        // Clear audio queue
        this.audioQueue = [];
        this.isPlayingAudio = false;

        // Close WebSocket
        if (this.websocket) {
            this.websocket.close();
            this.websocket = null;
        }

        // Stop audio processor
        if (this.audioProcessor) {
            this.audioProcessor.disconnect();
            this.audioProcessor = null;
        }

        // Stop media stream
        if (this.mediaStream) {
            this.mediaStream.getTracks().forEach(track => track.stop());
            this.mediaStream = null;
        }

        // Close audio context
        if (this.audioContext) {
            this.audioContext.close();
            this.audioContext = null;
        }

        // this.updateStatus('ready', 'Ready');
        this.hopeCircle.classList.remove('active');

        console.log('Conversation ended');
    }

}

// Initialize the app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Check for HTTPS (required for microphone access)
    if (location.protocol !== 'https:' && location.hostname !== 'localhost') {
        alert('This app requires HTTPS to access the microphone. Please use HTTPS or run on localhost.');
    }

    // Initialize voice assistant
    window.voiceAssistant = new VoiceAssistant();
});
