import { useLanguage } from "@/contexts/LanguageContext";
import { MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import hopeImage from "@assets/hope-image_720_1767648320111.jpg";

export default function ChippAssistant() {
  const { t } = useLanguage();

  const phoneNumber = "+13854627463";
  const formattedPhone = "(385) 462-7463";

  return (
    <section 
      className="w-full space-y-6"
      aria-labelledby="assistant-heading"
    >
      <div className="flex flex-col items-center text-center">
        <img 
          src={hopeImage} 
          alt={t("Hope AI Assistant", "Asistente Hope AI")}
          className="w-32 h-32 rounded-full object-cover border-4 border-primary/20 mb-4"
          data-testid="img-hope-assistant"
        />
        <div className="flex items-center gap-2 justify-center">
          <MessageCircle className="h-6 w-6 text-primary" aria-hidden="true" />
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
          "Call our AI assistant for personalized help finding resources, or chat with Hope below.",
          "Llame a nuestro asistente IA para obtener ayuda personalizada para encontrar recursos, o chatee con Hope a continuación."
        )}
      </p>

      <Button
        asChild
        size="lg"
        className="min-h-14 px-6 text-lg font-bold gap-2 w-full"
        data-testid="button-call-assistant"
      >
        <a href={`tel:${phoneNumber}`}>
          <Phone className="h-5 w-5" aria-hidden="true" />
          {formattedPhone}
        </a>
      </Button>

      <iframe
        src="https://hopeai4help-10035806.chipp.ai"
        height="800px"
        width="100%"
        frameBorder="0"
        title={t("Hope AI | 4-HELP", "Hope AI | 4-HELP")}
        allow="microphone; camera"
        className="rounded-lg border border-border"
        data-testid="iframe-hope-chat"
      />
    </section>
  );
}
