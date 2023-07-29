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

export type Row = [Color, Color, Color, Color];

export type ValidationResult =
  | { valid: true; row: Row; rawRow: string }
  | { valid: false; rawRow: string };

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
