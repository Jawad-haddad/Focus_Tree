import { useState, useEffect } from "react";
import { Timer } from "@/components/Timer";
import { SessionHistory } from "@/components/SessionHistory";
import { Statistics } from "@/components/Statistics";
import { Achievements } from "@/components/Achievements";
import { DailyGoals } from "@/components/DailyGoals";
import { ParticleEffect } from "@/components/ParticleEffect";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Sprout, Presentation, Youtube } from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useAchievements } from "@/hooks/useAchievements";
import { Link } from "react-router-dom";

interface Session {
  id: string;
  duration: number;
  completedAt: Date;
}

const Index = () => {
  const [sessions, setSessions] = useLocalStorage<Session[]>("focus-tree-sessions", []);
  const [showParticles, setShowParticles] = useState(false);

  // Convert date strings back to Date objects when loading from localStorage
  useEffect(() => {
    setSessions((prev) =>
      prev.map((session) => ({
        ...session,
        completedAt: new Date(session.completedAt),
      }))
    );
  }, []);

  const totalMinutes = sessions.reduce((acc, s) => acc + s.duration, 0);
  const totalSessions = sessions.length;
  
  const achievements = useAchievements(totalSessions, totalMinutes);

  // Calculate today's stats
  const today = new Date().toDateString();
  const todaySessions = sessions.filter(s => new Date(s.completedAt).toDateString() === today);
  const todayMinutes = todaySessions.reduce((acc, s) => acc + s.duration, 0);

  const handleSessionComplete = (duration: number) => {
    const newSession: Session = {
      id: crypto.randomUUID(),
      duration,
      completedAt: new Date(),
    };
    setSessions((prev) => [newSession, ...prev]);
    setShowParticles(true);
    setTimeout(() => setShowParticles(false), 100);
  };

  const handleDeleteSession = (id: string) => {
    setSessions((prev) => prev.filter((session) => session.id !== id));
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <ParticleEffect trigger={showParticles} />
      
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <header className="space-y-6 animate-grow">
          {/* Navigation buttons - stacked on mobile, row on desktop */}
          <div className="flex flex-wrap justify-center items-center gap-2 px-2">
            <a href="https://www.youtube.com/watch?v=BlmBDrnhd2I&list=PLpfxVARjkP-9KiAauTLjIZOvub9E1FERs" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm" className="gap-2">
                <Youtube className="h-4 w-4" />
                Learn Scratch
              </Button>
            </a>
            <Link to="/presentation">
              <Button variant="outline" size="sm" className="gap-2">
                <Presentation className="h-4 w-4" />
                View Presentation
              </Button>
            </Link>
            <ThemeToggle />
          </div>
          
          {/* Title */}
          <div className="text-center space-y-3">
            <div className="flex items-center justify-center gap-3">
              <Sprout className="h-8 w-8 sm:h-10 sm:w-10 text-primary animate-float" />
              <h1 className="text-3xl sm:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Focus Tree
              </h1>
            </div>
            <p className="text-base sm:text-lg text-muted-foreground max-w-md mx-auto px-4">
              Stay focused and watch your tree grow with each session
            </p>
          </div>
        </header>

        {/* Daily Goals */}
        <div className="animate-grow" style={{ animationDelay: "0.05s" }}>
          <DailyGoals todaySessions={todaySessions.length} todayMinutes={todayMinutes} />
        </div>

        {/* Timer Section */}
        <div className="animate-grow" style={{ animationDelay: "0.1s" }}>
          <Timer onSessionComplete={handleSessionComplete} />
        </div>

        {/* Tabs for History, Stats, Achievements */}
        <div className="animate-grow" style={{ animationDelay: "0.15s" }}>
          <Tabs defaultValue="history" className="w-full">
            <TabsList className="grid w-full grid-cols-3 max-w-2xl mx-auto">
              <TabsTrigger value="history">History</TabsTrigger>
              <TabsTrigger value="stats">Statistics</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
            </TabsList>
            <div className="mt-6">
              <TabsContent value="history">
                <SessionHistory sessions={sessions} onDeleteSession={handleDeleteSession} />
              </TabsContent>
              <TabsContent value="stats">
                <Statistics sessions={sessions} />
              </TabsContent>
              <TabsContent value="achievements">
                <div className="max-w-2xl mx-auto">
                  <Achievements achievements={achievements} totalSessions={totalSessions} totalMinutes={totalMinutes} />
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Index;
