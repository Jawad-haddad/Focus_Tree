import { useState, useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { toast } from "sonner";

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  requirement: number;
  unlocked: boolean;
  unlockedAt?: Date;
}

const ACHIEVEMENTS: Omit<Achievement, "unlocked" | "unlockedAt">[] = [
  { id: "first-session", title: "First Steps", description: "Complete your first session", icon: "🌱", requirement: 1 },
  { id: "5-sessions", title: "Getting Started", description: "Complete 5 sessions", icon: "🌿", requirement: 5 },
  { id: "10-sessions", title: "Consistent", description: "Complete 10 sessions", icon: "🌳", requirement: 10 },
  { id: "25-sessions", title: "Dedicated", description: "Complete 25 sessions", icon: "🎋", requirement: 25 },
  { id: "50-sessions", title: "Master", description: "Complete 50 sessions", icon: "🌲", requirement: 50 },
  { id: "100-minutes", title: "Century", description: "Focus for 100 minutes", icon: "⏱️", requirement: 100 },
  { id: "500-minutes", title: "Marathon", description: "Focus for 500 minutes", icon: "⏰", requirement: 500 },
  { id: "1000-minutes", title: "Legend", description: "Focus for 1000 minutes", icon: "🏆", requirement: 1000 },
];

export function useAchievements(totalSessions: number, totalMinutes: number) {
  const [achievements, setAchievements] = useLocalStorage<Achievement[]>(
    "focus-tree-achievements",
    ACHIEVEMENTS.map(a => ({ ...a, unlocked: false }))
  );

  useEffect(() => {
    const updated = achievements.map(achievement => {
      if (achievement.unlocked) return achievement;

      const requirement = achievement.id.includes("minutes") ? totalMinutes : totalSessions;
      
      if (requirement >= achievement.requirement) {
        toast.success(`🏆 Achievement Unlocked: ${achievement.title}!`, {
          description: achievement.description,
        });
        return { ...achievement, unlocked: true, unlockedAt: new Date() };
      }
      
      return achievement;
    });

    setAchievements(updated);
  }, [totalSessions, totalMinutes]);

  return achievements;
}