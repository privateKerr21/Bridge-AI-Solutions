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
        // Agent ID embedded directly
        this.agentId = 'agent_2701kh4p4ehpe03a94h8pmhbxxa6';

        this.initializeElements();
        this.attachEventListeners();
        this.updateStatus('ready', 'Ready to start');
    }

    initializeElements() {
        this.voiceButton = document.getElementById('voiceButton');
        this.buttonText = document.getElementById('buttonText');
        this.statusIndicator = document.getElementById('statusIndicator');
        this.statusText = document.getElementById('statusText');
        this.transcript = document.getElementById('transcript');
        this.agentIdInput = document.getElementById('agentId');
        this.saveSettingsBtn = document.getElementById('saveSettings');

        // Pre-fill agent ID and make read-only
        if (this.agentIdInput) {
            this.agentIdInput.value = this.agentId;
            this.agentIdInput.disabled = true;
        }
    }

    attachEventListeners() {
        this.voiceButton.addEventListener('click', () => this.toggleConversation());
        if (this.saveSettingsBtn) {
            this.saveSettingsBtn.style.display = 'none'; // Hide save button since ID is embedded
        }
    }

    async toggleConversation() {
        if (!this.agentId) {
            alert('Please enter your ElevenLabs Agent ID in the settings below');
            return;
        }

        if (this.isConnected) {
            this.stopConversation();
        } else {
            await this.startConversation();
        }
    }

    async startConversation() {
        try {
            this.updateStatus('connecting', 'Connecting...');
            this.voiceButton.disabled = true;

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
            this.updateStatus('active', 'Listening...');
            this.voiceButton.classList.add('active');
            this.buttonText.textContent = 'Stop Conversation';
            this.voiceButton.disabled = false;

            this.addTranscriptMessage('system', 'Conversation started');
        } catch (error) {
            console.error('Error starting conversation:', error);
            this.updateStatus('error', 'Error: ' + error.message);
            this.voiceButton.disabled = false;

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

            // Send audio data to ElevenLabs
            this.websocket.send(int16Data);
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

    handleWebSocketMessage(event) {
        try {
            // Handle different message types from ElevenLabs
            if (event.data instanceof Blob) {
                // Audio response from agent
                this.playAudioResponse(event.data);
            } else {
                // Text/JSON response
                const data = JSON.parse(event.data);

                if (data.type === 'transcript') {
                    if (data.role === 'user') {
                        this.addTranscriptMessage('user', data.text);
                    } else if (data.role === 'agent') {
                        this.addTranscriptMessage('agent', data.text);
                    }
                }

                if (data.type === 'interruption') {
                    console.log('Agent interrupted');
                }
            }
        } catch (error) {
            console.error('Error handling message:', error);
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

            this.updateStatus('active', 'Agent speaking...');

            source.onended = () => {
                if (this.isConnected) {
                    this.updateStatus('active', 'Listening...');
                }
            };
        } catch (error) {
            console.error('Error playing audio:', error);
        }
    }

    stopConversation() {
        this.isConnected = false;
        this.isRecording = false;

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

        this.updateStatus('ready', 'Ready to start');
        this.voiceButton.classList.remove('active');
        this.buttonText.textContent = 'Start Conversation';
        this.voiceButton.disabled = false;

        this.addTranscriptMessage('system', 'Conversation ended');
    }

    updateStatus(state, text) {
        this.statusIndicator.className = `status-indicator ${state}`;
        this.statusText.textContent = text;
    }

    addTranscriptMessage(speaker, text) {
        // Remove empty message if present
        const emptyMessage = this.transcript.querySelector('.transcript-empty');
        if (emptyMessage) {
            emptyMessage.remove();
        }

        const messageDiv = document.createElement('div');
        messageDiv.className = `transcript-message ${speaker}`;

        const speakerLabel = document.createElement('div');
        speakerLabel.className = 'speaker';
        speakerLabel.textContent = speaker === 'user' ? 'You' :
                                   speaker === 'agent' ? 'Assistant' :
                                   'System';

        const messageText = document.createElement('div');
        messageText.className = 'message-text';
        messageText.textContent = text;

        messageDiv.appendChild(speakerLabel);
        messageDiv.appendChild(messageText);
        this.transcript.appendChild(messageDiv);

        // Auto-scroll to bottom
        this.transcript.scrollTop = this.transcript.scrollHeight;
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
