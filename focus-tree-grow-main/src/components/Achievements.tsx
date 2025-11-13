import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Trophy } from "lucide-react";
import { Achievement } from "@/hooks/useAchievements";

interface AchievementsProps {
  achievements: Achievement[];
  totalSessions: number;
  totalMinutes: number;
}

export const Achievements = ({ achievements, totalSessions, totalMinutes }: AchievementsProps) => {
  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalCount = achievements.length;

  return (
    <Card className="p-6 bg-card shadow-[var(--shadow-soft)] border-border">
      <div className="flex items-center gap-3 mb-6">
        <Trophy className="h-6 w-6 text-accent" />
        <h2 className="text-2xl font-bold text-foreground">Achievements</h2>
        <span className="text-muted-foreground ml-auto">
          {unlockedCount}/{totalCount}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {achievements.map((achievement) => {
          const currentValue = achievement.id.includes("minutes") ? totalMinutes : totalSessions;
          const progressPercent = Math.min((currentValue / achievement.requirement) * 100, 100);

          return (
            <div
              key={achievement.id}
              className={`p-4 rounded-lg border transition-all ${
                achievement.unlocked
                  ? "bg-accent/10 border-accent shadow-md"
                  : "bg-muted/30 border-border"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`text-3xl ${achievement.unlocked ? "animate-float" : "opacity-40"}`}>
                  {achievement.icon}
                </div>
                <div className="flex-1 space-y-2">
                  <div>
                    <h3 className="font-semibold text-foreground">{achievement.title}</h3>
                    <p className="text-sm text-muted-foreground">{achievement.description}</p>
                  </div>
                  {!achievement.unlocked && (
                    <div className="space-y-1">
                      <Progress value={progressPercent} className="h-2" />
                      <p className="text-xs text-muted-foreground">
                        {currentValue}/{achievement.requirement}
                      </p>
                    </div>
                  )}
                  {achievement.unlocked && achievement.unlockedAt && (
                    <p className="text-xs text-accent font-medium">
                      Unlocked {new Date(achievement.unlockedAt).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};