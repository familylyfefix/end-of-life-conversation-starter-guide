
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PlaybookSales from "./pages/PlaybookSales";
import Funnel from "./pages/Funnel";
import Checkout from "./pages/Checkout";
import PaymentSuccess from "./pages/PaymentSuccess";
import ToolkitCheckout from "./pages/ToolkitCheckout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/guide" replace />} />
          <Route path="/guide" element={<Index />} />
          <Route path="/playbook" element={<PlaybookSales />} />
          <Route path="/funnel" element={<Funnel />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/toolkit-checkout" element={<ToolkitCheckout />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          {/* Backward compatibility redirects */}
          <Route path="/end-of-life-conversation-starter-guide" element={<Navigate to="/guide" replace />} />
          <Route path="/end-of-life-playbook" element={<Navigate to="/playbook" replace />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
