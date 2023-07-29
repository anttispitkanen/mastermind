import { Color, Row } from './types';

export const createRandomRow = (): Row => {
  const colors = Object.values(Color);

  // Shuffle the colors
  const shuffledColors = colors.sort(() => Math.random() - 0.5);

  // Pick the first 4 colors
  const randomRow = shuffledColors.slice(0, 4);

  // Hypothetical situation: we have less than 4 colors in the enum.
  if (randomRow.length < 4) throw new Error('Not enough colors');

  return randomRow as Row;
};
