import circleLogo from "@assets/IMG_1476_1766455685060.jpeg";
import { Button } from "@/components/ui/button";
import { Shield, HeartHandshake, Sparkles, Smile } from "lucide-react";
import { motion } from "framer-motion";
import moodTimeDesign from "@assets/IMG_1475_1766455685060.jpeg";

export default function Landing() {
  const handleLogin = () => {
    window.location.href = "/api/login";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent/20 via-white to-secondary/20 flex flex-col">
      <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <img src={circleLogo} alt="Logo" className="w-10 h-10 object-contain rounded-full mix-blend-multiply" />
          <span className="text-2xl font-bold font-display text-slate-800">MoodTime</span>
        </div>
        <Button onClick={handleLogin} variant="outline" className="rounded-full px-6 border-primary/20 text-primary hover:bg-primary/5">
          Sign In
        </Button>
      </nav>

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-20 text-center relative overflow-hidden">
        {/* Decorative background blobs */}
        <div className="absolute top-1/4 -left-20 w-72 h-72 bg-secondary/40 rounded-full blur-3xl mix-blend-multiply animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-primary/40 rounded-full blur-3xl mix-blend-multiply animate-pulse" style={{ animationDelay: "1s" }} />

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto space-y-8 relative z-10"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center mb-8 relative"
          >
            {/* Blended Logo with Glow */}
            <div className="absolute inset-0 bg-primary/30 rounded-full blur-[120px] animate-pulse" />
            <div className="relative z-10 p-4 rounded-[4rem] bg-white/10 backdrop-blur-sm border border-white/20 shadow-2xl">
              <img 
                src={moodTimeDesign} 
                alt="MoodTime" 
                className="h-64 object-contain mix-blend-multiply" 
              />
            </div>
          </motion.div>
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-100 shadow-sm text-sm font-medium text-slate-600 mb-4">
            <Sparkles className="w-4 h-4 text-accent" />
            <span>Your safe space for mental wellness</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold font-display text-slate-800 leading-tight tracking-tight">
            Find your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">calm</span> in the chaos.
          </h1>
          
          <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Track your moods, chat with our AI companion, and discover personalized activities to help you feel your best.
          </p>

          <div className="pt-8">
            <Button 
              onClick={handleLogin} 
              size="lg" 
              className="rounded-full px-12 py-8 text-xl shadow-xl shadow-primary/25 hover:shadow-2xl hover:scale-105 transition-all duration-300 bg-gradient-to-r from-primary to-secondary border-0"
            >
              Start Your Journey
            </Button>
            <p className="mt-4 text-sm text-slate-400">
              Free to use • Secure & Private • No credit card required
            </p>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-24 w-full">
          {[
            { icon: Shield, title: "Safe & Private", desc: "Your data is yours. A secure space to express yourself freely." },
            { icon: Smile, title: "Mood Tracking", desc: "Understand your emotions with beautiful daily insights." },
            { icon: HeartHandshake, title: "Always Here", desc: "24/7 AI support and resources whenever you need them." }
          ].map((feature, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + (i * 0.1) }}
              className="bg-white/60 backdrop-blur-sm p-8 rounded-3xl border border-white/60 shadow-lg shadow-slate-200/50 hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm mb-6 mx-auto">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-display text-slate-800 mb-3">{feature.title}</h3>
              <p className="text-slate-500 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </main>
      
      <footer className="py-8 text-center text-slate-400 text-sm">
        © {new Date().getFullYear()} MoodTime. Prioritizing your mental health.
      </footer>
    </div>
  );
}
