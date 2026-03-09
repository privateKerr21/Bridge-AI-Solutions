import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Header() {
  const { language, toggleLanguage, t } = useLanguage();

  const emergencyNumbers = [
    { name: t("911 Emergency", "911 Emergencia"), number: "911" },
    { name: t("Crisis Hotline", "Línea de Crisis"), number: "988" },
    { name: t("Domestic Violence", "Violencia Doméstica"), number: "1-800-799-7233" },
  ];

  return (
    <header
      className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b"
      role="banner"
    >
      <div className="flex items-center justify-between gap-2 h-16 px-4 max-w-4xl mx-auto">
        <Button
          onClick={toggleLanguage}
          variant="outline"
          size="sm"
          className="min-h-10 px-3 font-semibold text-base rounded-full"
          aria-label={t("Switch to Spanish", "Cambiar a Inglés")}
        >
          {language === "en" ? "ES" : "EN"}
        </Button>

        <h1 className="text-xl font-semibold text-foreground tracking-tight">
          4-HELP
        </h1>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="destructive"
              size="sm"
              className="min-h-10 gap-1 font-semibold"
              aria-label={t("Emergency contacts", "Contactos de emergencia")}
            >
              <Phone className="h-4 w-4" />
              <span className="hidden sm:inline">{t("Emergency", "Emergencia")}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            {emergencyNumbers.map((emergency) => (
              <DropdownMenuItem key={emergency.number} asChild>
                <a
                  href={`tel:${emergency.number}`}
                  className="flex items-center justify-between gap-2 cursor-pointer"
                >
                  <span>{emergency.name}</span>
                  <span className="font-mono font-bold text-destructive">{emergency.number}</span>
                </a>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
