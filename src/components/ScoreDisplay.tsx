import { Trophy, Target } from "lucide-react";
import { memo, useMemo } from "react";

interface ScoreDisplayProps {
  score: number;
  totalRounds: number;
  currentRound: number;
  bestScore?: number;
  averageAccuracy?: number;
}

export const ScoreDisplay = memo(function ScoreDisplay({ 
  score, 
  totalRounds, 
  currentRound, 
  bestScore, 
  averageAccuracy 
}: ScoreDisplayProps) {
  const calculatedAccuracy = useMemo(() => 
    averageAccuracy ?? Math.round((score / currentRound)), 
    [averageAccuracy, score, currentRound]
  );

  return (
    <div className="flex items-center justify-between bg-card border border-border rounded-2xl p-6 shadow-xl">
      <div className="flex items-center gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-foreground">{score}</div>
          <div className="text-sm text-muted-foreground">Score</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-foreground">{currentRound}/{totalRounds}</div>
          <div className="text-sm text-muted-foreground">Round</div>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        {bestScore !== undefined && (
          <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
            <Trophy className="w-5 h-5" />
            <span className="font-semibold">Best: {bestScore}</span>
          </div>
        )}
        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
          <Target className="w-5 h-5" />
          <span className="font-semibold">{calculatedAccuracy}%</span>
        </div>
      </div>
    </div>
  );
}); 