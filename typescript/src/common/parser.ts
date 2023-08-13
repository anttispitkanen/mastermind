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
 *  - the length configured in Settings
 *  - contain only valid colors
 *  - contains no duplicate colors
 */
export const validateRow =
  (availableColors: readonly Color[], rowLength: number) =>
  (row: unknown[]): row is Row => {
    if (row.length !== rowLength) return false;

    const validColors = row.filter((color) =>
      availableColors.includes(color as Color),
    );

    if (validColors.length !== rowLength) return false;

    const validColorsNoDuplicates = new Set(validColors);

    return validColors.length === validColorsNoDuplicates.size;
  };

/**
 * Parses a raw input string first into an array by splitting
 */
export const parseRow =
  (availableColors: Color[], rowLength: number) =>
  (rawRow: string): ValidationResult => {
    const normalizedRow = normalizeRow(rawRow);
    const isValid = validateRow(availableColors, rowLength)(normalizedRow);

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
