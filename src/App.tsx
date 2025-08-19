import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "./components/AppLayout";
import Dashboard from "./pages/Dashboard";
import Campaigns from "./pages/Campaigns";
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
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/campaigns" element={<Campaigns />} />
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
  </QueryClientProvider>
);

export default App;
