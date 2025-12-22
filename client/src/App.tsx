import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/use-auth";
import { Sidebar, MobileHeader } from "@/components/Navigation";
import { Loader2 } from "lucide-react";

// Pages
import Landing from "@/pages/Landing";
import Home from "@/pages/Home";
import MoodJournal from "@/pages/MoodJournal";
import AIChat from "@/pages/AIChat";
import Games from "@/pages/Games";
import Resources from "@/pages/Resources";
import Profile from "@/pages/Profile";
import NotFound from "@/pages/not-found";

function ProtectedRoute({ component: Component }: { component: React.ComponentType }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect logic handled inside useAuth or typically we render Landing
    // But for cleaner UX, let's just return Landing here if on a protected route
    return <Landing />;
  }

  return (
    <div className="flex min-h-screen bg-slate-50/50">
      <Sidebar />
      <div className="flex-1 flex flex-col md:ml-64 min-h-screen">
        <MobileHeader />
        <main className="flex-1 p-4 md:p-8 overflow-x-hidden">
          <Component />
        </main>
      </div>
    </div>
  );
}

function Router() {
  const { isAuthenticated, isLoading } = useAuth();
  const [location] = useLocation();

  if (isLoading) return null;

  // Public route
  if (!isAuthenticated) {
    return (
      <Switch>
        <Route path="/" component={Landing} />
        {/* Redirect any other path to landing for unauth users */}
        <Route component={Landing} />
      </Switch>
    );
  }

  // Protected routes
  return (
    <Switch>
      <Route path="/" component={() => <ProtectedRoute component={Home} />} />
      <Route path="/mood" component={() => <ProtectedRoute component={MoodJournal} />} />
      <Route path="/chat" component={() => <ProtectedRoute component={AIChat} />} />
      <Route path="/games" component={() => <ProtectedRoute component={Games} />} />
      <Route path="/resources" component={() => <ProtectedRoute component={Resources} />} />
      <Route path="/profile" component={() => <ProtectedRoute component={Profile} />} />
      <Route component={() => <ProtectedRoute component={NotFound} />} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
