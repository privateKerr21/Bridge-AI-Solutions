import { useState } from "react";
import { LanguageProvider } from "@/contexts/LanguageContext";
import CategoryFilter from "../CategoryFilter";
import { type Resource } from "@/data/resources";

export default function CategoryFilterExample() {
  const [selected, setSelected] = useState<Resource["category"] | "all">("all");

  return (
    <LanguageProvider>
      <CategoryFilter 
        selectedCategory={selected} 
        onCategoryChange={setSelected} 
      />
    </LanguageProvider>
  );
}
