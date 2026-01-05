import { useAuth } from "@/hooks/use-auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogOut, User, Settings, Award } from "lucide-react";
import { format } from "date-fns";

export default function Profile() {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <header className="text-center space-y-4">
        <Avatar className="w-32 h-32 mx-auto border-4 border-white shadow-xl">
          <AvatarImage src={user.profileImageUrl || undefined} />
          <AvatarFallback className="text-4xl bg-primary/10 text-primary">
            {user.firstName?.[0]}{user.lastName?.[0]}
          </AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-bold font-display text-slate-800">
            {user.firstName} {user.lastName}
          </h1>
          <p className="text-slate-500">@{user.username || user.email?.split('@')[0]}</p>
        </div>
      </header>

      <div className="glass-card rounded-3xl overflow-hidden divide-y divide-slate-100">
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-slate-100 p-2 rounded-lg text-slate-600">
              <User className="w-5 h-5" />
            </div>
            <div>
              <div className="font-medium text-slate-800">Member Since</div>
              <div className="text-sm text-slate-500">
                {user.createdAt ? format(new Date(user.createdAt), "MMMM yyyy") : 'Unknown'}
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-amber-100 p-2 rounded-lg text-amber-600">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="font-medium text-slate-800">Wellness Streak</div>
              <div className="text-sm text-slate-500">3 Days (Keep it up!)</div>
            </div>
          </div>
        </div>
        
        <div className="p-6 flex items-center justify-between opacity-50">
          <div className="flex items-center gap-4">
            <div className="bg-slate-100 p-2 rounded-lg text-slate-600">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <div className="font-medium text-slate-800">Preferences</div>
              <div className="text-sm text-slate-500">Coming soon</div>
            </div>
          </div>
        </div>
      </div>

      <Button 
        variant="destructive" 
        onClick={() => logout()} 
        className="w-full h-12 rounded-xl"
      >
        <LogOut className="w-4 h-4 mr-2" />
        Sign Out
      </Button>
    </div>
  );
}
