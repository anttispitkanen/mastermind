export enum Color {
  RED = 'RED',
  GREEN = 'GREEN',
  BLUE = 'BLUE',
  YELLOW = 'YELLOW',
  BROWN = 'BROWN',
  BLACK = 'BLACK',
  WHITE = 'WHITE',
  ORANGE = 'ORANGE',
}

// TODO: is there a way to ensure uniqueness of colors on type level?
export type Row = [Color, Color, Color, Color];

export type ValidationResult =
  | { valid: true; row: Row; rawRow: string }
  | { valid: false; rawRow: string; error?: Error };

export type GuessResult =
  | {
      perfectMatch: true;
      correctColorInCorrectPlace: 4;
      correctColorInWrongPlace: 0;
    }
  | {
      perfectMatch: false;
      correctColorInCorrectPlace: number;
      correctColorInWrongPlace: number;
    };
