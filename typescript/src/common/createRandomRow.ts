import { ROW_LENGTH } from './rules';
import { Color, Row } from './types';

export const createRandomRow = (availableColors: Color[]): Row => {
  // Shuffle the colors
  const shuffledColors = [...availableColors].sort(() => Math.random() - 0.5);

  // Pick the first 4 colors
  const randomRow = shuffledColors.slice(0, ROW_LENGTH);

  // Hypothetical situation: we have less than 4 colors in the enum.
  if (randomRow.length < ROW_LENGTH) throw new Error('Not enough colors');

  return randomRow as Row;
};
