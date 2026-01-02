import { Phone, BookOpen, Globe, Heart } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function Resources() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <header>
        <h1 className="text-3xl font-display font-bold text-slate-800">Resources</h1>
        <p className="text-slate-500">Help is always available. You are not alone.</p>
      </header>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Crisis Support - Highlighted */}
        <div className="bg-rose-50 border border-rose-100 rounded-3xl p-8 md:col-span-2 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center text-rose-600 shrink-0">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-rose-800 mb-2">Crisis Support</h3>
              <p className="text-rose-600 mb-6 max-w-xl">
                If you or someone you know is in immediate danger or needs urgent help, please contact emergency services or use these free, confidential helplines.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-xl border border-rose-100 shadow-sm">
                  <div className="text-xs font-bold text-rose-400 uppercase mb-1">USA - Suicide & Crisis Lifeline</div>
                  <div className="text-2xl font-bold text-slate-800">988</div>
                  <div className="text-sm text-slate-500 mt-1">Call or Text 24/7</div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-rose-100 shadow-sm">
                  <div className="text-xs font-bold text-rose-400 uppercase mb-1">Global - Emergency</div>
                  <div className="text-2xl font-bold text-slate-800">911 / 112</div>
                  <div className="text-sm text-slate-500 mt-1">Local Emergency Services</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Educational Content */}
        <div className="glass-card p-6 rounded-3xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">Articles & Reading</h3>
          </div>
          <ul className="space-y-4">
            {[
              { title: "Understanding Anxiety: Triggers & Coping", url: "https://www.mentalhealth.org.uk/explore-mental-health/a-z-topics/anxiety" },
              { title: "The Power of Mindfulness Meditation", url: "https://www.mindful.org/meditation/mindfulness-getting-started/" },
              { title: "Building Healthy Sleep Habits", url: "https://www.sleepfoundation.org/sleep-hygiene" },
              { title: "How to Support a Friend in Crisis", url: "https://www.nami.org/Your-Journey/Family-Members-and-Caregivers/Supporting-a-Friend-or-Family-Member" }
            ].map((article, i) => (
              <li key={i} className="group cursor-pointer">
                <a 
                  href={article.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors"
                >
                  <span className="text-slate-600 font-medium group-hover:text-primary transition-colors">{article.title}</span>
                  <Globe className="w-4 h-4 text-slate-300" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Self-Care Tips */}
        <div className="glass-card p-6 rounded-3xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-accent/20 text-accent-foreground rounded-full flex items-center justify-center">
              <Heart className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">Daily Self-Care</h3>
          </div>
          <div className="space-y-4">
            {[
              { tip: "Drink a glass of water right now", color: "bg-accent/10 border-accent/20", dot: "bg-accent" },
              { tip: "Take 3 deep breaths (4-7-8 technique)", color: "bg-secondary/10 border-secondary/20", dot: "bg-secondary" },
              { tip: "Step outside for fresh air", color: "bg-accent/10 border-accent/20", dot: "bg-accent" },
              { tip: "List 3 things you are grateful for", color: "bg-secondary/10 border-secondary/20", dot: "bg-secondary" }
            ].map((item, i) => (
              <div key={i} className={`flex gap-3 p-3 rounded-xl border ${item.color}`}>
                <div className={`w-1.5 h-1.5 rounded-full mt-2 shrink-0 ${item.dot}`} />
                <span className="text-slate-600 text-sm leading-relaxed font-medium">{item.tip}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
