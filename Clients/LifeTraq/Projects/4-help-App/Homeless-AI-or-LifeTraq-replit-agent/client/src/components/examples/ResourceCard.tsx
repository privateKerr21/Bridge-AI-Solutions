import { LanguageProvider } from "@/contexts/LanguageContext";
import ResourceCard from "../ResourceCard";
import { type Resource } from "@/data/resources";

// todo: remove mock functionality
const mockResource: Resource = {
  id: "1",
  name: "Fourth Street Clinic",
  nameEs: "Clínica Fourth Street",
  category: "medical",
  whoServed: "People experiencing homelessness",
  whoServedEs: "Personas sin hogar",
  address: "404 S 400 W, SLC",
  phone: "801-364-0058",
  documentsNeeded: "Medical intake; ID helpful but not always required",
  documentsNeededEs: "Admisión médica; identificación útil pero no siempre requerida",
  whatWorksWell: "Compassionate and Professional Staff",
  whatWorksWellEs: "Personal compasivo y profesional",
  negativeNotes: "",
  link: "https://fourthstreetclinic.org/",
  notes: "Medical, dental, behavioral health",
  notesEs: "Salud médica, dental y conductual",
  lat: 40.7591,
  lng: -111.9006
};

export default function ResourceCardExample() {
  return (
    <LanguageProvider>
      <div className="max-w-md mx-auto">
        <ResourceCard resource={mockResource} distance={0.8} />
      </div>
    </LanguageProvider>
  );
}
