import { Color, Row } from './types';

const colorsToEmojis = {
  [Color.RED]: '🔴',
  [Color.GREEN]: '🟢',
  [Color.BLUE]: '🔵',
  [Color.YELLOW]: '🟡',
  [Color.ORANGE]: '🟠',
  [Color.BLACK]: '⚫️',
  [Color.WHITE]: '⚪️',
  [Color.BROWN]: '🟤',
} as const;

/**
 * Render a row as emojis
 */
export const renderRow = (row: Row) => {
  return row.map((color) => colorsToEmojis[color]).join(' ');
};
