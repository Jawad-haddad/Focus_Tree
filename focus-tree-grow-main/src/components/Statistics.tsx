import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { BarChart3 } from "lucide-react";

interface Session {
  id: string;
  duration: number;
  completedAt: Date;
}

interface StatisticsProps {
  sessions: Session[];
}

export const Statistics = ({ sessions }: StatisticsProps) => {
  const getLast7Days = () => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      days.push({
        date: date.toLocaleDateString('en-US', { weekday: 'short' }),
        minutes: 0,
      });
    }
    return days;
  };

  const dailyData = getLast7Days();
  
  sessions.forEach(session => {
    const sessionDate = new Date(session.completedAt);
    const dayName = sessionDate.toLocaleDateString('en-US', { weekday: 'short' });
    const dayData = dailyData.find(d => d.date === dayName);
    if (dayData) {
      dayData.minutes += session.duration;
    }
  });

  const durationDistribution = sessions.reduce((acc: any[], session) => {
    const existing = acc.find(item => item.duration === session.duration);
    if (existing) {
      existing.count += 1;
    } else {
      acc.push({ duration: `${session.duration} min`, count: 1 });
    }
    return acc;
  }, []).sort((a, b) => b.count - a.count).slice(0, 5);

  const COLORS = ['hsl(var(--primary))', 'hsl(var(--accent))', 'hsl(var(--secondary))', 'hsl(var(--muted))', 'hsl(var(--chart-1))'];

  const totalMinutes = sessions.reduce((acc, s) => acc + s.duration, 0);
  const avgSession = sessions.length > 0 ? Math.round(totalMinutes / sessions.length) : 0;
  const longestStreak = calculateStreak(sessions);

  return (
    <Card className="p-6 bg-card shadow-[var(--shadow-soft)] border-border">
      <div className="flex items-center gap-3 mb-6">
        <BarChart3 className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold text-foreground">Statistics</h2>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="text-center p-4 bg-muted/50 rounded-lg">
          <div className="text-2xl font-bold text-primary">{sessions.length}</div>
          <div className="text-sm text-muted-foreground">Sessions</div>
        </div>
        <div className="text-center p-4 bg-muted/50 rounded-lg">
          <div className="text-2xl font-bold text-accent">{avgSession}</div>
          <div className="text-sm text-muted-foreground">Avg Duration</div>
        </div>
        <div className="text-center p-4 bg-muted/50 rounded-lg">
          <div className="text-2xl font-bold text-secondary">{longestStreak}</div>
          <div className="text-sm text-muted-foreground">Day Streak</div>
        </div>
      </div>

      {/* Charts */}
      {sessions.length > 0 ? (
        <div className="space-y-8">
          {/* Bar Chart - Last 7 Days */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Last 7 Days</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={dailyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Bar dataKey="minutes" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart - Duration Distribution */}
          {durationDistribution.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Session Durations</h3>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={durationDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ duration, count }) => `${duration} (${count})`}
                    outerRadius={80}
                    fill="hsl(var(--primary))"
                    dataKey="count"
                  >
                    {durationDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-12 text-muted-foreground">
          <BarChart3 className="h-12 w-12 mx-auto mb-3 opacity-50" />
          <p>Complete sessions to see statistics</p>
        </div>
      )}
    </Card>
  );
};

function calculateStreak(sessions: Session[]): number {
  if (sessions.length === 0) return 0;

  const sortedDates = sessions
    .map(s => new Date(s.completedAt).toDateString())
    .filter((date, index, self) => self.indexOf(date) === index)
    .sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

  let streak = 1;
  const today = new Date().toDateString();
  
  if (sortedDates[0] !== today) return 0;

  for (let i = 1; i < sortedDates.length; i++) {
    const current = new Date(sortedDates[i]);
    const previous = new Date(sortedDates[i - 1]);
    const diffDays = Math.floor((previous.getTime() - current.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
      streak++;
    } else {
      break;
    }
  }
  
  return streak;
}