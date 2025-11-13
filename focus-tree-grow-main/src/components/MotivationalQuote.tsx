import { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";

const QUOTES = [
  "Focus is the gateway to thinking clearly.",
  "One focused hour beats ten distracted days.",
  "Your tree grows with every moment of focus.",
  "Deep work is the superpower of the 21st century.",
  "Concentration is the secret of strength.",
  "The successful warrior is the average person with laser-like focus.",
  "Focus on being productive instead of busy.",
  "Where focus goes, energy flows.",
  "Your attention is the most valuable resource you have.",
  "Small daily improvements over time lead to stunning results.",
];

export const MotivationalQuote = () => {
  const [quote, setQuote] = useState("");

  useEffect(() => {
    const randomQuote = QUOTES[Math.floor(Math.random() * QUOTES.length)];
    setQuote(randomQuote);
  }, []);

  return (
    <div className="text-center py-4 px-6 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg border border-primary/10">
      <div className="flex items-center justify-center gap-2 mb-2">
        <Sparkles className="h-4 w-4 text-primary animate-pulse-soft" />
        <span className="text-xs font-medium text-primary uppercase tracking-wide">
          Daily Inspiration
        </span>
        <Sparkles className="h-4 w-4 text-primary animate-pulse-soft" />
      </div>
      <p className="text-sm text-muted-foreground italic">"{quote}"</p>
    </div>
  );
};
