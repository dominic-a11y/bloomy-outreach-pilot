import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WarmupProvider } from "@/contexts/WarmupContext";
import { AppLayout } from "./components/AppLayout";
import Dashboard from "./pages/Dashboard";
import WarmupHome from "./pages/WarmupHome";
import AccountWarmupDetail from "./pages/AccountWarmupDetail";
import Templates from "./pages/Templates";
import Accounts from "./pages/Accounts";
import Leads from "./pages/Leads";

import Messages from "./pages/Messages";
import AIStudio from "./pages/AIStudio";
import Analytics from "./pages/Analytics";
import Content from "./pages/Content";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <WarmupProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppLayout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/warmup" element={<WarmupHome />} />
              <Route path="/warmup/account/:accountId" element={<AccountWarmupDetail />} />
              <Route path="/warmup/templates" element={<Templates />} />
              <Route path="/accounts" element={<Accounts />} />
              <Route path="/leads" element={<Leads />} />
              
              <Route path="/messages" element={<Messages />} />
              <Route path="/ai-studio" element={<AIStudio />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/content" element={<Content />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AppLayout>
        </BrowserRouter>
      </TooltipProvider>
    </WarmupProvider>
  </QueryClientProvider>
);

export default App;
