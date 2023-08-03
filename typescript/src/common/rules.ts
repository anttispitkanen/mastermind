import { Color } from './types';

// Default value
export const MAX_GUESSES = 10;

// Default value
export const ROW_LENGTH = 4;

export const getAvailableColors = (howMany: number = 8) => {
  return Object.values(Color).slice(0, howMany);
};
