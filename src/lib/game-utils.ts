import { GAME_CONFIG, SCORE_THRESHOLDS, SCORE_VALUES, INPUT_VALIDATION } from "./constants";

export function generateRandomHex(): string {
  return '#' + Math.floor(Math.random() * GAME_CONFIG.MAX_HEX_VALUE).toString(16).padStart(6, '0');
}

export function generateRandomRGB(): { r: number; g: number; b: number } {
  return {
    r: Math.floor(Math.random() * (GAME_CONFIG.MAX_COLOR_VALUE + 1)),
    g: Math.floor(Math.random() * (GAME_CONFIG.MAX_COLOR_VALUE + 1)),
    b: Math.floor(Math.random() * (GAME_CONFIG.MAX_COLOR_VALUE + 1))
  };
}

export function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number): string => {
    const hex = Math.max(0, Math.min(GAME_CONFIG.MAX_COLOR_VALUE, n)).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  return '#' + toHex(r) + toHex(g) + toHex(b);
}

export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1]!, 16),
    g: parseInt(result[2]!, 16),
    b: parseInt(result[3]!, 16)
  } : null;
}

export function calculateColorDifference(guess: string, actual: string, mode: 'hex' | 'rgb'): number {
  if (mode === 'hex') {
    const guessRgb = hexToRgb(guess);
    const actualRgb = hexToRgb(actual);
    
    if (!guessRgb || !actualRgb) return 100;
    
    const diff = Math.sqrt(
      Math.pow(guessRgb.r - actualRgb.r, 2) +
      Math.pow(guessRgb.g - actualRgb.g, 2) +
      Math.pow(guessRgb.b - actualRgb.b, 2)
    );
    
    return Math.min(100, (diff / GAME_CONFIG.MAX_COLOR_DISTANCE) * 100);
  } else {
    const guessParts = guess.split(',').map(s => parseInt(s.trim()));
    const actualParts = actual.split(',').map(s => parseInt(s.trim()));
    
    if (guessParts.length !== 3 || actualParts.length !== 3) return 100;
    
    if (guessParts.some(isNaN) || actualParts.some(isNaN)) return 100;
    
    const diff = Math.sqrt(
      Math.pow(guessParts[0]! - actualParts[0]!, 2) +
      Math.pow(guessParts[1]! - actualParts[1]!, 2) +
      Math.pow(guessParts[2]! - actualParts[2]!, 2)
    );
    
    return Math.min(100, (diff / GAME_CONFIG.MAX_COLOR_DISTANCE) * 100);
  }
}

export function calculateScore(accuracy: number): number {
  if (accuracy === SCORE_THRESHOLDS.PERFECT) return SCORE_VALUES.PERFECT;
  if (accuracy <= SCORE_THRESHOLDS.EXCELLENT) return SCORE_VALUES.EXCELLENT;
  if (accuracy <= SCORE_THRESHOLDS.GOOD) return SCORE_VALUES.GOOD;
  if (accuracy <= SCORE_THRESHOLDS.FAIR) return SCORE_VALUES.FAIR;
  if (accuracy <= SCORE_THRESHOLDS.POOR) return SCORE_VALUES.POOR;
  return SCORE_VALUES.VERY_POOR;
}

export function formatRGB(r: number, g: number, b: number): string {
  return `${r}, ${g}, ${b}`;
}

export function isValidHex(hex: string): boolean {
  return INPUT_VALIDATION.HEX_REGEX.test(hex);
}

export function isValidRGB(rgb: string): boolean {
  const parts = rgb.split(',').map(s => s.trim());
  if (parts.length !== 3) return false;
  
  return parts.every(part => {
    const num = parseInt(part);
    return !isNaN(num) && num >= 0 && num <= 255;
  });
} 