
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { CartProvider } from "@/contexts/CartContext";
import { InventoryProvider } from "@/contexts/InventoryContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Onboarding from "./pages/Onboarding";
import Profile from "./pages/Profile";
import CropMatcherPage from "./pages/CropMatcher";
import MarketplacePage from "./pages/Marketplace";
import LandRentalPage from "./pages/LandRental";
import LandPlotMapPage from "./pages/LandPlotMap";
import WorkersPage from "./pages/Workers";
import HiredWorkersPage from "./pages/HiredWorkers";
import HireWorkerPage from "./pages/HireWorker";
import EndContractPage from "./pages/EndContract";
import InvestmentPage from "./pages/Investment";
import Farms from "./pages/Farms";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import InventoryPage from "./pages/Inventory";
import MessagesPage from "./pages/Messages";
import CommunityPage from "./pages/Community";
import Support from "./pages/Support";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <InventoryProvider>
        <CartProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/onboarding" element={<Onboarding />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/crop-matcher" element={<CropMatcherPage />} />
                <Route path="/marketplace" element={<MarketplacePage />} />
                <Route path="/land-rental" element={<LandRentalPage />} />
                <Route path="/land-plot-map/:plotId" element={<LandPlotMapPage />} />
                <Route path="/workers" element={<WorkersPage />} />
                <Route path="/hired-workers" element={<HiredWorkersPage />} />
                <Route path="/hire-worker/:workerId" element={<HireWorkerPage />} />
                <Route path="/end-contract/:workerId" element={<EndContractPage />} />
                <Route path="/investment" element={<InvestmentPage />} />
                <Route path="/farms" element={<Farms />} />
                <Route path="/inventory" element={<InventoryPage />} />
                <Route path="/messages" element={<MessagesPage />} />
                <Route path="/community" element={<CommunityPage />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/order-success" element={<OrderSuccess />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </CartProvider>
      </InventoryProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
