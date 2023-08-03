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
  [Color.PURPLE]: '🟣',
  [Color.RAINBOW]: '🏳️‍🌈',
} as const;

export const renderColor = (color: Color) => colorsToEmojis[color];

/**
 * Render a row as emojis
 */
export const renderRow = (row: Row) => {
  return row.map((color) => renderColor(color)).join(' ');
};
