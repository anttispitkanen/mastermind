import { Color } from './types';

// Default value
export const MAX_GUESSES = 10;

// Default value
export const ROW_LENGTH = 4;

export const DEFAULT_NUMBER_OF_COLORS = 8;

export const getAvailableColors = (
  howMany: number = DEFAULT_NUMBER_OF_COLORS,
) => {
  return Object.values(Color).slice(0, howMany);
};
