import { useLanguage } from "@/contexts/LanguageContext";
import ResourceCard from "./ResourceCard";
import { type Resource } from "@/data/resources";
import { Inbox } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface ResourceListProps {
  resources: Resource[];
  distances: Map<string, number>;
  isLoading?: boolean;
}

function ResourceSkeleton() {
  return (
    <div className="p-6 rounded-xl border bg-card">
      <div className="flex items-start justify-between gap-2 mb-3">
        <Skeleton className="h-7 w-48" />
        <Skeleton className="h-5 w-16" />
      </div>
      <Skeleton className="h-4 w-24 mb-3" />
      <Skeleton className="h-5 w-64 mb-4" />
      <Skeleton className="h-12 w-full mb-3" />
      <Skeleton className="h-12 w-full mb-4" />
      <Skeleton className="h-12 w-full" />
    </div>
  );
}

export default function ResourceList({ resources, distances, isLoading }: ResourceListProps) {
  const { t } = useLanguage();

  if (isLoading) {
    return (
      <div className="space-y-4">
        <ResourceSkeleton />
        <ResourceSkeleton />
        <ResourceSkeleton />
      </div>
    );
  }

  if (resources.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <Inbox className="h-16 w-16 text-muted-foreground mb-4" aria-hidden="true" />
        <h3 className="text-xl font-semibold text-foreground mb-2">
          {t("No Resources Found", "No Se Encontraron Recursos")}
        </h3>
        <p className="text-base text-muted-foreground max-w-sm">
          {t(
            "Try selecting a different category or check back later.",
            "Intente seleccionar una categoría diferente o vuelva más tarde."
          )}
        </p>
      </div>
    );
  }

  const sortedResources = [...resources].sort((a, b) => {
    const distA = distances.get(a.id);
    const distB = distances.get(b.id);

    if (distA !== undefined && distB !== undefined) {
      return distA - distB;
    }
    if (distA !== undefined) return -1;
    if (distB !== undefined) return 1;
    return 0;
  });

  return (
    <div className="space-y-4" role="list" aria-label={t("Resources", "Recursos")}>
      {sortedResources.map((resource) => (
        <div key={resource.id} role="listitem">
          <ResourceCard
            resource={resource}
            distance={distances.get(resource.id) ?? null}
          />
        </div>
      ))}
    </div>
  );
}
