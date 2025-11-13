import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Timer, TrendingUp, Trophy, Target, Leaf, Volume2, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const slides = [
  {
    id: 1,
    title: "Focus Tree",
    subtitle: "Grow Your Productivity, One Session at a Time",
    icon: Leaf,
    content: "A beautiful productivity app that helps you stay focused and track your progress through a growing tree visualization.",
    gradient: "from-primary via-primary/80 to-accent",
  },
  {
    id: 2,
    title: "Tree Growth Visualization",
    subtitle: "Watch Your Focus Come to Life",
    icon: Leaf,
    content: "Your tree grows through 5 stages as you complete your session: Seed → Sprout → Sapling → Young Tree → Mature Tree",
    features: [
      "5 growth stages",
      "Seasonal themes (Default, Autumn, Spring, Winter)",
      "Smooth animations",
      "Real-time progress",
    ],
    gradient: "from-leaf via-leaf/80 to-accent",
  },
  {
    id: 3,
    title: "Pomodoro Timer",
    subtitle: "Customizable Focus Sessions",
    icon: Timer,
    content: "Choose from preset durations (15, 25, 45, 60 minutes) or set your own custom time. Watch your tree grow as you focus.",
    features: [
      "Preset time options",
      "Custom duration input",
      "Visual progress tracking",
      "Break timer integration",
    ],
    gradient: "from-accent via-accent/80 to-primary",
  },
  {
    id: 4,
    title: "Ambient Sounds",
    subtitle: "Enhance Your Focus Environment",
    icon: Volume2,
    content: "Choose from calming ambient sounds to help you concentrate during your focus sessions.",
    features: [
      "Forest sounds",
      "Rain ambience",
      "Ocean waves",
      "No sound option",
    ],
    gradient: "from-primary/80 via-accent/60 to-primary",
  },
  {
    id: 5,
    title: "Session Tracking",
    subtitle: "Keep Track of Your Productivity",
    icon: TrendingUp,
    content: "Automatically save and review all your completed focus sessions with detailed history.",
    features: [
      "Automatic session logging",
      "Session duration tracking",
      "Completion timestamps",
      "Export to CSV",
      "Delete individual sessions",
    ],
    gradient: "from-accent/80 via-primary/60 to-accent",
  },
  {
    id: 6,
    title: "Statistics & Insights",
    subtitle: "Visualize Your Progress",
    icon: TrendingUp,
    content: "Get detailed insights into your productivity patterns with beautiful charts and metrics.",
    features: [
      "Total sessions completed",
      "Average session duration",
      "Longest streak tracker",
      "Daily activity bar chart (7 days)",
      "Session duration pie chart",
    ],
    gradient: "from-primary via-accent/70 to-primary/80",
  },
  {
    id: 7,
    title: "Achievements System",
    subtitle: "Unlock Rewards as You Progress",
    icon: Trophy,
    content: "Earn achievements and badges as you reach productivity milestones.",
    features: [
      "First Steps (1 session)",
      "Getting Started (5 sessions)",
      "Building Momentum (10 sessions)",
      "Dedicated Focuser (25 sessions)",
      "Focus Master (50+ sessions)",
      "Progress tracking",
    ],
    gradient: "from-accent via-primary/80 to-accent/80",
  },
  {
    id: 8,
    title: "Daily Goals",
    subtitle: "Set and Achieve Your Daily Targets",
    icon: Target,
    content: "Track your daily progress with visual indicators and motivational messages.",
    features: [
      "Real-time progress tracking",
      "Visual progress bar",
      "Daily statistics",
      "Motivational messages",
      "Session counter",
    ],
    gradient: "from-primary/80 via-leaf/60 to-accent",
  },
  {
    id: 9,
    title: "Dark & Light Themes",
    subtitle: "Personalize Your Experience",
    icon: Leaf,
    content: "Switch between beautiful dark and light themes to match your preference and environment.",
    features: [
      "Seamless theme switching",
      "Eye-friendly colors",
      "Consistent design system",
      "Smooth transitions",
    ],
    gradient: "from-accent/70 via-primary/80 to-accent/90",
  },
  {
    id: 10,
    title: "Start Growing Today",
    subtitle: "Your Focus Journey Begins Now",
    icon: Leaf,
    content: "Join thousands of users who have improved their productivity with Focus Tree.",
    gradient: "from-primary via-accent to-primary/80",
  },
];

