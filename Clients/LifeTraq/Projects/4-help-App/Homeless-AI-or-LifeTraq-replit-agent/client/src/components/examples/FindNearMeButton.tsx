import { useState } from "react";
import { LanguageProvider } from "@/contexts/LanguageContext";
import FindNearMeButton from "../FindNearMeButton";

export default function FindNearMeButtonExample() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LanguageProvider>
      <div className="flex justify-center">
        <FindNearMeButton
          onLocationFound={(lat, lng) => console.log("Location found:", lat, lng)}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          onError={(msg) => console.error(msg)}
        />
      </div>
    </LanguageProvider>
  );
}
