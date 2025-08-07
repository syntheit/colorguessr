"use client";

import { GameLayout } from "~/components/GameLayout";
import { HexInput } from "~/components/ColorInput";
import { ResultModal } from "~/components/ResultModal";
import { GameResults } from "~/components/GameResults";
import { useColorGame } from "~/hooks/useColorGame";
import { GAME_CONFIG, STORAGE_KEYS } from "~/lib/constants";

export default function HexGame() {
  const {
    gameState,
    currentColor,
    userGuess,
    handleHexInputChange,
    handleGuess,
    handleNext,
    handlePlayAgain,
    isGuessValid,
    getFormattedUserGuess,
    getFormattedCorrectAnswer,
    averageAccuracy
  } = useColorGame({
    mode: 'hex',
    totalRounds: GAME_CONFIG.TOTAL_ROUNDS,
    localStorageKey: STORAGE_KEYS.HEX_BEST_SCORE
  });

  if (gameState.showResults) {
    return (
      <GameResults
        score={gameState.score}
        totalRounds={GAME_CONFIG.TOTAL_ROUNDS}
        accuracy={Math.round((gameState.score / GAME_CONFIG.TOTAL_ROUNDS))}
        bestScore={gameState.bestScore}
        onPlayAgain={handlePlayAgain}
        gameMode="Hex"
      />
    );
  }

  return (
    <GameLayout
      title="Guess the Hex Color"
      subtitle="Look at the color and enter its hex code"
      score={gameState.score}
      totalRounds={GAME_CONFIG.TOTAL_ROUNDS}
      currentRound={gameState.currentRound}
      bestScore={gameState.bestScore}
      averageAccuracy={averageAccuracy}
      currentColor={currentColor}
    >
      {/* Input Section */}
      <div className="p-8 rounded-2xl border shadow-xl bg-card border-border">
        <HexInput
          value={userGuess}
          onChange={handleHexInputChange}
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
          gameMode="hex"
        />
      )}
    </GameLayout>
  );
} 