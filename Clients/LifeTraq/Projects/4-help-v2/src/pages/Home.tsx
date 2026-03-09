import { useState, useMemo } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import Header from "@/components/Header";
import HopeAssistant from "@/components/HopeAssistant";
import FindNearMeButton from "@/components/FindNearMeButton";
import CategoryFilter from "@/components/CategoryFilter";
import ResourceList from "@/components/ResourceList";

import EmergencyLocation from "@/components/EmergencyLocation";
import { resources, type Resource } from "@/data/resources";
import { calculateDistance } from "@/lib/geolocation";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageCircle, List, MapPin } from "lucide-react";
import heroImage from "@/assets/village-hero.png";

export default function Home() {
  const { t } = useLanguage();
  const { toast } = useToast();

  const [selectedCategory, setSelectedCategory] = useState<Resource["category"] | "all">("all");
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [activeTab, setActiveTab] = useState("resources");

  const distances = useMemo(() => {
    const map = new Map<string, number>();
    if (userLocation) {
      resources.forEach((resource) => {
        if (resource.lat && resource.lng) {
          const dist = calculateDistance(
            userLocation.lat,
            userLocation.lng,
            resource.lat,
            resource.lng
          );
          map.set(resource.id, dist);
        }
      });
    }
    return map;
  }, [userLocation]);

  const filteredResources = useMemo(() => {
    if (selectedCategory === "all") {
      return resources;
    }
    return resources.filter((r) => r.category === selectedCategory);
  }, [selectedCategory]);

  const handleLocationFound = (lat: number, lng: number) => {
    setUserLocation({ lat, lng });
    toast({
      title: t("Location found!", "¡Ubicación encontrada!"),
      description: t(
        "Resources are now sorted by distance.",
        "Los recursos ahora están ordenados por distancia."
      ),
    });
  };

  const handleLocationError = (message: string) => {
    toast({
      title: t("Location Error", "Error de Ubicación"),
      description: message,
      variant: "destructive",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-4xl mx-auto px-4 pb-24">
        <section className="py-6" aria-labelledby="welcome-heading">
          <div className="relative rounded-xl overflow-hidden mb-6">
            <img
              src={heroImage}
              alt={t("Community members helping each other", "Miembros de la comunidad ayudándose mutuamente")}
              className="w-full h-40 md:h-56 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
              <h2
                id="welcome-heading"
                className="text-2xl md:text-3xl font-bold text-white mb-1"
              >
                {t("Welcome to 4-HELP", "Bienvenido a 4-HELP")}
              </h2>
              <p className="text-base md:text-lg text-white/90">
                {t(
                  "Powered by The Other Side Village",
                  "Desarrollado por The Other Side Village"
                )}
              </p>
            </div>
          </div>
        </section>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 min-h-14 mb-6">
            <TabsTrigger
              value="resources"
              className="min-h-12 text-sm font-medium gap-1"
            >
              <List className="h-4 w-4" aria-hidden="true" />
              {t("Resources", "Recursos")}
            </TabsTrigger>
            <TabsTrigger
              value="assistant"
              className="min-h-12 text-sm font-medium gap-1"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              {t("Chat", "Chat")}
            </TabsTrigger>
            <TabsTrigger
              value="emergency"
              className="min-h-12 text-sm font-medium gap-1 data-[state=active]:bg-destructive data-[state=active]:text-destructive-foreground"
            >
              <MapPin className="h-4 w-4" aria-hidden="true" />
              {t("SOS", "SOS")}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="resources" className="mt-0 space-y-6">
            <div className="flex justify-center">
              <FindNearMeButton
                onLocationFound={handleLocationFound}
                isLoading={isLoadingLocation}
                setIsLoading={setIsLoadingLocation}
                onError={handleLocationError}
              />
            </div>

            <CategoryFilter
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />

            <div className="flex items-center justify-between gap-2 flex-wrap">
              <h2 className="text-2xl font-semibold text-foreground">
                {t("Available Resources", "Recursos Disponibles")}
              </h2>
              <span className="text-sm text-muted-foreground">
                {filteredResources.length} {t("resources", "recursos")}
              </span>
            </div>

            <ResourceList resources={filteredResources} distances={distances} />
          </TabsContent>

          <TabsContent value="assistant" className="mt-0">
            <HopeAssistant />
          </TabsContent>

          <TabsContent value="emergency" className="mt-0">
            <EmergencyLocation />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
