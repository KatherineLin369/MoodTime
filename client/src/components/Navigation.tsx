import { Link, useLocation } from "wouter";
import { 
  Home, 
  Smile, 
  MessageCircleHeart, 
  Gamepad2, 
  BookOpen, 
  User, 
  LogOut,
  Menu
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const NAV_ITEMS = [
  { icon: Home, label: "Home", href: "/" },
  { icon: Smile, label: "Mood Journal", href: "/mood" },
  { icon: MessageCircleHeart, label: "AI Therapist", href: "/chat" },
  { icon: Gamepad2, label: "Relaxation", href: "/games" },
  { icon: BookOpen, label: "Resources", href: "/resources" },
  { icon: User, label: "Profile", href: "/profile" },
];

export function Sidebar() {
  const [location] = useLocation();
  const { logout } = useAuth();

  return (
    <div className="hidden md:flex flex-col w-64 h-screen bg-white border-r border-border fixed left-0 top-0 z-20 shadow-sm">
      <div className="p-8 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
          <Smile className="w-5 h-5" />
        </div>
        <span className="text-2xl font-bold font-display text-slate-800 tracking-tight">MoodTime</span>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-2">
        {NAV_ITEMS.map((item) => {
          const isActive = location === item.href;
          return (
            <Link key={item.href} href={item.href} className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group font-medium",
              isActive 
                ? "bg-primary text-primary-foreground shadow-md shadow-primary/20" 
                : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
            )}>
              <item.icon className={cn("w-5 h-5", isActive ? "stroke-[2.5px]" : "stroke-2")} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <button 
          onClick={() => logout()}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-slate-500 hover:bg-red-50 hover:text-red-600 transition-colors duration-200"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Sign Out</span>
        </button>
      </div>
    </div>
  );
}

export function MobileHeader() {
  const [open, setOpen] = useState(false);
  const [location] = useLocation();
  const { logout } = useAuth();

  return (
    <div className="md:hidden flex items-center justify-between p-4 bg-white/80 backdrop-blur-md border-b sticky top-0 z-30">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
          <Smile className="w-5 h-5" />
        </div>
        <span className="text-xl font-bold font-display text-slate-800">MoodTime</span>
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="w-6 h-6 text-slate-600" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-72 p-0">
          <div className="flex flex-col h-full bg-white">
            <div className="p-6 border-b">
              <span className="text-2xl font-bold font-display text-slate-800">MoodTime</span>
            </div>
            <nav className="flex-1 px-4 py-6 space-y-2">
              {NAV_ITEMS.map((item) => (
                <Link 
                  key={item.href} 
                  href={item.href} 
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium",
                    location === item.href
                      ? "bg-primary text-primary-foreground shadow-md shadow-primary/20" 
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="p-4 border-t">
              <button 
                onClick={() => {
                  logout();
                  setOpen(false);
                }}
                className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-slate-500 hover:bg-red-50 hover:text-red-600"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Sign Out</span>
              </button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
