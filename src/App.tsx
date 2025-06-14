
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import CropMatcherPage from "./pages/CropMatcher";
import MarketplacePage from "./pages/Marketplace";
import LandRentalPage from "./pages/LandRental";
import WorkersPage from "./pages/Workers";
import HiredWorkersPage from "./pages/HiredWorkers";
import InvestmentPage from "./pages/Investment";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/crop-matcher" element={<CropMatcherPage />} />
            <Route path="/marketplace" element={<MarketplacePage />} />
            <Route path="/land-rental" element={<LandRentalPage />} />
            <Route path="/workers" element={<WorkersPage />} />
            <Route path="/hired-workers" element={<HiredWorkersPage />} />
            <Route path="/investment" element={<InvestmentPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
