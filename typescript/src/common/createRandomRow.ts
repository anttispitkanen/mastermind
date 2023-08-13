import { Color, Row } from './types';

export const createRandomRow = (
  availableColors: Color[],
  rowLength: number,
): Row => {
  // Shuffle the colors
  const shuffledColors = [...availableColors].sort(() => Math.random() - 0.5);

  // Pick the first 4 colors
  const randomRow = shuffledColors.slice(0, rowLength);

  // We have less than the desired number of colors in the enum.
  if (randomRow.length < rowLength) throw new Error('Not enough colors');

  return randomRow as Row;
};
