import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { MapPin, Loader2 } from "lucide-react";

interface FindNearMeButtonProps {
  onLocationFound: (lat: number, lng: number) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  onError: (message: string) => void;
}

export default function FindNearMeButton({
  onLocationFound,
  isLoading,
  setIsLoading,
  onError,
}: FindNearMeButtonProps) {
  const { t } = useLanguage();

  const handleClick = () => {
    if (!navigator.geolocation) {
      onError(
        t(
          "Geolocation is not supported by your browser",
          "La geolocalización no es compatible con su navegador"
        )
      );
      return;
    }

    setIsLoading(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setIsLoading(false);
        onLocationFound(position.coords.latitude, position.coords.longitude);
      },
      (error) => {
        setIsLoading(false);
        let message = "";
        switch (error.code) {
          case error.PERMISSION_DENIED:
            message = t(
              "Please allow location access to find resources near you",
              "Por favor permita el acceso a su ubicación para encontrar recursos cerca de usted"
            );
            break;
          case error.POSITION_UNAVAILABLE:
            message = t(
              "Location information is unavailable",
              "La información de ubicación no está disponible"
            );
            break;
          case error.TIMEOUT:
            message = t(
              "Location request timed out. Please try again",
              "La solicitud de ubicación expiró. Por favor intente de nuevo"
            );
            break;
          default:
            message = t(
              "An error occurred getting your location",
              "Ocurrió un error al obtener su ubicación"
            );
        }
        onError(message);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000,
      }
    );
  };

  return (
    <Button
      onClick={handleClick}
      disabled={isLoading}
      className="w-full max-w-md min-h-14 text-lg font-semibold"
      size="lg"
    >
      {isLoading ? (
        <>
          <Loader2 className="h-6 w-6 mr-2 animate-spin" aria-hidden="true" />
          <span>{t("Finding your location...", "Buscando su ubicación...")}</span>
        </>
      ) : (
        <>
          <MapPin className="h-6 w-6 mr-2" aria-hidden="true" />
          <span>{t("Find Resources Near Me", "Encontrar Recursos Cerca de Mí")}</span>
        </>
      )}
    </Button>
  );
}
