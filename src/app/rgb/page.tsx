"use client";

import { GameLayout } from "~/components/GameLayout";
import { RGBInput } from "~/components/ColorInput";
import { ResultModal } from "~/components/ResultModal";
import { GameResults } from "~/components/GameResults";
import { useColorGame } from "~/hooks/useColorGame";
import { GAME_CONFIG, STORAGE_KEYS } from "~/lib/constants";

export default function RGBGame() {
  const {
    gameState,
    currentColor,
    userGuessRGB,
    handleRGBInputChange,
    handleGuess,
    handleNext,
    handlePlayAgain,
    isGuessValid,
    getFormattedUserGuess,
    getFormattedCorrectAnswer,
    averageAccuracy
  } = useColorGame({
    mode: 'rgb',
    totalRounds: GAME_CONFIG.TOTAL_ROUNDS,
    localStorageKey: STORAGE_KEYS.RGB_BEST_SCORE
  });

  if (gameState.showResults) {
    return (
      <GameResults
        score={gameState.score}
        totalRounds={GAME_CONFIG.TOTAL_ROUNDS}
        accuracy={Math.round((gameState.score / GAME_CONFIG.TOTAL_ROUNDS))}
        bestScore={gameState.bestScore}
        onPlayAgain={handlePlayAgain}
        gameMode="RGB"
      />
    );
  }

  return (
    <GameLayout
      title="Guess the RGB Values"
      subtitle="Look at the color and enter its RGB values"
      score={gameState.score}
      totalRounds={GAME_CONFIG.TOTAL_ROUNDS}
      currentRound={gameState.currentRound}
      bestScore={gameState.bestScore}
      averageAccuracy={averageAccuracy}
      currentColor={currentColor}
    >
      {/* Input Section */}
      <div className="p-8 rounded-2xl border shadow-xl bg-card border-border">
        <RGBInput
          values={userGuessRGB}
          onChange={handleRGBInputChange}
          onGuess={handleGuess}
          disabled={!isGuessValid}
        />
      </div>

      {/* Result Modal */}
      {gameState.showResult && (
        <ResultModal
          isCorrect={gameState.isCorrect}
          userGuess={getFormattedUserGuess()}
          correctAnswer={getFormattedCorrectAnswer()}
          onNext={handleNext}
          isLastRound={gameState.currentRound === GAME_CONFIG.TOTAL_ROUNDS}
          gameMode="rgb"
        />
      )}
    </GameLayout>
  );
} 