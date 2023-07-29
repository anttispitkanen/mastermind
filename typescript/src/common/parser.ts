import { Color, Row, ValidationResult } from './types';

/**
 * Split the comma separated string into an array of strings.
 * Make the values uppercase and trim them.
 */
const normalizeRow = (row: string): string[] => {
  return row.split(',').map((color) => color.trim().toUpperCase());
};

/**
 * Row must be
 *  - 4 items long
 *  - contain only valid colors
 *  - contains no duplicate colors
 */
export const validateRow = (row: unknown[]): row is Row => {
  if (row.length !== 4) return false;

  const validColors = row.filter((color) =>
    Object.values(Color).includes(color as Color),
  );

  if (validColors.length !== 4) return false;

  const validColorsNoDuplicates = new Set(validColors);

  return validColors.length === validColorsNoDuplicates.size;
};

/**
 * Parses a raw input string first into an array by splitting
 */
export const parseRow = (rawRow: string): ValidationResult => {
  const normalizedRow = normalizeRow(rawRow);
  const isValid = validateRow(normalizedRow);

  if (!isValid) {
    return {
      valid: false,
      rawRow,
    };
  }

  return {
    valid: true,
    row: normalizedRow,
    rawRow,
  };
};
