import { Gamepad2, Grid, Wind, Music } from "lucide-react";
import { motion } from "framer-motion";

const GAMES = [
  {
    id: "breathing",
    title: "Box Breathing",
    description: "A visual guide for deep, calming breaths.",
    icon: Wind,
    color: "bg-blue-100 text-blue-600",
    comingSoon: true
  },
  {
    id: "block-puzzle",
    title: "Zen Blocks",
    description: "Fit the blocks together. No timer, no stress.",
    icon: Grid,
    color: "bg-purple-100 text-purple-600",
    comingSoon: true
  },
  {
    id: "sounds",
    title: "Nature Sounds",
    description: "Rain, forest, and ocean ambiance generator.",
    icon: Music,
    color: "bg-green-100 text-green-600",
    comingSoon: true
  }
];

export default function Games() {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <header>
        <h1 className="text-3xl font-display font-bold text-slate-800">Relaxation Zone</h1>
        <p className="text-slate-500">Simple activities to help you decompress and focus.</p>
      </header>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {GAMES.map((game, i) => (
          <motion.div
            key={game.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-6 rounded-3xl group hover:-translate-y-1 transition-transform duration-300 relative overflow-hidden"
          >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${game.color}`}>
              <game.icon className="w-7 h-7" />
            </div>
            
            <h3 className="text-xl font-bold text-slate-800 mb-2">{game.title}</h3>
            <p className="text-slate-500 mb-6">{game.description}</p>
            
            {game.comingSoon && (
              <span className="inline-block px-3 py-1 bg-slate-100 text-slate-500 text-xs font-bold uppercase tracking-wider rounded-full">
                Coming Soon
              </span>
            )}
            
            {/* Hover decoration */}
            <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-current opacity-[0.03] rounded-full group-hover:scale-150 transition-transform duration-500 pointer-events-none" style={{ color: game.color }} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
