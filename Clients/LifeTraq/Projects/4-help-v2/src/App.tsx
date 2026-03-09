import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Home from "@/pages/Home";

function App() {
  return (
    <TooltipProvider>
      <LanguageProvider>
        <Toaster />
        <Home />
      </LanguageProvider>
    </TooltipProvider>
  );
}

export default App;
