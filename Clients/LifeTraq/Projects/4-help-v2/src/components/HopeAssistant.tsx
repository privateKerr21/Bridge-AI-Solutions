import { useState, useRef, useEffect } from "react";
import { useConversation } from "@elevenlabs/react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  MessageCircle,
  Mic,
  MicOff,
  Keyboard,
  ArrowLeft,
  Send,
  Loader2,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import hopeImage from "@/assets/hope_01.jpeg";

const AGENT_ID = "agent_2701kh4p4ehpe03a94h8pmhbxxa6";

type Mode = "voice" | "text";
type ChatMessage = { role: "user" | "agent"; text: string };

const SUGGESTIONS = [
  {
    en: "I need a place to stay tonight",
    es: "Necesito un lugar para quedarme esta noche",
  },
  {
    en: "Where can I get food nearby?",
    es: "Donde puedo conseguir comida cerca?",
  },
  {
    en: "I need medical help",
    es: "Necesito ayuda medica",
  },
  {
    en: "Help me find legal aid",
    es: "Ayudame a encontrar asistencia legal",
  },
];

export default function HopeAssistant() {
  const { t } = useLanguage();
  const [mode, setMode] = useState<Mode>("voice");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [textInput, setTextInput] = useState("");
  const [textSessionStarting, setTextSessionStarting] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [textChatEnded, setTextChatEnded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textSessionTriggered = useRef(false);

  // Strip ElevenLabs emotion tags like [happy], [sad], etc. from text
  const stripEmotionTags = (text: string) =>
    text.replace(/\[[\w-]+\]\s*/g, "").trim();

  const conversation = useConversation({
    onMessage: (props) => {
      // Only track agent messages here; user messages are added on send
      if (props.role === "agent") {
        const cleaned = stripEmotionTags(props.message);
        if (cleaned) {
          setMessages((prev) => [...prev, { role: "agent", text: cleaned }]);
        }
      }
    },
    onError: (error: string) => {
      console.error("ElevenLabs conversation error:", error);
    },
  });

  // Auto-scroll chat messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Auto-start text session — agent's configured first message handles greeting
  useEffect(() => {
    if (mode === "text" && !textSessionTriggered.current) {
      textSessionTriggered.current = true;
      startTextSession();
    }
  }, [mode]);

  // Mute audio output in text mode so agent doesn't speak
  useEffect(() => {
    if (mode === "text" && conversation.status === "connected") {
      conversation.setVolume({ volume: 0 });
    }
  }, [mode, conversation.status]);

  const startVoiceChat = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      await conversation.startSession({
        agentId: AGENT_ID,
        connectionType: "websocket",
      });
    } catch (error) {
      console.error("Error starting voice chat:", error);
      if (error instanceof Error && error.name === "NotAllowedError") {
        alert(
          t(
            "Microphone access is required. Please allow microphone permissions and try again.",
            "Se requiere acceso al micrófono. Por favor permita los permisos del micrófono e intente de nuevo."
          )
        );
      }
    }
  };

  const stopChat = async () => {
    await conversation.endSession();
  };

  const toggleVoice = () => {
    if (conversation.status === "connected") {
      stopChat();
    } else {
      startVoiceChat();
    }
  };

  const startTextSession = async () => {
    setTextSessionStarting(true);
    try {
      await conversation.startSession({
        agentId: AGENT_ID,
        connectionType: "websocket",
      });
      conversation.setVolume({ volume: 0 });
    } catch (error) {
      console.error("Error starting text session:", error);
    } finally {
      setTextSessionStarting(false);
    }
  };

  const endTextChat = async () => {
    await conversation.endSession();
    setTextChatEnded(true);
  };

  const startNewTextChat = async () => {
    setMessages([]);
    setShowSuggestions(true);
    setTextChatEnded(false);
    await startTextSession();
  };

  const switchToText = async () => {
    if (conversation.status === "connected") {
      await conversation.endSession();
    }
    setMessages([]);
    setShowSuggestions(true);
    setTextChatEnded(false);
    textSessionTriggered.current = false;
    setMode("text");
  };

  const switchToVoice = async () => {
    if (conversation.status === "connected") {
      await conversation.endSession();
    }
    setMessages([]);
    textSessionTriggered.current = false;
    setMode("voice");
  };

  const sendText = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = textInput.trim();
    if (!text) return;
    setTextInput("");
    setShowSuggestions(false);
    setMessages((prev) => [...prev, { role: "user", text }]);
    conversation.sendUserMessage(text);
  };

  const sendSuggestion = (text: string) => {
    if (conversation.status !== "connected") return;
    setShowSuggestions(false);
    setMessages((prev) => [...prev, { role: "user", text }]);
    conversation.sendUserMessage(text);
  };

  // --- Text mode: native chat UI ---
  if (mode === "text") {
    const isReady = conversation.status === "connected";

    return (
      <section
        className="w-full flex flex-col gap-4"
        aria-labelledby="assistant-heading-text"
      >
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={switchToVoice}
            aria-label={t("Back to voice mode", "Volver al modo de voz")}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h2
            id="assistant-heading-text"
            className="text-xl font-semibold text-foreground flex-1"
          >
            {t("Chat with Hope", "Chatea con Hope")}
          </h2>
          {isReady && !textChatEnded && (
            <Button
              variant="ghost"
              size="sm"
              onClick={endTextChat}
              className="text-muted-foreground hover:text-destructive"
            >
              <X className="h-4 w-4 mr-1" />
              {t("End", "Fin")}
            </Button>
          )}
        </div>

        {/* Chat messages */}
        <div className="h-[400px] overflow-y-auto rounded-lg border border-border bg-background p-4 space-y-3">
          {textSessionStarting && messages.length === 0 && (
            <div className="flex items-center justify-center gap-2 py-8 text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              {t("Connecting to Hope...", "Conectando con Hope...")}
            </div>
          )}
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick-reply suggestion bubbles */}
        {showSuggestions && messages.some((m) => m.role === "agent") && (
          <div className="flex flex-wrap gap-2">
            {SUGGESTIONS.map((s, i) => (
              <button
                key={i}
                onClick={() => sendSuggestion(t(s.en, s.es))}
                className="rounded-full border border-primary/30 bg-primary/5 px-4 py-2 text-sm text-primary hover:bg-primary/10 transition-colors"
              >
                {t(s.en, s.es)}
              </button>
            ))}
          </div>
        )}

        {/* Text input or conversation ended */}
        {textChatEnded ? (
          <div className="flex flex-col items-center gap-3 py-2">
            <p className="text-sm text-muted-foreground">
              {t("Conversation ended", "Conversación terminada")}
            </p>
            <Button onClick={startNewTextChat} variant="outline" size="lg" className="w-full">
              {t("Start New Chat", "Iniciar Nuevo Chat")}
            </Button>
          </div>
        ) : (
          <form onSubmit={sendText} className="flex gap-2">
            <input
              type="text"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder={t("Type a message...", "Escribe un mensaje...")}
              className="flex-1 rounded-lg border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button
              type="submit"
              size="icon"
              className="h-12 w-12 shrink-0"
              disabled={!textInput.trim() || textSessionStarting}
            >
              <Send className="h-5 w-5" />
            </Button>
          </form>
        )}
      </section>
    );
  }

  // --- Voice mode ---
  const isConnected = conversation.status === "connected";
  const isConnecting = conversation.status === "connecting";

  return (
    <section className="w-full space-y-6" aria-labelledby="assistant-heading">
      <div className="flex flex-col items-center text-center">
        <div className="relative mb-4">
          <div
            className={`w-32 h-32 rounded-full overflow-hidden border-4 cursor-pointer transition-transform hover:scale-105 ${
              isConnected
                ? "border-green-400 shadow-lg shadow-green-200"
                : "border-primary/20"
            }`}
            onClick={toggleVoice}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") toggleVoice();
            }}
            aria-label={
              isConnected
                ? t(
                    "Stop conversation with Hope",
                    "Detener conversación con Hope"
                  )
                : t(
                    "Start voice conversation with Hope",
                    "Iniciar conversación de voz con Hope"
                  )
            }
          >
            <img
              src={hopeImage}
              alt={t("Hope AI Assistant", "Asistente Hope AI")}
              className="w-full h-full object-cover"
            />
            {isConnected && (
              <div className="absolute inset-0 rounded-full animate-ping border-2 border-green-400 opacity-30" />
            )}
          </div>
          {isConnected && conversation.isSpeaking && (
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
              {t("Speaking...", "Hablando...")}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 justify-center">
          <MessageCircle
            className="h-6 w-6 text-primary"
            aria-hidden="true"
          />
          <h2
            id="assistant-heading"
            className="text-2xl font-semibold text-foreground"
          >
            {t("Talk to Hope AI", "Habla con Hope AI")}
          </h2>
        </div>
      </div>

      <p className="text-base text-muted-foreground text-center">
        {t(
          "Tap Hope's image to start a voice conversation, or switch to text chat below.",
          "Toca la imagen de Hope para iniciar una conversación de voz, o cambia al chat de texto abajo."
        )}
      </p>

      <Button
        onClick={toggleVoice}
        size="lg"
        variant={isConnected ? "destructive" : "default"}
        className="min-h-14 px-6 text-lg font-bold gap-2 w-full"
        disabled={isConnecting}
      >
        {isConnecting ? (
          <>{t("Connecting...", "Conectando...")}</>
        ) : isConnected ? (
          <>
            <MicOff className="h-5 w-5" aria-hidden="true" />
            {t("Stop Conversation", "Detener Conversación")}
          </>
        ) : (
          <>
            <Mic className="h-5 w-5" aria-hidden="true" />
            {t("Start Voice Chat", "Iniciar Chat de Voz")}
          </>
        )}
      </Button>

      <Button
        onClick={switchToText}
        size="lg"
        variant="ghost"
        className="min-h-12 w-full gap-2 text-base"
      >
        <Keyboard className="h-5 w-5" aria-hidden="true" />
        {t("Switch to Text Chat", "Cambiar a Chat de Texto")}
      </Button>
    </section>
  );
}
