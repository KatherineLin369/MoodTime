import { useAuth } from "@/hooks/use-auth";
import { useMoods } from "@/hooks/use-moods";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SmilePlus, ArrowRight, MessageCircle } from "lucide-react";
import { Link } from "wouter";
import { format } from "date-fns";
import { motion } from "framer-motion";

export default function Home() {
  const { user } = useAuth();
  const { data: moods } = useMoods();
  
  // Simple "quote of the day" - in a real app this could fetch from an API
  const quote = {
    text: "You don't have to control your thoughts. You just have to stop letting them control you.",
    author: "Dan Millman"
  };

  const recentMood = moods && moods.length > 0 ? moods[moods.length - 1] : null;

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-slate-800">
            Welcome back, {user?.firstName || 'Friend'}
          </h1>
          <p className="text-slate-500 mt-1">
            {format(new Date(), "EEEE, MMMM do")} • How are you feeling today?
          </p>
        </div>
        <Link href="/mood">
          <Button className="rounded-full shadow-lg shadow-primary/25 bg-primary hover:bg-primary/90 transition-all">
            <SmilePlus className="w-4 h-4 mr-2" />
            Check In Now
          </Button>
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Daily Inspiration */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:col-span-2"
        >
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-8 text-white shadow-xl shadow-indigo-200 relative overflow-hidden h-full flex flex-col justify-center">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16" />
            <div className="relative z-10">
              <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-medium mb-4 backdrop-blur-sm">
                Daily Inspiration
              </span>
              <blockquote className="text-2xl md:text-3xl font-display font-medium leading-relaxed">
                "{quote.text}"
              </blockquote>
              <footer className="mt-4 opacity-80 font-medium">— {quote.author}</footer>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <Link href="/chat">
            <motion.div 
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-card rounded-3xl p-6 cursor-pointer hover:border-primary/30 transition-all group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-primary transition-colors" />
              </div>
              <h3 className="font-bold text-lg text-slate-800">AI Therapist</h3>
              <p className="text-sm text-slate-500 mt-1">Talk through your feelings in a safe space.</p>
            </motion.div>
          </Link>

          <Link href="/games">
            <motion.div 
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card rounded-3xl p-6 cursor-pointer hover:border-green-400/30 transition-all group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                  <SmilePlus className="w-5 h-5" />
                </div>
                <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-green-500 transition-colors" />
              </div>
              <h3 className="font-bold text-lg text-slate-800">Relax & Play</h3>
              <p className="text-sm text-slate-500 mt-1">Mini-games to calm your mind.</p>
            </motion.div>
          </Link>
        </div>
      </div>

      {/* Recent Activity / Stats Placeholder */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card rounded-3xl p-8"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold font-display text-slate-800">Your Journey</h2>
          <Link href="/mood" className="text-sm font-medium text-primary hover:text-primary/80">View Full History</Link>
        </div>
        
        {recentMood ? (
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="text-4xl">
              {recentMood.value === 5 ? '🤩' : recentMood.value === 4 ? '🙂' : recentMood.value === 3 ? '😐' : recentMood.value === 2 ? '😕' : '😢'}
            </div>
            <div>
              <div className="font-semibold text-slate-800">Last Check-in</div>
              <div className="text-sm text-slate-500">{format(new Date(recentMood.createdAt), "MMM d, h:mm a")}</div>
            </div>
            <div className="ml-auto flex gap-2">
              {recentMood.emotions.map(e => (
                <span key={e} className="px-3 py-1 bg-white rounded-full text-xs border border-slate-200 text-slate-600">
                  {e}
                </span>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-10 text-slate-400">
            <p>No check-ins yet. Start your journey today!</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
