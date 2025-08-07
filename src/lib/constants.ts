export const GAME_CONFIG = {
  TOTAL_ROUNDS: 10,
  MAX_COLOR_VALUE: 255,
  MAX_HEX_VALUE: 16777215,
  MAX_COLOR_DISTANCE: Math.sqrt(255 ** 2 * 3),
} as const;

export const STORAGE_KEYS = {
  HEX_BEST_SCORE: "colorguessr-hex-best",
  RGB_BEST_SCORE: "colorguessr-rgb-best",
} as const;

export const SCORE_THRESHOLDS = {
  PERFECT: 0,
  EXCELLENT: 5,
  GOOD: 15,
  FAIR: 30,
  POOR: 50,
} as const;

export const SCORE_VALUES = {
  PERFECT: 100,
  EXCELLENT: 90,
  GOOD: 75,
  FAIR: 50,
  POOR: 25,
  VERY_POOR: 0,
} as const;

export const GAME_MODES = {
  HEX: 'hex',
  RGB: 'rgb',
} as const;

export const INPUT_VALIDATION = {
  HEX_REGEX: /^#[0-9A-F]{6}$/i,
  RGB_MAX_LENGTH: 3,
  HEX_MAX_LENGTH: 7,
} as const; 