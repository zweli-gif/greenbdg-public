import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";

// Pages
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SetupChecklist from "./pages/SetupChecklist";
import OnboardingBuildings from "./pages/OnboardingBuildings";
import OnboardingStaff from "./pages/OnboardingStaff";
import MagicLinkSent from "./pages/MagicLinkSent";
import MagicLinkLanding from "./pages/MagicLinkLanding";
import PasswordSetup from "./pages/PasswordSetup";
import FMDashboard from "./pages/FMDashboard";
import CFODashboard from "./pages/CFODashboard";
import SustainabilityDashboard from "./pages/SustainabilityDashboard";
import PortfolioDashboard from "./pages/PortfolioDashboard";
import BuildingDashboard from "./pages/BuildingDashboard";
import TenantPortal from "./pages/TenantPortal";
import TenantFaultReporting from "./pages/TenantFaultReporting";
import Roadmap from "./pages/Roadmap";
import NotFound from "./pages/NotFound";

function Router() {
  return (
    <Switch>
      {/* Public */}
      <Route path="/" component={Home} />
      <Route path="/roadmap" component={Roadmap} />

      {/* Onboarding flow */}
      <Route path="/signin" component={SignIn} />
      <Route path="/onboarding/checklist" component={SetupChecklist} />
      <Route path="/onboarding/buildings" component={OnboardingBuildings} />
      <Route path="/onboarding/staff" component={OnboardingStaff} />
      <Route path="/onboarding/magic-link-sent" component={MagicLinkSent} />
      <Route path="/onboarding/magic-link-landing" component={MagicLinkLanding} />
      <Route path="/onboarding/password-setup" component={PasswordSetup} />

      {/* Dashboards */}
      <Route path="/dashboard/fm" component={FMDashboard} />
      <Route path="/dashboard/cfo" component={CFODashboard} />
      <Route path="/dashboard/sustainability" component={SustainabilityDashboard} />
      <Route path="/dashboard/portfolio" component={PortfolioDashboard} />
      <Route path="/dashboard/building" component={BuildingDashboard} />
      <Route path="/dashboard/tenant" component={TenantPortal} />
      <Route path="/dashboard/tenant/fault" component={TenantFaultReporting} />

      {/* Fallback */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
