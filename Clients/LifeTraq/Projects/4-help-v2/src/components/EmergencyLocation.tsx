import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, Phone, Share2, Loader2, AlertTriangle, Copy, Check } from "lucide-react";

interface LocationData {
  lat: number;
  lng: number;
  accuracy: number;
  timestamp: Date;
}

export default function EmergencyLocation() {
  const { t } = useLanguage();
  const [location, setLocation] = useState<LocationData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const getLocation = () => {
    setIsLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError(
        t(
          "Geolocation is not supported by your browser",
          "La geolocalización no es compatible con su navegador"
        )
      );
      setIsLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: new Date(),
        });
        setIsLoading(false);
      },
      (err) => {
        let message = t("Unable to get your location", "No se puede obtener su ubicación");
        if (err.code === err.PERMISSION_DENIED) {
          message = t(
            "Please allow location access to use this feature",
            "Por favor permita el acceso a la ubicación para usar esta función"
          );
        }
        setError(message);
        setIsLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const getMapUrl = () => {
    if (!location) return "";
    return `https://www.openstreetmap.org/export/embed.html?bbox=${location.lng - 0.005},${location.lat - 0.005},${location.lng + 0.005},${location.lat + 0.005}&layer=mapnik&marker=${location.lat},${location.lng}`;
  };

  const getGoogleMapsLink = () => {
    if (!location) return "";
    return `https://www.google.com/maps?q=${location.lat},${location.lng}`;
  };

  const copyLocation = async () => {
    if (!location) return;
    const text = `${t("My location", "Mi ubicación")}: ${location.lat.toFixed(6)}, ${location.lng.toFixed(6)}\n${getGoogleMapsLink()}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shareLocation = async () => {
    if (!location) return;
    const shareData = {
      title: t("My Emergency Location", "Mi Ubicación de Emergencia"),
      text: `${t("I need help! My location", "¡Necesito ayuda! Mi ubicación")}: ${location.lat.toFixed(6)}, ${location.lng.toFixed(6)}`,
      url: getGoogleMapsLink(),
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        copyLocation();
      }
    } else {
      copyLocation();
    }
  };

  return (
    <section className="w-full space-y-6" aria-labelledby="emergency-location-heading">
      <div className="flex items-center gap-2">
        <AlertTriangle className="h-6 w-6 text-destructive" aria-hidden="true" />
        <h2
          id="emergency-location-heading"
          className="text-2xl font-semibold text-foreground"
        >
          {t("Emergency Location", "Ubicación de Emergencia")}
        </h2>
      </div>

      <Card className="p-4 bg-destructive/5 border-destructive/20">
        <p className="text-base text-foreground">
          {t(
            "Use this feature when you need immediate help. Pin your location to share with emergency services or someone who can assist you.",
            "Use esta función cuando necesite ayuda inmediata. Fije su ubicación para compartirla con servicios de emergencia o alguien que pueda ayudarle."
          )}
        </p>
      </Card>

      {!location ? (
        <div className="flex flex-col items-center gap-4 py-8">
          <div className="p-4 rounded-full bg-primary/10">
            <MapPin className="h-12 w-12 text-primary" aria-hidden="true" />
          </div>

          <p className="text-center text-muted-foreground max-w-sm">
            {t(
              "Tap the button below to share your current location",
              "Toque el botón de abajo para compartir su ubicación actual"
            )}
          </p>

          <Button
            onClick={getLocation}
            size="lg"
            className="min-h-14 px-8 text-lg font-bold gap-2"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
                {t("Finding location...", "Buscando ubicación...")}
              </>
            ) : (
              <>
                <MapPin className="h-5 w-5" aria-hidden="true" />
                {t("Pin My Location", "Fijar Mi Ubicación")}
              </>
            )}
          </Button>

          {error && (
            <p className="text-destructive text-center" role="alert">
              {error}
            </p>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          <div className="rounded-xl overflow-hidden border-2 border-border">
            <iframe
              src={getMapUrl()}
              title={t("Your location on map", "Su ubicación en el mapa")}
              className="w-full h-64 md:h-80"
              loading="lazy"
            />
          </div>

          <Card className="p-4">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div>
                  <p className="text-sm text-muted-foreground">
                    {t("Your coordinates", "Sus coordenadas")}
                  </p>
                  <p className="font-mono font-semibold text-foreground">
                    {location.lat.toFixed(6)}, {location.lng.toFixed(6)}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={copyLocation}
                  className="gap-2"
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4" aria-hidden="true" />
                      {t("Copied!", "¡Copiado!")}
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" aria-hidden="true" />
                      {t("Copy", "Copiar")}
                    </>
                  )}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                {t("Accuracy", "Precisión")}: ~{Math.round(location.accuracy)}m
              </p>
            </div>
          </Card>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Button
              onClick={shareLocation}
              size="lg"
              variant="outline"
              className="min-h-14 text-lg font-semibold gap-2"
            >
              <Share2 className="h-5 w-5" aria-hidden="true" />
              {t("Share Location", "Compartir Ubicación")}
            </Button>

            <Button
              asChild
              size="lg"
              variant="destructive"
              className="min-h-14 text-lg font-semibold gap-2"
            >
              <a href="tel:911">
                <Phone className="h-5 w-5" aria-hidden="true" />
                {t("Call 911", "Llamar 911")}
              </a>
            </Button>
          </div>

          <Button
            onClick={getLocation}
            variant="ghost"
            className="w-full gap-2"
          >
            <MapPin className="h-4 w-4" aria-hidden="true" />
            {t("Refresh Location", "Actualizar Ubicación")}
          </Button>
        </div>
      )}
    </section>
  );
}
