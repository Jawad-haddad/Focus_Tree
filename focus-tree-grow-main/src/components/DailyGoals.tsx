import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Target, Edit2, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useLocalStorage } from "@/hooks/useLocalStorage";

interface DailyGoalsProps {
  todaySessions: number;
  todayMinutes: number;
}

export const DailyGoals = ({ todaySessions, todayMinutes }: DailyGoalsProps) => {
  const [goalSessions, setGoalSessions] = useLocalStorage("daily-goal-sessions", 4);
  const [goalMinutes, setGoalMinutes] = useLocalStorage("daily-goal-minutes", 100);
  const [isEditing, setIsEditing] = useState(false);
  const [tempSessions, setTempSessions] = useState(goalSessions.toString());
  const [tempMinutes, setTempMinutes] = useState(goalMinutes.toString());

  const sessionsProgress = Math.min((todaySessions / goalSessions) * 100, 100);
  const minutesProgress = Math.min((todayMinutes / goalMinutes) * 100, 100);

  const handleSave = () => {
    const sessions = parseInt(tempSessions);
    const minutes = parseInt(tempMinutes);
    
    if (sessions > 0 && minutes > 0) {
      setGoalSessions(sessions);
      setGoalMinutes(minutes);
      setIsEditing(false);
      toast.success("Daily goals updated!");
    } else {
      toast.error("Please enter valid goals");
    }
  };

  return (
    <Card className="p-6 bg-card shadow-[var(--shadow-soft)] border-border">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Target className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold text-foreground">Today's Goals</h2>
        </div>
        {!isEditing ? (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsEditing(true)}
          >
            <Edit2 className="h-4 w-4" />
          </Button>
        ) : (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleSave}
          >
            <Check className="h-4 w-4" />
          </Button>
        )}
      </div>

      {!isEditing ? (
        <div className="space-y-6">
          {/* Sessions Goal */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-foreground font-medium">Sessions</span>
              <span className="text-muted-foreground">
                {todaySessions}/{goalSessions}
              </span>
            </div>
            <Progress value={sessionsProgress} className="h-3" />
            {todaySessions >= goalSessions && (
              <p className="text-sm text-accent font-medium">🎉 Goal achieved!</p>
            )}
          </div>

          {/* Minutes Goal */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-foreground font-medium">Minutes</span>
              <span className="text-muted-foreground">
                {todayMinutes}/{goalMinutes}
              </span>
            </div>
            <Progress value={minutesProgress} className="h-3" />
            {todayMinutes >= goalMinutes && (
              <p className="text-sm text-accent font-medium">🎉 Goal achieved!</p>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Daily Sessions Goal
            </label>
            <Input
              type="number"
              value={tempSessions}
              onChange={(e) => setTempSessions(e.target.value)}
              min="1"
              max="20"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Daily Minutes Goal
            </label>
            <Input
              type="number"
              value={tempMinutes}
              onChange={(e) => setTempMinutes(e.target.value)}
              min="1"
              max="1000"
            />
          </div>
        </div>
      )}
    </Card>
  );
};