import { useLanguage } from "@/contexts/LanguageContext";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { type Resource, categoryLabels } from "@/data/resources";
import { MapPin, Phone, FileText, ChevronDown, ChevronUp, ExternalLink, ThumbsUp } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface ResourceCardProps {
  resource: Resource;
  distance?: number | null;
}

const categoryColors: Record<Resource["category"], string> = {
  shelter: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  food: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  medical: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  legal: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  youth: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  housing: "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200",
  other: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200",
};

export default function ResourceCard({ resource, distance }: ResourceCardProps) {
  const { language, t } = useLanguage();
  const [expanded, setExpanded] = useState(false);

  const name = language === "en" ? resource.name : resource.nameEs;
  const whoServed = language === "en" ? resource.whoServed : resource.whoServedEs;
  const documentsNeeded = language === "en" ? resource.documentsNeeded : resource.documentsNeededEs;
  const notes = language === "en" ? resource.notes : resource.notesEs;
  const whatWorksWell = language === "en" ? resource.whatWorksWell : resource.whatWorksWellEs;
  const categoryLabel = categoryLabels[resource.category][language];

  const formatDistance = (d: number) => {
    if (d < 1) {
      return `${Math.round(d * 5280)} ft`;
    }
    return `${d.toFixed(1)} mi`;
  };

  const handleNavigate = () => {
    const encoded = encodeURIComponent(resource.address);
    window.open(`https://maps.google.com/?q=${encoded}`, "_blank");
  };

  return (
    <Card className="p-6 shadow-md">
      <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
        <h3 className="text-xl font-semibold text-foreground leading-tight">
          {name}
        </h3>
        <Badge className={`${categoryColors[resource.category]} text-xs uppercase font-medium`}>
          {categoryLabel}
        </Badge>
      </div>

      {distance !== null && distance !== undefined && (
        <div className="flex items-center gap-1 mb-3 text-sm font-medium text-muted-foreground">
          <MapPin className="h-4 w-4" aria-hidden="true" />
          <span>{formatDistance(distance)}</span>
        </div>
      )}

      <p className="text-base text-muted-foreground mb-4">{whoServed}</p>

      <a
        href={`tel:${resource.phone}`}
        className="flex items-center gap-3 min-h-12 px-4 py-3 mb-3 rounded-md bg-primary text-primary-foreground font-medium text-lg"
        aria-label={t(`Call ${resource.phone}`, `Llamar al ${resource.phone}`)}
      >
        <Phone className="h-5 w-5" aria-hidden="true" />
        <span>{resource.phone}</span>
      </a>

      <button
        onClick={handleNavigate}
        className="flex items-center gap-3 w-full min-h-12 px-4 py-3 mb-4 rounded-md bg-secondary text-secondary-foreground font-medium text-base text-left"
        aria-label={t(`Navigate to ${resource.address}`, `Navegar a ${resource.address}`)}
      >
        <MapPin className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
        <span className="line-clamp-2">{resource.address}</span>
      </button>

      {whatWorksWell && (
        <div className="flex items-start gap-2 mb-4 p-3 rounded-md bg-green-50 dark:bg-green-950/30">
          <ThumbsUp className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" aria-hidden="true" />
          <p className="text-sm text-green-800 dark:text-green-300 italic">{whatWorksWell}</p>
        </div>
      )}

      <Button
        variant="ghost"
        onClick={() => setExpanded(!expanded)}
        className="w-full min-h-12 justify-between text-base font-medium"
        aria-expanded={expanded}
      >
        <span>{t("More Details", "Más Detalles")}</span>
        {expanded ? (
          <ChevronUp className="h-5 w-5" aria-hidden="true" />
        ) : (
          <ChevronDown className="h-5 w-5" aria-hidden="true" />
        )}
      </Button>

      {expanded && (
        <div className="mt-4 pt-4 border-t space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-1 text-sm font-medium text-muted-foreground">
              <FileText className="h-4 w-4" aria-hidden="true" />
              <span>{t("Documents Needed", "Documentos Necesarios")}</span>
            </div>
            <p className="text-base text-foreground">{documentsNeeded}</p>
          </div>

          {notes && (
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">
                {t("Notes", "Notas")}
              </p>
              <p className="text-base text-foreground">{notes}</p>
            </div>
          )}

          {resource.link && (
            <a
              href={resource.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 min-h-12 text-base font-medium text-primary"
            >
              <ExternalLink className="h-5 w-5" aria-hidden="true" />
              <span>{t("Visit Website", "Visitar Sitio Web")}</span>
            </a>
          )}
        </div>
      )}
    </Card>
  );
}
