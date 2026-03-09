import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { type Resource, categoryLabels } from "@/data/resources";
import { Home, Utensils, Stethoscope, Scale, Users, Building, LayoutGrid } from "lucide-react";

interface CategoryFilterProps {
  selectedCategory: Resource["category"] | "all";
  onCategoryChange: (category: Resource["category"] | "all") => void;
}

const categoryIcons: Record<Resource["category"] | "all", typeof Home> = {
  all: LayoutGrid,
  shelter: Home,
  food: Utensils,
  medical: Stethoscope,
  legal: Scale,
  youth: Users,
  housing: Building,
  other: LayoutGrid,
};

export default function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  const { language, t } = useLanguage();

  const categories: Array<Resource["category"] | "all"> = [
    "all",
    "shelter",
    "food",
    "medical",
    "legal",
    "youth",
    "housing",
  ];

  return (
    <div
      className="w-full overflow-x-auto pb-2 -mx-4 px-4"
      role="group"
      aria-label={t("Filter by category", "Filtrar por categoría")}
    >
      <div className="flex gap-2 min-w-max">
        {categories.map((category) => {
          const Icon = categoryIcons[category];
          const isSelected = selectedCategory === category;
          const label =
            category === "all"
              ? t("All", "Todos")
              : categoryLabels[category][language];

          return (
            <Button
              key={category}
              onClick={() => onCategoryChange(category)}
              variant={isSelected ? "default" : "outline"}
              className="min-h-12 px-4 text-sm font-medium rounded-full whitespace-nowrap"
              aria-pressed={isSelected}
            >
              <Icon className="h-4 w-4 mr-2" aria-hidden="true" />
              {label}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
