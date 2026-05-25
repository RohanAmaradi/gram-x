import Home from "./pages/home";
import Market from "./pages/market";
import MarketDetail from "./pages/market-detail";
import Schemes from "./pages/schemes";
import Equipment from "./pages/equipment";
import Expenses from "./pages/expenses";
import Livestock from "./pages/livestock";
import Marketplace from "./pages/marketplace";
import AiChat from "./pages/ai";
import CropAdvisor from "./pages/crop-advisor";
import Weather from "./pages/weather";

import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { Layout } from "@/components/layout";
import { LanguageProvider } from "@/contexts/language-context";

const queryClient = new QueryClient();

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/market" component={Market} />
        <Route path="/market/:id" component={MarketDetail} />
        <Route path="/schemes" component={Schemes} />
        <Route path="/equipment" component={Equipment} />
        <Route path="/expenses" component={Expenses} />
        <Route path="/livestock" component={Livestock} />
        <Route path="/marketplace" component={Marketplace} />
        <Route path="/ai" component={AiChat} />
        <Route path="/crop-advisor" component={CropAdvisor} />
        <Route path="/weather" component={Weather} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LanguageProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </LanguageProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
