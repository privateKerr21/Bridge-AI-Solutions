import { LanguageProvider } from "@/contexts/LanguageContext";
import ChippAssistant from "../ChippAssistant";

export default function ChippAssistantExample() {
  return (
    <LanguageProvider>
      <div className="max-w-2xl mx-auto">
        <ChippAssistant />
      </div>
    </LanguageProvider>
  );
}
