import { LanguageProvider } from "@/contexts/LanguageContext";
import ResourceList from "../ResourceList";
import { resources } from "@/data/resources";

export default function ResourceListExample() {
  // todo: remove mock functionality
  const mockDistances = new Map<string, number>();
  mockDistances.set("1", 0.3);
  mockDistances.set("2", 1.2);
  mockDistances.set("3", 2.5);

  return (
    <LanguageProvider>
      <div className="max-w-md mx-auto">
        <ResourceList 
          resources={resources.slice(0, 3)} 
          distances={mockDistances}
        />
      </div>
    </LanguageProvider>
  );
}
