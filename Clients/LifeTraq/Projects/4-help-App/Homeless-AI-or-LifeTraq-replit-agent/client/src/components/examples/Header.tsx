import { LanguageProvider } from "@/contexts/LanguageContext";
import Header from "../Header";

export default function HeaderExample() {
  return (
    <LanguageProvider>
      <Header />
    </LanguageProvider>
  );
}
