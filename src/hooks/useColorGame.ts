import { useState, useEffect, useCallback } from "react";
import { 
  generateRandomHex, 
  generateRandomRGB,
  rgbToHex,
  calculateColorDifference, 
  calculateScore, 
  isValidHex,
  formatRGB
} from "~/lib/game-utils";

export type GameMode = 'hex' | 'rgb';

interface GameState {
  score: number;
  currentRound: number;
  showResult: boolean;
  showResults: boolean;
  isCorrect: boolean;
  bestScore?: number;
  totalAccuracy: number;
}

interface UseColorGameOptions {
  mode: GameMode;
  totalRounds?: number;
  localStorageKey?: string;
  isPractice?: boolean;
}

export function useColorGame({ 
  mode, 
  totalRounds = 10, 
  localStorageKey,
  isPractice = false 
}: UseColorGameOptions) {
  const [gameState, setGameState] = useState<GameState>({
    score: 0,
    currentRound: 1,
    showResult: false,
    showResults: false,
    isCorrect: false,
    totalAccuracy: 0
  });

  const [currentColor, setCurrentColor] = useState("");
  const [currentRGB, setCurrentRGB] = useState({ r: 0, g: 0, b: 0 });
  
  const [userGuess, setUserGuess] = useState("");
  const [userGuessRGB, setUserGuessRGB] = useState({ r: "", g: "", b: "" });

  useEffect(() => {
    if (localStorageKey) {
      const saved = localStorage.getItem(localStorageKey);
      if (saved) {
        setGameState(prev => ({ ...prev, bestScore: parseInt(saved) }));
      }
    }
  }, [localStorageKey]);

  const generateNewColor = useCallback(() => {
    if (mode === 'hex') {
      const hexColor = generateRandomHex();
      setCurrentColor(hexColor);
      setUserGuess("");
    } else {
      const rgbColor = generateRandomRGB();
      setCurrentRGB(rgbColor);
      setCurrentColor(rgbToHex(rgbColor.r, rgbColor.g, rgbColor.b));
      setUserGuessRGB({ r: "", g: "", b: "" });
    }
  }, [mode]);

  useEffect(() => {
    generateNewColor();
  }, [generateNewColor]);

  const handleRGBInputChange = useCallback((channel: 'r' | 'g' | 'b', value: string) => {
    const numValue = value.replace(/[^0-9]/g, '');
    if (numValue === '' || (parseInt(numValue) >= 0 && parseInt(numValue) <= 255)) {
      setUserGuessRGB(prev => ({ ...prev, [channel]: numValue }));
    }
  }, []);

  const handleHexInputChange = useCallback((value: string) => {
    setUserGuess(value);
  }, []);

  const isGuessValid = useCallback(() => {
    if (mode === 'hex') {
      return userGuess !== "" && isValidHex(`#${userGuess}`);
    } else {
      return userGuessRGB.r !== "" && userGuessRGB.g !== "" && userGuessRGB.b !== "";
    }
  }, [mode, userGuess, userGuessRGB]);

  const handleGuess = useCallback(() => {
    if (mode === 'hex') {
      const hexWithHash = `#${userGuess}`;
      if (!isValidHex(hexWithHash)) {
        alert("Please enter a valid hex color (e.g., FF0000)");
        return;
      }

      const difference = calculateColorDifference(hexWithHash, currentColor, 'hex');
      const roundScore = calculateScore(difference);
      const correct = difference === 0;
      const roundAccuracy = Math.round(100 - difference);

      setGameState(prev => ({
        ...prev,
        score: prev.score + roundScore,
        totalAccuracy: prev.totalAccuracy + roundAccuracy,
        isCorrect: correct,
        showResult: true
      }));
    } else {
      const guessString = formatRGB(
        parseInt(userGuessRGB.r) || 0,
        parseInt(userGuessRGB.g) || 0,
        parseInt(userGuessRGB.b) || 0
      );
      const actualString = formatRGB(currentRGB.r, currentRGB.g, currentRGB.b);

      const difference = calculateColorDifference(guessString, actualString, 'rgb');
      const roundScore = calculateScore(difference);
      const correct = difference === 0;
      const roundAccuracy = Math.round(100 - difference);

      setGameState(prev => ({
        ...prev,
        score: prev.score + roundScore,
        totalAccuracy: prev.totalAccuracy + roundAccuracy,
        isCorrect: correct,
        showResult: true
      }));
    }
  }, [mode, userGuess, userGuessRGB, currentColor, currentRGB]);

  const handleNext = useCallback(() => {
    setGameState(prev => {
      const newState = { ...prev, showResult: false };
      
      if (isPractice || prev.currentRound === totalRounds) {
        if (!isPractice && localStorageKey && prev.score > (prev.bestScore ?? 0)) {
          localStorage.setItem(localStorageKey, prev.score.toString());
          newState.bestScore = prev.score;
        }
        
        if (!isPractice) {
          newState.showResults = true;
        } else {
          setTimeout(() => generateNewColor(), 0);
        }
      } else {
        newState.currentRound = prev.currentRound + 1;
        setTimeout(() => generateNewColor(), 0);
      }
      
      return newState;
    });
  }, [isPractice, totalRounds, localStorageKey, generateNewColor]);

  const handlePlayAgain = useCallback(() => {
    setGameState({
      score: 0,
      currentRound: 1,
      showResult: false,
      showResults: false,
      isCorrect: false,
      bestScore: gameState.bestScore,
      totalAccuracy: 0
    });
    generateNewColor();
  }, [gameState.bestScore, generateNewColor]);

  const handleRetry = useCallback(() => {
    setGameState(prev => ({ ...prev, showResult: false }));
  }, []);

  const getFormattedUserGuess = useCallback(() => {
    if (mode === 'hex') {
      return `#${userGuess}`;
    } else {
      return formatRGB(
        parseInt(userGuessRGB.r) || 0,
        parseInt(userGuessRGB.g) || 0,
        parseInt(userGuessRGB.b) || 0
      );
    }
  }, [mode, userGuess, userGuessRGB]);

  const getFormattedCorrectAnswer = useCallback(() => {
    if (mode === 'hex') {
      return currentColor;
    } else {
      return formatRGB(currentRGB.r, currentRGB.g, currentRGB.b);
    }
  }, [mode, currentColor, currentRGB]);

  return {
    gameState,
    currentColor,
    currentRGB,
    userGuess,
    userGuessRGB,
    
    generateNewColor,
    handleRGBInputChange,
    handleHexInputChange,
    handleGuess,
    handleNext,
    handlePlayAgain,
    handleRetry,
    isGuessValid: isGuessValid(),
    
    getFormattedUserGuess,
    getFormattedCorrectAnswer,
    averageAccuracy: Math.round(gameState.totalAccuracy / gameState.currentRound)
  };
} 