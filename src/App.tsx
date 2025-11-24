import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { OpenersProvider } from "@/contexts/OpenersContext";
import { AppLayout } from "./components/AppLayout";
import Dashboard from "./pages/Dashboard";
import Accounts from "./pages/Accounts";
import Leads from "./pages/Leads";
import Messages from "./pages/Messages";
import AIStudio from "./pages/AIStudio";
import OpenersHome from "./pages/OpenersHome";
import OpenerEditor from "./pages/OpenerEditor";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <OpenersProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppLayout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/accounts" element={<Accounts />} />
              <Route path="/leads" element={<Leads />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/ai-studio" element={<AIStudio />} />
              <Route path="/openers" element={<OpenersHome />} />
              <Route path="/openers/new" element={<OpenerEditor />} />
              <Route path="/openers/edit/:openerId" element={<OpenerEditor />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AppLayout>
        </BrowserRouter>
      </TooltipProvider>
    </OpenersProvider>
  </QueryClientProvider>
);

export default App;
