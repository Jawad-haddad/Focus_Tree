import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Play, Pause, RotateCcw, Plus, Coffee, Volume2, VolumeX, Palette } from "lucide-react";
import { TreeGrowth } from "./TreeGrowth";
import { MotivationalQuote } from "./MotivationalQuote";
import { toast } from "sonner";
import { playCompletionSound, playTickSound, playBreakSound, startAmbientSound, stopAmbientSound } from "@/utils/sounds";

interface TimerProps {
  onSessionComplete: (duration: number) => void;
}

const TIME_OPTIONS = [5, 10, 15, 20, 25] as const;
const BREAK_OPTIONS = [5, 10, 15] as const;

export const Timer = ({ onSessionComplete }: TimerProps) => {
  const [selectedTime, setSelectedTime] = useState<number>(25);
  const [timeLeft, setTimeLeft] = useState<number>(selectedTime * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [customTime, setCustomTime] = useState<string>("");
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [isBreakMode, setIsBreakMode] = useState(false);
  const [ambientSound, setAmbientSound] = useState<'none' | 'rain' | 'forest' | 'ocean'>('none');
  const [treeTheme, setTreeTheme] = useState<'default' | 'autumn' | 'spring' | 'winter'>('default');

  useEffect(() => {
    setTimeLeft(selectedTime * 60);
    setProgress(0);
  }, [selectedTime]);

  useEffect(() => {
    if (ambientSound !== 'none' && isRunning) {
      startAmbientSound(ambientSound);
    } else {
      stopAmbientSound();
    }
    return () => stopAmbientSound();
  }, [ambientSound, isRunning]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          const newTime = prev - 1;
          setProgress(((selectedTime * 60 - newTime) / (selectedTime * 60)) * 100);
          
          // Play tick sound for last 10 seconds
          if (newTime <= 10 && newTime > 0) {
            playTickSound();
          }
          
          if (newTime === 0) {
            setIsRunning(false);
            if (!isBreakMode) {
              onSessionComplete(selectedTime);
              playCompletionSound();
              toast.success("🌳 Session complete! Your tree has fully grown!");
            } else {
              playBreakSound();
              toast.success("☕ Break complete! Ready for another session?");
              setIsBreakMode(false);
            }
          }
          
          return newTime;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, selectedTime, onSessionComplete]);

  const handleStart = () => {
    if (timeLeft === 0) {
      setTimeLeft(selectedTime * 60);
      setProgress(0);
    }
    setIsRunning(true);
    toast.info("🌱 Focus session started. Watch your tree grow!");
  };

  const handlePause = () => {
    setIsRunning(false);
    toast("⏸️ Session paused");
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(selectedTime * 60);
    setProgress(0);
    setIsBreakMode(false);
    toast("🔄 Timer reset");
  };

  const handleStartBreak = (duration: number) => {
    setIsBreakMode(true);
    setSelectedTime(duration);
    setTimeLeft(duration * 60);
    setProgress(0);
    setIsRunning(true);
    toast.info(`☕ Break started for ${duration} minutes`);
  };

  const handleCustomTime = () => {
    const time = parseInt(customTime);
    if (time && time > 0 && time <= 180) {
      setSelectedTime(time);
      setShowCustomInput(false);
      setCustomTime("");
      toast.success(`⏱️ Custom timer set for ${time} minutes`);
    } else {
      toast.error("Please enter a valid time between 1-180 minutes");
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-8">
      <Card className="p-8 bg-card shadow-[var(--shadow-soft)] border-border">
        <div className="space-y-8">
          {/* Settings Bar */}
          <div className="flex gap-4 justify-center flex-wrap items-center">
            <Select value={ambientSound} onValueChange={(v: any) => setAmbientSound(v)}>
              <SelectTrigger className="w-[160px]">
                <div className="flex items-center gap-2">
                  {ambientSound === 'none' ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  <SelectValue />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">No Sound</SelectItem>
                <SelectItem value="rain">🌧️ Rain</SelectItem>
                <SelectItem value="forest">🌲 Forest</SelectItem>
                <SelectItem value="ocean">🌊 Ocean</SelectItem>
              </SelectContent>
            </Select>

            <Select value={treeTheme} onValueChange={(v: any) => setTreeTheme(v)}>
              <SelectTrigger className="w-[160px]">
                <div className="flex items-center gap-2">
                  <Palette className="h-4 w-4" />
                  <SelectValue />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">🌳 Default</SelectItem>
                <SelectItem value="autumn">🍂 Autumn</SelectItem>
                <SelectItem value="spring">🌸 Spring</SelectItem>
                <SelectItem value="winter">❄️ Winter</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Motivational Quote */}
          {!isBreakMode && <MotivationalQuote />}

          {/* Time Selection */}
          <div className="space-y-4">
            <h2 className="text-lg font-medium text-foreground text-center">
              {isBreakMode ? "☕ Break Time" : "Select Focus Duration"}
            </h2>
            <div className="flex gap-3 justify-center flex-wrap">
              {TIME_OPTIONS.map((time) => (
                <Button
                  key={time}
                  variant={selectedTime === time ? "default" : "outline"}
                  onClick={() => {
                    if (!isRunning) {
                      setSelectedTime(time);
                    }
                  }}
                  disabled={isRunning}
                  className="min-w-[80px] transition-all duration-300"
                >
                  {time} min
                </Button>
              ))}
              <Button
                variant="outline"
                onClick={() => setShowCustomInput(!showCustomInput)}
                disabled={isRunning}
                className="min-w-[80px]"
              >
                <Plus className="h-4 w-4 mr-1" />
                Custom
              </Button>
            </div>
            
            {/* Custom Time Input */}
            {showCustomInput && (
              <div className="flex gap-2 justify-center items-center animate-fade-in">
                <Input
                  type="number"
                  placeholder="Minutes (1-180)"
                  value={customTime}
                  onChange={(e) => setCustomTime(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleCustomTime()}
                  className="max-w-[150px]"
                  min="1"
                  max="180"
                />
                <Button onClick={handleCustomTime} size="sm">
                  Set
                </Button>
              </div>
            )}
          </div>

          {/* Tree Animation or Break Icon */}
          <div className="flex justify-center py-8">
            {!isBreakMode ? (
              <TreeGrowth progress={progress} theme={treeTheme} />
            ) : (
              <div className="text-8xl animate-float">☕</div>
            )}
          </div>

          {/* Timer Display */}
          <div className="text-center space-y-4">
            <div className="text-6xl font-bold text-primary tabular-nums tracking-tight">
              {formatTime(timeLeft)}
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-1000 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Controls */}
          <div className="flex gap-4 justify-center flex-wrap">
            {!isRunning ? (
              <Button
                onClick={handleStart}
                size="lg"
                className="px-8"
              >
                <Play className="mr-2 h-5 w-5" />
                Start
              </Button>
            ) : (
              <Button
                onClick={handlePause}
                size="lg"
                variant="secondary"
                className="px-8"
              >
                <Pause className="mr-2 h-5 w-5" />
                Pause
              </Button>
            )}
            <Button
              onClick={handleReset}
              size="lg"
              variant="outline"
              className="px-8"
            >
              <RotateCcw className="mr-2 h-5 w-5" />
              Reset
            </Button>
          </div>

          {/* Break Timer Quick Actions */}
          {!isRunning && !isBreakMode && (
            <div className="pt-4 border-t border-border">
              <p className="text-sm text-muted-foreground text-center mb-3">Quick Break</p>
              <div className="flex gap-3 justify-center">
                {BREAK_OPTIONS.map((time) => (
                  <Button
                    key={time}
                    variant="outline"
                    size="sm"
                    onClick={() => handleStartBreak(time)}
                  >
                    <Coffee className="mr-1 h-4 w-4" />
                    {time} min
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};
