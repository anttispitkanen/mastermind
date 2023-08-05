import { describe, expect, it } from 'vitest';
import { parseRow } from './parser';
import { DEFAULT_NUMBER_OF_COLORS, getAvailableColors } from './rules';

const availableColors = getAvailableColors(DEFAULT_NUMBER_OF_COLORS);

describe('parseRow', () => {
  it.each([
    'invalid',
    '1,2,3',
    'red,green,blue,purple', // purple is not valid
    'red,green,blue,red', // duplicate red
    'red,green,blue,red, yellow', // duplicate red
    'red,green,blue,yellow,black', // too many colors
  ])('rejects invalid input (%s)', (invalidRow) => {
    const result = parseRow(availableColors)(invalidRow);
    expect(result.valid).toBe(false);
  });

  it.each([
    'red,green,blue,yellow',
    'white, black, brown, orange',
    ' white,    black   , BROWN,  oRanGE',
  ])('accepts valid input (%s)', (validRow) => {
    const result = parseRow(availableColors)(validRow);
    expect(result.valid).toBe(true);
  });
});
