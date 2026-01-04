import { useState } from "react";
import { useMoods, useCreateMood } from "@/hooks/use-moods";
import { MoodPicker } from "@/components/MoodPicker";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Calendar as CalendarIcon, Activity } from "lucide-react";
import { format } from "date-fns";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const EMOTIONS = [
  "Happy", "Excited", "Grateful", "Calm", "Relaxed",
  "Tired", "Anxious", "Sad", "Angry", "Stressed", 
  "Confused", "Lonely", "Hopeful", "Proud", "Bored"
];

export default function MoodJournal() {
  const { data: moods, isLoading } = useMoods();
  const { mutate: createMood, isPending } = useCreateMood();
  const { toast } = useToast();
  
  const [value, setValue] = useState<number | null>(null);
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);
  const [note, setNote] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const toggleEmotion = (emotion: string) => {
    if (selectedEmotions.includes(emotion)) {
      setSelectedEmotions(prev => prev.filter(e => e !== emotion));
    } else {
      setSelectedEmotions(prev => [...prev, emotion]);
    }
  };

  const handleSubmit = () => {
    if (!value) return;
    
    createMood({
      mood: value,
      emotion: selectedEmotions.join(", "),
      note: note.trim() || undefined
    }, {
      onSuccess: () => {
        toast({
          title: "Check-in complete!",
          description: "Your mood has been logged.",
        });
        setIsSubmitted(true);
        // Reset form after delay or leave on success screen
        setTimeout(() => {
          setValue(null);
          setSelectedEmotions([]);
          setNote("");
          setIsSubmitted(false);
        }, 3000);
      }
    });
  };

  if (isLoading) {
    return (
      <div className="h-96 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  // Transform data for chart (reverse to show chronological order)
  const chartData = moods?.slice(0, 7).reverse().map(m => ({
    date: format(new Date(m.createdAt), "EEE"),
    value: m.mood
  })) || [];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <header>
        <h1 className="text-3xl font-display font-bold text-slate-800">Mood Journal</h1>
        <p className="text-slate-500">Track your emotions and notice patterns over time.</p>
      </header>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Check-in Form */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl shadow-slate-200/50"
        >
          {isSubmitted ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-10">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                <Activity className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-800">You're all set!</h3>
              <p className="text-slate-500 mt-2">Great job checking in with yourself today.</p>
              <Button 
                variant="outline" 
                className="mt-6 rounded-full"
                onClick={() => setIsSubmitted(false)}
              >
                New Entry
              </Button>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="space-y-4">
                <label className="text-sm font-bold uppercase tracking-wider text-slate-400">How are you feeling?</label>
                <MoodPicker value={value} onChange={setValue} />
              </div>

              {value && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="space-y-6"
                >
                  <div className="space-y-4">
                    <label className="text-sm font-bold uppercase tracking-wider text-slate-400">What describes this feeling?</label>
                    <div className="flex flex-wrap gap-2">
                      {EMOTIONS.map(emotion => (
                        <button
                          key={emotion}
                          onClick={() => toggleEmotion(emotion)}
                          className={cn(
                            "px-3 py-1.5 rounded-full text-sm font-medium transition-all border",
                            selectedEmotions.includes(emotion)
                              ? "bg-primary text-primary-foreground border-primary"
                              : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
                          )}
                        >
                          {emotion}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-sm font-bold uppercase tracking-wider text-slate-400">Want to add a note?</label>
                    <Textarea 
                      placeholder="Write about your day..." 
                      className="resize-none rounded-xl border-slate-200 focus:ring-primary/20 min-h-[100px]"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                    />
                  </div>

                  <Button 
                    onClick={handleSubmit} 
                    disabled={isPending}
                    className="w-full rounded-xl h-12 text-base font-semibold shadow-lg shadow-primary/20"
                  >
                    {isPending ? "Saving..." : "Log Mood"}
                  </Button>
                </motion.div>
              )}
            </div>
          )}
        </motion.div>

        {/* Stats & History */}
        <div className="space-y-6">
          <div className="glass-card p-6 rounded-3xl">
            <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" />
              This Week's Moods
            </h3>
            <div className="h-48 w-full">
              {chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorMood" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#818cf8" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#818cf8" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis 
                      dataKey="date" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#94a3b8', fontSize: 12 }} 
                      dy={10}
                    />
                    <YAxis 
                      hide 
                      domain={[1, 5]} 
                    />
                    <Tooltip 
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#6366f1" 
                      strokeWidth={3}
                      fillOpacity={1} 
                      fill="url(#colorMood)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-slate-400 text-sm italic">
                  Not enough data yet
                </div>
              )}
            </div>
          </div>

          <div className="bg-slate-50/50 rounded-3xl p-6 border border-slate-100 max-h-[400px] overflow-y-auto no-scrollbar">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <CalendarIcon className="w-5 h-5 text-slate-400" />
              History
            </h3>
            <div className="space-y-4">
              {moods?.map(mood => (
                <div key={mood.id} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex gap-4 hover-elevate transition-all">
                  <div className="text-2xl pt-1">
                    {mood.mood === 5 ? '🤩' : mood.mood === 4 ? '🙂' : mood.mood === 3 ? '😐' : mood.mood === 2 ? '😕' : '😢'}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                        {format(new Date(mood.createdAt), "MMM d, yyyy")}
                      </span>
                      <span className="text-[10px] font-medium text-slate-400">
                        {format(new Date(mood.createdAt), "h:mm a")}
                      </span>
                    </div>
                    {mood.emotion && (
                      <div className="flex flex-wrap gap-1 mb-2">
                        {mood.emotion.split(", ").map(e => (
                          <span key={e} className="text-[10px] px-2 py-0.5 bg-primary/5 text-primary rounded-full border border-primary/10 font-medium">
                            {e}
                          </span>
                        ))}
                      </div>
                    )}
                    {mood.note && (
                      <p className="text-sm text-slate-600 leading-relaxed bg-slate-50/50 p-2 rounded-lg border border-slate-100/50 italic">
                        "{mood.note}"
                      </p>
                    )}
                  </div>
                </div>
              ))}
              {(!moods || moods.length === 0) && (
                <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-3xl">
                  <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CalendarIcon className="w-6 h-6 text-slate-400" />
                  </div>
                  <p className="text-sm text-slate-400 font-medium">No mood entries yet.</p>
                  <p className="text-xs text-slate-300 mt-1">Start by logging how you feel today!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
