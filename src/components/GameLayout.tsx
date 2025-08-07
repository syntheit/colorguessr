import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { ColorDisplay } from "~/components/ColorDisplay";
import { ScoreDisplay } from "~/components/ScoreDisplay";
import { cn } from "~/lib/utils";

interface GameLayoutProps {
  title: string;
  subtitle: string;
  score: number;
  totalRounds: number;
  currentRound: number;
  bestScore?: number;
  averageAccuracy?: number;
  currentColor: string;
  children: React.ReactNode;
  className?: string;
}

export function GameLayout({
  title,
  subtitle,
  score,
  totalRounds,
  currentRound,
  bestScore,
  averageAccuracy,
  currentColor,
  children,
  className
}: GameLayoutProps) {
  return (
    <div className={cn("min-h-screen bg-background flex items-center justify-center p-4", className)}>
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/" className="w-20">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <div className="text-center flex-1">
            <h1 className="text-2xl font-bold text-foreground">{title}</h1>
            <p className="text-muted-foreground">{subtitle}</p>
          </div>
          <div className="w-20"></div> {/* Spacer for centering */}
        </div>

        {/* Score Display */}
        <ScoreDisplay
          score={score}
          totalRounds={totalRounds}
          currentRound={currentRound}
          bestScore={bestScore}
          averageAccuracy={averageAccuracy}
        />

        {/* Color Display */}
        <div className="my-8">
          <ColorDisplay 
            color={currentColor} 
            className="mb-4"
          />
        </div>

        {/* Game Content */}
        {children}
      </div>
    </div>
  );
} 