export enum Color {
  RED = 'RED',
  GREEN = 'GREEN',
  BLUE = 'BLUE',
  YELLOW = 'YELLOW',
  BROWN = 'BROWN',
  BLACK = 'BLACK',
  WHITE = 'WHITE',
  ORANGE = 'ORANGE',
  PURPLE = 'PURPLE',
  RAINBOW = 'RAINBOW',
}

export type Row = Color[];

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

export enum GameStatus {
  WON = 'won',
  LOST = 'lost',
  IN_PROGRESS = 'in-progress',
}

export type Settings = {
  rowLength: number;
  numberOfColors: number;
};