export default function Presentation() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");

  const goToSlide = (index: number) => {
    if (index > currentSlide) {
      setDirection("next");
    } else {
      setDirection("prev");
    }
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setDirection("next");
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setDirection("prev");
      setCurrentSlide(currentSlide - 1);
    }
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        nextSlide();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        prevSlide();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [currentSlide]);

  const slide = slides[currentSlide];
  const Icon = slide.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/30 rounded-full blur-3xl animate-pulse delay-700" />
      </div>

      {/* Main Slide */}
      <div className="relative z-10 h-screen flex items-center justify-center p-8">
        <div
          key={currentSlide}
          className={`max-w-5xl w-full ${
            direction === "next" ? "animate-fade-in" : "animate-fade-in"
          }`}
        >
          <div className={`bg-gradient-to-br ${slide.gradient} p-12 rounded-3xl shadow-2xl backdrop-blur-sm`}>
            {/* Icon */}
            <div className="flex justify-center mb-8 animate-scale-in">
              <div className="bg-background/20 p-6 rounded-full backdrop-blur-sm">
                <Icon className="w-16 h-16 text-background" />
              </div>
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-6xl font-bold text-center text-background mb-4 animate-fade-in">
              {slide.title}
            </h1>

            {/* Subtitle */}
            <p className="text-2xl md:text-3xl text-center text-background/90 mb-8 animate-fade-in delay-100">
              {slide.subtitle}
            </p>

            {/* Content */}
            <p className="text-lg md:text-xl text-center text-background/80 mb-8 max-w-3xl mx-auto animate-fade-in delay-200">
              {slide.content}
            </p>

            {/* Features */}
            {slide.features && (
              <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto animate-fade-in delay-300">
                {slide.features.map((feature, index) => (
                  <div
                    key={index}
                    className="bg-background/20 backdrop-blur-sm p-4 rounded-xl hover:bg-background/30 transition-all duration-300 hover-scale"
                  >
                    <p className="text-background font-medium flex items-center gap-2">
                      <span className="w-2 h-2 bg-background rounded-full" />
                      {feature}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-6 bg-background/80 backdrop-blur-md px-8 py-4 rounded-full shadow-lg">
        <Button
          variant="ghost"
          size="icon"
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className="hover:bg-primary/20"
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>

        {/* Slide Indicators */}
        <div className="flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-primary w-8"
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/60"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={nextSlide}
          disabled={currentSlide === slides.length - 1}
          className="hover:bg-primary/20"
        >
          <ChevronRight className="w-6 h-6" />
        </Button>
      </div>

      {/* Slide Counter */}
      <div className="fixed top-8 right-8 z-20 bg-background/80 backdrop-blur-md px-6 py-3 rounded-full shadow-lg">
        <p className="text-sm font-medium text-foreground">
          {currentSlide + 1} / {slides.length}
        </p>
      </div>

      {/* Back to App Button */}
      <div className="fixed top-8 left-8 z-20">
        <Link to="/">
          <Button variant="outline" size="sm" className="gap-2 bg-background/80 backdrop-blur-md">
            <Home className="h-4 w-4" />
            Back to App
          </Button>
        </Link>
      </div>

      {/* Instructions */}
      <div className="fixed bottom-8 left-8 z-20 bg-background/80 backdrop-blur-md px-6 py-3 rounded-full shadow-lg">
        <p className="text-sm text-muted-foreground">
          Use arrow keys or click to navigate
        </p>
      </div>
    </div>
  );
}
