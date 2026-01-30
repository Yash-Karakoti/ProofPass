import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import CreateCredential from "./pages/CreateCredential";
import MyCredentials from "./pages/MyCredentials";
import GenerateProof from "./pages/GenerateProof";
import ProofDetails from "./pages/ProofDetails";
import VerifyProof from "./pages/VerifyProof";
import PrivacyModel from "./pages/PrivacyModel";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/create-credential" element={<CreateCredential />} />
          <Route path="/my-credentials" element={<MyCredentials />} />
          <Route path="/generate-proof" element={<GenerateProof />} />
          <Route path="/proof-details/:proofId?" element={<ProofDetails />} />
          <Route path="/verify-proof" element={<VerifyProof />} />
          <Route path="/privacy-model" element={<PrivacyModel />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
