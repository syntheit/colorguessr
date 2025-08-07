"use client";

import { useState } from "react";
import { RotateCcw } from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { ColorDisplay } from "~/components/ColorDisplay";
import { HexInput, RGBInput } from "~/components/ColorInput";
import { ResultModal } from "~/components/ResultModal";
import { useColorGame } from "~/hooks/useColorGame";

export default function PracticeGame() {
  const [gameMode, setGameMode] = useState<'hex' | 'rgb'>('hex');

  const {
    gameState,
    currentColor,
    userGuess,
    userGuessRGB,
    generateNewColor,
    handleHexInputChange,
    handleRGBInputChange,
    handleGuess,
    handleNext,
    handleRetry,
    isGuessValid,
    getFormattedUserGuess,
    getFormattedCorrectAnswer
  } = useColorGame({
    mode: gameMode,
    isPractice: true
  });

  return (
    <div className="flex justify-center items-center p-4 min-h-screen bg-background">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="w-20">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/">
                ← Back to Home
              </Link>
            </Button>
          </div>
          <div className="flex-1 text-center">
            <h1 className="text-2xl font-bold text-foreground">Practice Mode</h1>
            <p className="text-muted-foreground">Hone your color recognition skills</p>
          </div>
          <div className="w-20"></div> {/* Spacer for centering */}
        </div>

        {/* Mode Selector */}
        <div className="p-6 mb-8 rounded-2xl border shadow-xl bg-card border-border">
          <div className="flex gap-4 justify-center items-center">
            <Button
              variant={gameMode === 'hex' ? 'default' : 'outline'}
              onClick={() => setGameMode('hex')}
              className={`px-6 py-3 font-semibold transition-all duration-200 ${
                gameMode === 'hex' 
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg' 
                  : 'border-2 border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950'
              }`}
            >
              Hex Mode
            </Button>
            <Button
              variant={gameMode === 'rgb' ? 'default' : 'outline'}
              onClick={() => setGameMode('rgb')}
              className={`px-6 py-3 font-semibold transition-all duration-200 ${
                gameMode === 'rgb' 
                  ? 'bg-gradient-to-r from-red-600 to-green-600 hover:from-red-700 hover:to-green-700 text-white shadow-lg' 
                  : 'border-2 border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950'
              }`}
            >
              RGB Mode
            </Button>
          </div>
        </div>

        {/* Color Display */}
        <div className="my-8">
          <ColorDisplay 
            color={currentColor} 
            className="mb-4"
          />
        </div>

        {/* Input Section */}
        <div className="p-8 rounded-2xl border shadow-xl bg-card border-border">
          {gameMode === 'hex' ? (
            <HexInput
              value={userGuess}
              onChange={handleHexInputChange}
              onGuess={handleGuess}
              disabled={!isGuessValid}
            />
          ) : (
            <RGBInput
              values={userGuessRGB}
              onChange={handleRGBInputChange}
              onGuess={handleGuess}
              disabled={!isGuessValid}
            />
          )}
        </div>

        {/* New Color Button */}
        <div className="mt-6 text-center">
          <Button
            variant="outline"
            onClick={generateNewColor}
            className="border-border"
          >
            <RotateCcw className="mr-2 w-4 h-4" />
            New Color
          </Button>
        </div>

        {/* Result Modal */}
        {gameState.showResult && (
          <ResultModal
            isCorrect={gameState.isCorrect}
            userGuess={getFormattedUserGuess()}
            correctAnswer={getFormattedCorrectAnswer()}
            onNext={handleNext}
            onRetry={handleRetry}
            gameMode={gameMode}
          />
        )}
      </div>
    </div>
  );
} 