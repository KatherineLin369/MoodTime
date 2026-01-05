import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/use-auth";
import { Sidebar, MobileHeader } from "@/components/Navigation";
import { Loader2 } from "lucide-react";

// Existing pages
import Landing from "@/pages/Landing";
import Home from "@/pages/Home";
import MoodJournal from "@/pages/MoodJournal";
import AIChat from "@/pages/AIChat";
import Games from "@/pages/Games";
import Resources from "@/pages/Resources";
import Profile from "@/pages/Profile";
import NotFound from "@/pages/not-found";

// NEW pages
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import Dashboard from "@/pages/Dashboard";

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

  // PUBLIC ROUTES
  if (!isAuthenticated) {
    return (
      <Switch>
        <Route path="/" component={Landing} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route component={Landing} />
      </Switch>
    );
  }

  // PROTECTED ROUTES
  return (
    <Switch>
      <Route path="/" component={() => <ProtectedRoute component={Home} />} />
      <Route path="/dashboard" component={() => <ProtectedRoute component={Dashboard} />} />
      <Route path="/mood" component={() => <ProtectedRoute component={MoodJournal} />} />
      <Route path="/chat" component={() => <ProtectedRoute component={AIChat} />} />
      <Route path="/games" component={() => <ProtectedRoute component={Games} />} />
      <Route path="/resources" component={() => <ProtectedRoute component={Resources} />} />
      <Route path="/profile" component={() => <ProtectedRoute component={Profile} />} />
      <Route component={() => <ProtectedRoute component={NotFound} />} />
    </Switch>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
