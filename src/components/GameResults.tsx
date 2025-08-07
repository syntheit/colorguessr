import { Trophy, Target, RotateCcw, Home } from "lucide-react";
import { Button } from "~/components/ui/button";
import Link from "next/link";

interface GameResultsProps {
  score: number;
  totalRounds: number;
  accuracy: number;
  bestScore?: number;
  onPlayAgain: () => void;
  gameMode: string;
}

export function GameResults({ 
  score, 
  totalRounds, 
  accuracy, 
  bestScore, 
  onPlayAgain,
  gameMode 
}: GameResultsProps) {
  const isNewBest = bestScore !== undefined && score > bestScore;
  
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-card border border-border rounded-2xl p-8 max-w-lg w-full shadow-2xl">
        <div className="text-center">
          <div className="mb-6">
            {isNewBest ? (
              <Trophy className="w-20 h-20 text-amber-500 mx-auto mb-4" />
            ) : (
              <Target className="w-20 h-20 text-blue-500 mx-auto mb-4" />
            )}
            <h2 className="text-3xl font-bold text-foreground mb-2">
              {isNewBest ? "New Best Score!" : "Game Complete"}
            </h2>
            <p className="text-muted-foreground">
              {isNewBest ? "Congratulations! You've set a new record!" : "Great job completing the game!"}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-blue-50 dark:bg-blue-950/30 rounded-xl p-4">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{score}</div>
              <div className="text-sm text-blue-600 dark:text-blue-400">Score</div>
            </div>
            <div className="bg-green-50 dark:bg-green-950/30 rounded-xl p-4">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">{accuracy}%</div>
              <div className="text-sm text-green-600 dark:text-green-400">Accuracy</div>
            </div>
            <div className="bg-purple-50 dark:bg-purple-950/30 rounded-xl p-4">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{totalRounds}</div>
              <div className="text-sm text-purple-600 dark:text-purple-400">Rounds</div>
            </div>
            <div className="bg-orange-50 dark:bg-orange-950/30 rounded-xl p-4">
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{gameMode}</div>
              <div className="text-sm text-orange-600 dark:text-orange-400">Mode</div>
            </div>
          </div>

          {bestScore !== undefined && (
            <div className="mb-6 p-4 bg-amber-50 dark:bg-amber-950/30 rounded-xl">
              <div className="text-sm text-amber-600 dark:text-amber-400 mb-1">Best Score</div>
              <div className="text-xl font-bold text-amber-700 dark:text-amber-300">{bestScore}</div>
            </div>
          )}

          <div className="flex gap-3">
            <Link href="/" className="flex-1">
              <Button variant="outline" className="w-full">
                <Home className="w-4 h-4 mr-2" />
                Home
              </Button>
            </Link>
            <Button 
              onClick={onPlayAgain}
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Play Again
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 