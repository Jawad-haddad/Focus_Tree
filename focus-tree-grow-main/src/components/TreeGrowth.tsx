interface TreeGrowthProps {
  progress: number;
  theme?: 'default' | 'autumn' | 'spring' | 'winter';
}

export const TreeGrowth = ({ progress, theme = 'default' }: TreeGrowthProps) => {
  const getThemeColors = () => {
    switch (theme) {
      case 'autumn':
        return { leaf: '#d97706', accent: '#ea580c', trunk: '#78350f' };
      case 'spring':
        return { leaf: '#86efac', accent: '#fbbf24', trunk: '#78350f' };
      case 'winter':
        return { leaf: '#e0f2fe', accent: '#bae6fd', trunk: '#71717a' };
      default:
        return { leaf: 'hsl(var(--leaf))', accent: 'hsl(var(--accent))', trunk: 'hsl(var(--trunk))' };
    }
  };

  const colors = getThemeColors();
  const getTreeStage = () => {
    if (progress < 20) return "seed";
    if (progress < 40) return "sprout";
    if (progress < 60) return "sapling";
    if (progress < 80) return "young";
    return "mature";
  };

  const stage = getTreeStage();

  return (
    <div className="relative w-64 h-64 flex items-end justify-center">
      {/* Ground */}
      <div className="absolute bottom-0 left-0 right-0 h-3 bg-gradient-to-b from-[hsl(var(--earth))] to-[hsl(var(--trunk))] rounded-full" />
      
      {/* Tree Stages */}
      <div className="relative mb-3 transition-all duration-1000 ease-out">
        {/* Seed */}
        {stage === "seed" && (
          <div className="animate-grow">
            <div className="w-8 h-8 bg-[hsl(var(--seed))] rounded-full shadow-md animate-pulse-soft" />
          </div>
        )}

        {/* Sprout */}
        {stage === "sprout" && (
          <div className="animate-grow">
            <div className="flex flex-col items-center">
              <div className="w-2 h-12 rounded-t-full" style={{ background: `linear-gradient(to top, ${colors.trunk}, ${colors.leaf})` }} />
              <div className="w-8 h-8 bg-[hsl(var(--seed))] rounded-full -mt-2" />
            </div>
          </div>
        )}

        {/* Sapling */}
        {stage === "sapling" && (
          <div className="animate-grow">
            <div className="flex flex-col items-center">
              <div className="flex gap-4 mb-1">
                <div className="w-6 h-6 rounded-full opacity-80" style={{ backgroundColor: colors.leaf }} />
                <div className="w-6 h-6 rounded-full opacity-80" style={{ backgroundColor: colors.leaf }} />
              </div>
              <div className="w-3 h-24 rounded-t-lg" style={{ background: `linear-gradient(to top, ${colors.trunk}, ${colors.leaf})` }} />
            </div>
          </div>
        )}

        {/* Young Tree */}
        {stage === "young" && (
          <div className="animate-grow">
            <div className="flex flex-col items-center">
              <div className="relative mb-2">
                <div className="w-16 h-16 rounded-full opacity-90" style={{ backgroundColor: colors.leaf }} />
                <div className="absolute -left-4 top-2 w-10 h-10 rounded-full opacity-80" style={{ backgroundColor: colors.leaf }} />
                <div className="absolute -right-4 top-2 w-10 h-10 rounded-full opacity-80" style={{ backgroundColor: colors.leaf }} />
              </div>
              <div className="w-4 h-32 rounded-t-lg shadow-md" style={{ background: `linear-gradient(to top, ${colors.trunk}, hsl(var(--earth)))` }} />
            </div>
          </div>
        )}

        {/* Mature Tree */}
        {stage === "mature" && (
          <div className="animate-grow">
            <div className="flex flex-col items-center animate-float">
              <div className="relative mb-3">
                {/* Main canopy */}
                <div className="w-24 h-24 rounded-full shadow-[var(--shadow-tree)]" style={{ background: `linear-gradient(to bottom, ${colors.accent}, ${colors.leaf})` }} />
                
                {/* Side canopies */}
                <div className="absolute -left-6 top-4 w-16 h-16 rounded-full opacity-90" style={{ background: `linear-gradient(to bottom, ${colors.accent}, ${colors.leaf})` }} />
                <div className="absolute -right-6 top-4 w-16 h-16 rounded-full opacity-90" style={{ background: `linear-gradient(to bottom, ${colors.accent}, ${colors.leaf})` }} />
                
                {/* Top canopy */}
                <div className="absolute left-1/2 -translate-x-1/2 -top-4 w-20 h-20 rounded-full opacity-95" style={{ background: `linear-gradient(to bottom, ${colors.accent}, ${colors.leaf})` }} />
                
                {/* Small accent leaves */}
                <div className="absolute -left-10 top-10 w-8 h-8 rounded-full opacity-70" style={{ backgroundColor: colors.accent }} />
                <div className="absolute -right-10 top-10 w-8 h-8 rounded-full opacity-70" style={{ backgroundColor: colors.accent }} />
              </div>
              
              {/* Trunk */}
              <div className="w-5 h-40 rounded-t-xl shadow-lg relative" style={{ background: `linear-gradient(to top, ${colors.trunk}, hsl(var(--earth)), ${colors.trunk})` }}>
                <div className="absolute top-8 -left-2 w-3 h-12 rounded-full opacity-60 rotate-45" style={{ backgroundColor: colors.trunk }} />
                <div className="absolute top-8 -right-2 w-3 h-12 rounded-full opacity-60 -rotate-45" style={{ backgroundColor: colors.trunk }} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
