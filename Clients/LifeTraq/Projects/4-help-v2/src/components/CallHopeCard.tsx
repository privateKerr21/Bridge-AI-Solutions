import { useLanguage } from "@/contexts/LanguageContext";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function CallHopeCard() {
  const { t } = useLanguage();

  const phoneNumber = "+13854627463";
  const formattedPhone = "(385) 462-7463";

  return (
    <Card className="p-4 bg-primary/5 border-primary/20">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-center sm:text-left">
          <div className="p-3 rounded-full bg-primary/10">
            <Phone className="h-6 w-6 text-primary" aria-hidden="true" />
          </div>
          <div>
            <p className="font-semibold text-foreground">
              {t("Need help finding resources?", "¿Necesita ayuda para encontrar recursos?")}
            </p>
            <p className="text-sm text-muted-foreground">
              {t("Call our AI assistant Hope", "Llame a nuestra asistente IA Hope")}
            </p>
          </div>
        </div>
        <Button
          asChild
          size="lg"
          className="min-h-14 px-6 text-lg font-bold gap-2 w-full sm:w-auto"
        >
          <a href={`tel:${phoneNumber}`}>
            <Phone className="h-5 w-5" aria-hidden="true" />
            {formattedPhone}
          </a>
        </Button>
      </div>
    </Card>
  );
}
