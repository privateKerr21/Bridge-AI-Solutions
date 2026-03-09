import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";

export default function LanguageToggle() {
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <div className="flex items-center gap-2" role="group" aria-label={t("Language selection", "Selección de idioma")}>
      <Button
        onClick={toggleLanguage}
        variant={language === "en" ? "default" : "outline"}
        className="min-h-12 px-6 font-semibold text-lg rounded-full"
        aria-pressed={language === "en"}
        data-testid="button-english"
      >
        EN
      </Button>
      <Button
        onClick={toggleLanguage}
        variant={language === "es" ? "default" : "outline"}
        className="min-h-12 px-6 font-semibold text-lg rounded-full"
        aria-pressed={language === "es"}
        data-testid="button-spanish"
      >
        ES
      </Button>
    </div>
  );
}
