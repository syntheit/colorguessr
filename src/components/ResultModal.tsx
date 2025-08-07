import { CheckCircle, XCircle, ArrowRight, Star, ThumbsUp, Meh, Frown } from "lucide-react";
import { Button } from "~/components/ui/button";
import { calculateColorDifference, rgbToHex } from "~/lib/game-utils";
import { memo, useMemo } from "react";

interface ResultModalProps {
  isCorrect: boolean;
  userGuess: string;
  correctAnswer: string;
  onNext: () => void;
  onRetry?: () => void;
  isLastRound?: boolean;
  gameMode: 'hex' | 'rgb';
}

const RESULT_TIERS = [
  { threshold: 0, icon: CheckCircle, color: 'text-green-500', message: 'Perfect!', description: 'You got it exactly right!' },
  { threshold: 5, icon: Star, color: 'text-amber-500', message: 'Excellent!', description: 'Very close - great job!' },
  { threshold: 15, icon: ThumbsUp, color: 'text-blue-500', message: 'Good!', description: 'Close - nice work!' },
  { threshold: 30, icon: Meh, color: 'text-orange-500', message: 'Fair', description: 'Somewhat close - keep practicing!' },
  { threshold: 50, icon: Frown, color: 'text-red-400', message: 'Poor', description: 'Not very close - try again!' },
  { threshold: Infinity, icon: XCircle, color: 'text-red-500', message: 'Way Off', description: 'Quite far off - keep learning!' }
] as const;

export const ResultModal = memo(function ResultModal({ 
  userGuess, 
  correctAnswer, 
  onNext, 
  onRetry,
  isLastRound = false,
  gameMode
}: ResultModalProps) {
  const accuracy = useMemo(() => 
    calculateColorDifference(userGuess, correctAnswer, gameMode), 
    [userGuess, correctAnswer, gameMode]
  );
  const accuracyPercentage = useMemo(() => Math.round(100 - accuracy), [accuracy]);
  
  const resultTier = useMemo(() => {
    const tier = RESULT_TIERS.find(tier => accuracy <= tier.threshold) ?? RESULT_TIERS[RESULT_TIERS.length - 1]!;
    return tier;
  }, [accuracy]);

  const IconComponent = resultTier.icon;
  
  const { userGuessHex, correctAnswerHex } = useMemo(() => {
    const getUserGuessHex = () => {
      if (gameMode === 'hex') return userGuess;
      const parts = userGuess.split(',').map(s => parseInt(s.trim()));
      if (parts.length === 3 && !parts.some(isNaN)) {
        return rgbToHex(parts[0]!, parts[1]!, parts[2]!);
      }
      return '#000000';
    };

    const getCorrectAnswerHex = () => {
      if (gameMode === 'hex') return correctAnswer;
      const parts = correctAnswer.split(',').map(s => parseInt(s.trim()));
      if (parts.length === 3 && !parts.some(isNaN)) {
        return rgbToHex(parts[0]!, parts[1]!, parts[2]!);
      }
      return '#000000';
    };

    return {
      userGuessHex: getUserGuessHex(),
      correctAnswerHex: getCorrectAnswerHex()
    };
  }, [userGuess, correctAnswer, gameMode]);

  return (
    <div className="flex fixed inset-0 z-50 justify-center items-center p-4 backdrop-blur-sm bg-black/50">
      <div className="p-8 w-full max-w-lg rounded-2xl border shadow-2xl bg-card border-border">
        <div className="text-center">
          <div className="mb-6">
            <IconComponent className={`w-16 h-16 ${resultTier.color} mx-auto mb-4`} />
            <h2 className="mb-2 text-2xl font-bold text-foreground">
              {resultTier.message}
            </h2>
            <p className="mb-2 text-muted-foreground">
              {resultTier.description}
            </p>
            <div className="text-sm text-muted-foreground">
              You were {accuracyPercentage}% accurate (Color difference: {accuracy.toFixed(1)}%)
            </div>
          </div>

          <div className="mb-8">
            <h3 className="mb-4 text-lg font-semibold text-foreground">Color Comparison</h3>
            <div className="overflow-hidden relative mb-4 w-full h-32 rounded-xl border-2 border-border">
              <div 
                className="absolute top-0 left-0 w-1/2 h-full"
                style={{ backgroundColor: correctAnswerHex }}
              />
              <div 
                className="absolute top-0 right-0 w-1/2 h-full"
                style={{ backgroundColor: userGuessHex }}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-sm font-medium text-foreground">Correct Answer</div>
                <div className="font-mono text-xs text-muted-foreground">{correctAnswer}</div>
              </div>
              <div className="text-center">
                <div className="text-sm font-medium text-foreground">Your Guess</div>
                <div className="font-mono text-xs text-muted-foreground">{userGuess}</div>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            {onRetry && (
              <Button 
                variant="outline" 
                onClick={onRetry}
                className="flex-1"
              >
                Try Again
              </Button>
            )}
            <Button 
              onClick={onNext}
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              {isLastRound ? "See Results" : "Next Round"}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
});