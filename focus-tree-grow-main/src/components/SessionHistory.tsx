import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Clock, Calendar, Trash2, Download } from "lucide-react";
import { toast } from "sonner";

interface Session {
  id: string;
  duration: number;
  completedAt: Date;
}

interface SessionHistoryProps {
  sessions: Session[];
  onDeleteSession: (id: string) => void;
}

export const SessionHistory = ({ sessions, onDeleteSession }: SessionHistoryProps) => {
  const handleDelete = (id: string, duration: number) => {
    onDeleteSession(id);
    toast.success(`Deleted ${duration} minute session`);
  };

  const handleExport = () => {
    const csvContent = [
      ['Date', 'Duration (minutes)', 'Completed At'],
      ...sessions.map(s => [
        new Date(s.completedAt).toLocaleDateString(),
        s.duration,
        new Date(s.completedAt).toLocaleString()
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `focus-tree-history-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    toast.success('History exported successfully!');
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const totalMinutes = sessions.reduce((acc, session) => acc + session.duration, 0);
  const totalSessions = sessions.length;

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      <Card className="p-6 bg-card shadow-[var(--shadow-soft)] border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Calendar className="h-6 w-6 text-primary" />
            Session History
          </h2>
          {sessions.length > 0 && (
            <Button variant="outline" size="sm" onClick={handleExport}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-muted/50 rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-primary">{totalSessions}</div>
            <div className="text-sm text-muted-foreground mt-1">Total Sessions</div>
          </div>
          <div className="bg-muted/50 rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-accent">{totalMinutes}</div>
            <div className="text-sm text-muted-foreground mt-1">Total Minutes</div>
          </div>
        </div>

        {/* Session List */}
        <ScrollArea className="h-[300px] pr-4">
          {sessions.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Clock className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No sessions yet. Start your first focus session!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {sessions.map((session) => (
                <div
                  key={session.id}
                  className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border hover:border-primary/50 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">{session.duration} minutes</div>
                      <div className="text-sm text-muted-foreground">{formatDate(session.completedAt)}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-2xl">🌳</div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(session.id, session.duration)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8"
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </Card>
    </div>
  );
};
