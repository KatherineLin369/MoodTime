import { cn } from "@/lib/utils";
import { Frown, Meh, Smile, SmilePlus, Annoyed } from "lucide-react";
import { motion } from "framer-motion";

interface MoodPickerProps {
  value: number | null;
  onChange: (value: number) => void;
  className?: string;
}

const MOODS = [
  { value: 1, label: "Rough", icon: Frown, color: "text-rose-500 bg-rose-50 border-rose-200" },
  { value: 2, label: "Not Great", icon: Annoyed, color: "text-orange-500 bg-orange-50 border-orange-200" },
  { value: 3, label: "Okay", icon: Meh, color: "text-accent bg-accent/10 border-accent/20" },
  { value: 4, label: "Good", icon: Smile, color: "text-primary bg-primary/10 border-primary/20" },
  { value: 5, label: "Great!", icon: SmilePlus, color: "text-secondary bg-secondary/10 border-secondary/20" },
];

export function MoodPicker({ value, onChange, className }: MoodPickerProps) {
  return (
    <div className={cn("grid grid-cols-5 gap-2 sm:gap-4", className)}>
      {MOODS.map((mood) => {
        const isSelected = value === mood.value;
        const Icon = mood.icon;
        
        return (
          <button
            key={mood.value}
            onClick={() => onChange(mood.value)}
            className="group flex flex-col items-center gap-2 focus:outline-none"
            type="button"
          >
            <motion.div 
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              animate={isSelected ? { scale: 1.1, y: -5, boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)" } : {}}
              className={cn(
                "w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                isSelected ? mood.color + " border-current shadow-lg ring-4 ring-white" : "text-slate-300 border-slate-200 bg-white hover:border-slate-300"
              )}
            >
              <Icon className={cn("w-6 h-6 sm:w-8 sm:h-8", isSelected ? "stroke-[2.5px]" : "stroke-2")} />
            </motion.div>
            <span className={cn(
              "text-xs sm:text-sm font-medium transition-colors",
              isSelected ? "text-slate-800 font-bold" : "text-slate-400"
            )}>
              {mood.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
