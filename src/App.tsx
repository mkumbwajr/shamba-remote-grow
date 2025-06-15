
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import { InventoryProvider } from "./contexts/InventoryContext";
import { CartProvider } from "./contexts/CartContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import Onboarding from "./pages/Onboarding";
import Farms from "./pages/Farms";
import Workers from "./pages/Workers";
import HireWorker from "./pages/HireWorker";
import HiredWorkers from "./pages/HiredWorkers";
import EndContract from "./pages/EndContract";
import Marketplace from "./pages/Marketplace";
import ProductDetails from "./pages/ProductDetails";
import Inventory from "./pages/Inventory";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import Investment from "./pages/Investment";
import LandRental from "./pages/LandRental";
import LandPlotMap from "./pages/LandPlotMap";
import CropMatcher from "./pages/CropMatcher";
import Community from "./pages/Community";
import Messages from "./pages/Messages";
import News from "./pages/News";
import Support from "./pages/Support";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <InventoryProvider>
          <CartProvider>
            <TooltipProvider>
              <Toaster />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/onboarding" element={<Onboarding />} />
                  <Route path="/farms" element={<Farms />} />
                  <Route path="/workers" element={<Workers />} />
                  <Route path="/hire-worker/:workerId" element={<HireWorker />} />
                  <Route path="/hired-workers" element={<HiredWorkers />} />
                  <Route path="/end-contract/:contractId" element={<EndContract />} />
                  <Route path="/marketplace" element={<Marketplace />} />
                  <Route path="/product/:id" element={<ProductDetails />} />
                  <Route path="/inventory" element={<Inventory />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/order-success" element={<OrderSuccess />} />
                  <Route path="/investment" element={<Investment />} />
                  <Route path="/land-rental" element={<LandRental />} />
                  <Route path="/land-plot/:id" element={<LandPlotMap />} />
                  <Route path="/crop-matcher" element={<CropMatcher />} />
                  <Route path="/community" element={<Community />} />
                  <Route path="/messages" element={<Messages />} />
                  <Route path="/news" element={<News />} />
                  <Route path="/support" element={<Support />} />
                  <Route path="/admin" element={<Admin />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </TooltipProvider>
          </CartProvider>
        </InventoryProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
