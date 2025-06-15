
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from './contexts/LanguageContext';
import { CartProvider } from './contexts/CartContext';
import { InventoryProvider } from './contexts/InventoryContext';
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Onboarding from "./pages/Onboarding";
import Profile from "./pages/Profile";
import Farms from "./pages/Farms";
import Marketplace from "./pages/Marketplace";
import ProductDetails from "./pages/ProductDetails";
import Community from "./pages/Community";
import News from "./pages/News";
import Messages from "./pages/Messages";
import Workers from "./pages/Workers";
import HiredWorkers from "./pages/HiredWorkers";
import HireWorker from "./pages/HireWorker";
import EndContract from "./pages/EndContract";
import Investment from "./pages/Investment";
import Inventory from "./pages/Inventory";
import LandRental from "./pages/LandRental";
import LandPlotMap from "./pages/LandPlotMap";
import CropMatcher from "./pages/CropMatcher";
import Support from "./pages/Support";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <CartProvider>
          <InventoryProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/onboarding" element={<Onboarding />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/farms" element={<Farms />} />
                  <Route path="/marketplace" element={<Marketplace />} />
                  <Route path="/product/:productId" element={<ProductDetails />} />
                  <Route path="/community" element={<Community />} />
                  <Route path="/news" element={<News />} />
                  <Route path="/messages" element={<Messages />} />
                  <Route path="/workers" element={<Workers />} />
                  <Route path="/hired-workers" element={<HiredWorkers />} />
                  <Route path="/hire-worker/:workerId" element={<HireWorker />} />
                  <Route path="/end-contract/:workerId" element={<EndContract />} />
                  <Route path="/investment" element={<Investment />} />
                  <Route path="/inventory" element={<Inventory />} />
                  <Route path="/land-rental" element={<LandRental />} />
                  <Route path="/land-plot/:plotId" element={<LandPlotMap />} />
                  <Route path="/crop-matcher" element={<CropMatcher />} />
                  <Route path="/support" element={<Support />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/order-success" element={<OrderSuccess />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </TooltipProvider>
          </InventoryProvider>
        </CartProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
