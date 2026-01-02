import { useState, useEffect, useRef } from "react";
import { Gamepad2, Grid, Wind, Music, Play, Pause, RotateCcw, Heart, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";

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
    id: "gratitude",
    title: "Gratitude Journal",
    description: "Write down three things you're thankful for today.",
    icon: Heart,
    color: "bg-rose-100 text-rose-600",
  },
  {
    id: "guided-imagery",
    title: "Guided Imagery",
    description: "Visualize your happy place with audio guidance.",
    icon: Globe,
    color: "bg-indigo-100 text-indigo-600",
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
          {activeGame === "gratitude" && <GratitudeGame />}
          {activeGame === "guided-imagery" && <GuidedImagery />}
        </motion.div>
      )}
    </div>
  );
}

function GratitudeGame() {
  const [entries, setEntries] = useState(["", "", ""]);
  const [isSaved, setIsSaved] = useState(false);

  return (
    <div className="space-y-8 w-full max-w-md">
      <h2 className="text-2xl font-bold text-slate-800">What are you grateful for?</h2>
      <div className="space-y-4">
        {entries.map((e, i) => (
          <Input
            key={i}
            placeholder={`I am grateful for...`}
            value={e}
            onChange={(val) => {
              const next = [...entries];
              next[i] = val.target.value;
              setEntries(next);
            }}
            className="rounded-xl border-rose-100 focus-visible:ring-rose-200"
          />
        ))}
      </div>
      <Button 
        className="w-full rounded-xl bg-rose-500 hover:bg-rose-600"
        onClick={() => setIsSaved(true)}
      >
        {isSaved ? "Saved to Heart" : "Record Gratitude"}
      </Button>
    </div>
  );
}

function GuidedImagery() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsPlaying(false);
    }
    return () => clearInterval(interval);
  }, [isPlaying, timeLeft]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="space-y-8">
      <div className="w-32 h-32 bg-indigo-100 rounded-full flex items-center justify-center mx-auto">
        <motion.div
          animate={isPlaying ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <Globe className="w-16 h-16 text-indigo-600" />
        </motion.div>
      </div>
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-slate-800">Mountain Retreat</h2>
        <p className="text-slate-500">Close your eyes and listen to the stream.</p>
        <div className="text-3xl font-mono font-bold text-indigo-600 mt-4">
          {formatTime(timeLeft)}
        </div>
      </div>
      <div className="flex justify-center gap-4">
        <audio
          ref={audioRef}
          src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3"
          loop
        />
        <Button
          onClick={togglePlay}
          className="rounded-full bg-indigo-600 hover:bg-indigo-700 gap-2 h-12 px-8"
        >
          {isPlaying ? (
            <>
              <Pause className="w-5 h-5" /> Pause Meditation
            </>
          ) : (
            <>
              <Play className="w-5 h-5" /> Start Meditation
            </>
          )}
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            setIsPlaying(false);
            setTimeLeft(300);
            if (audioRef.current) {
              audioRef.current.pause();
              audioRef.current.currentTime = 0;
            }
          }}
          className="rounded-full h-12 w-12 p-0 border-indigo-200 text-indigo-600"
        >
          <RotateCcw className="w-5 h-5" />
        </Button>
      </div>
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
    { name: "Rainforest", icon: "🌧️", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
    { name: "Ocean Waves", icon: "🌊", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
    { name: "Summer Night", icon: "🌙", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
    { name: "Soft Wind", icon: "🍃", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3" }
  ];

  const toggleSound = (name: string) => {
    if (isPlaying === name) {
      setIsPlaying(null);
    } else {
      setIsPlaying(name);
    }
  };

  return (
    <div className="space-y-8 w-full max-w-md">
      <div className="grid grid-cols-2 gap-4">
        {sounds.map((s) => (
          <button
            key={s.name}
            onClick={() => toggleSound(s.name)}
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
          <audio autoPlay loop src={sounds.find(s => s.name === isPlaying)?.url} className="hidden" />
          <Slider defaultValue={[50]} max={100} step={1} className="w-48" />
        </motion.div>
      )}
    </div>
  );
}
