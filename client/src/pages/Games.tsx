import { useState, useEffect } from "react";
import { Gamepad2, Grid, Wind, Music, Play, Pause, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

const GAMES = [
  {
    id: "breathing",
    title: "Box Breathing",
    description: "Inhale, hold, exhale, hold. 4 seconds each.",
    icon: Wind,
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: "block-puzzle",
    title: "Zen Blocks",
    description: "Tap to cycle colors. Find your perfect pattern.",
    icon: Grid,
    color: "bg-yellow-100 text-yellow-600", // Changed to yellow as requested
  },
  {
    id: "sounds",
    title: "Nature Sounds",
    description: "Mix and match calming ambiance.",
    icon: Music,
    color: "bg-green-100 text-green-600",
  }
];

export default function Games() {
  const [activeGame, setActiveId] = useState<string | null>(null);

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-display font-bold text-slate-800">Relaxation Zone</h1>
          <p className="text-slate-500">Simple activities to help you decompress and focus.</p>
        </div>
        {activeGame && (
          <Button variant="ghost" onClick={() => setActiveId(null)} className="rounded-full">
            Back to Games
          </Button>
        )}
      </header>

      {!activeGame ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {GAMES.map((game, i) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => setActiveId(game.id)}
              className="glass-card p-6 rounded-3xl group hover:-translate-y-1 transition-transform duration-300 relative overflow-hidden cursor-pointer"
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${game.color}`}>
                <game.icon className="w-7 h-7" />
              </div>
              
              <h3 className="text-xl font-bold text-slate-800 mb-2">{game.title}</h3>
              <p className="text-slate-500 mb-6">{game.description}</p>
              
              <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-current opacity-[0.03] rounded-full group-hover:scale-150 transition-transform duration-500 pointer-events-none" style={{ color: game.color }} />
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-[2rem] p-8 md:p-12 shadow-xl border border-slate-100 min-h-[500px] flex flex-col items-center justify-center text-center"
        >
          {activeGame === "breathing" && <BreathingGame />}
          {activeGame === "block-puzzle" && <ZenBlocks />}
          {activeGame === "sounds" && <SoundScape />}
        </motion.div>
      )}
    </div>
  );
}

function BreathingGame() {
  const [phase, setPhase] = useState<"Inhale" | "Hold" | "Exhale" | "Pause">("Inhale");
  const [timer, setPhaseTimer] = useState(4);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhaseTimer((t) => {
        if (t <= 1) {
          setPhase((p) => {
            if (p === "Inhale") return "Hold";
            if (p === "Hold") return "Exhale";
            if (p === "Exhale") return "Pause";
            return "Inhale";
          });
          return 4;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-12">
      <div className="relative flex items-center justify-center">
        <motion.div
          animate={{
            scale: phase === "Inhale" ? 1.5 : phase === "Exhale" ? 1 : phase === "Hold" ? 1.5 : 1,
          }}
          transition={{ duration: 4, ease: "linear" }}
          className="w-48 h-48 rounded-full bg-blue-400/20 border-4 border-blue-400 flex items-center justify-center"
        >
          <div className="text-4xl font-bold text-blue-600">{timer}</div>
        </motion.div>
      </div>
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-slate-800">{phase}</h2>
        <p className="text-slate-500 italic">Follow the circle and the count</p>
      </div>
    </div>
  );
}

function ZenBlocks() {
  const [blocks, setBlocks] = useState(Array(9).fill(0));
  const colors = ["bg-yellow-100", "bg-yellow-200", "bg-yellow-300", "bg-yellow-400", "bg-yellow-500"];

  const cycle = (i: number) => {
    const next = [...blocks];
    next[i] = (next[i] + 1) % colors.length;
    setBlocks(next);
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-3 gap-4 w-64 mx-auto">
        {blocks.map((b, i) => (
          <motion.button
            key={i}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => cycle(i)}
            className={`w-20 h-20 rounded-2xl shadow-sm border border-yellow-200/50 transition-colors duration-500 ${colors[b]}`}
          />
        ))}
      </div>
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-slate-800">Find Your Harmony</h2>
        <p className="text-slate-500">Tap blocks to shift shades. There is no wrong way.</p>
      </div>
    </div>
  );
}

function SoundScape() {
  const [isPlaying, setIsPlaying] = useState<string | null>(null);
  const sounds = [
    { name: "Rainforest", icon: "🌧️" },
    { name: "Ocean Waves", icon: "🌊" },
    { name: "Summer Night", icon: "🌙" },
    { name: "Soft Wind", icon: "🍃" }
  ];

  return (
    <div className="space-y-8 w-full max-w-md">
      <div className="grid grid-cols-2 gap-4">
        {sounds.map((s) => (
          <button
            key={s.name}
            onClick={() => setIsPlaying(isPlaying === s.name ? null : s.name)}
            className={`p-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-3 ${
              isPlaying === s.name ? "bg-green-50 border-green-500 text-green-700" : "bg-white border-slate-100 text-slate-400 hover:border-slate-200"
            }`}
          >
            <span className="text-3xl">{s.icon}</span>
            <span className="font-semibold text-sm">{s.name}</span>
          </button>
        ))}
      </div>
      {isPlaying && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-4 text-green-600">
            <Music className="animate-bounce" />
            <span className="font-medium italic">Now playing: {isPlaying}</span>
          </div>
          <Slider defaultValue={[50]} max={100} step={1} className="w-48" />
        </motion.div>
      )}
    </div>
  );
}
