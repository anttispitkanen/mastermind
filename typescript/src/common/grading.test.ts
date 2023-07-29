import { describe, expect, it } from 'vitest';
import { gradeGuess } from './grading';
import { Color, Row } from './types';

describe('gradeGuess', () => {
  describe('perfect match', () => {
    it('returns perfect match when all colors in correct place', () => {
      const guess: Row = [Color.BLACK, Color.GREEN, Color.BLUE, Color.RED];
      const solution: Row = [Color.BLACK, Color.GREEN, Color.BLUE, Color.RED];

      const result = gradeGuess(guess, solution);

      expect(result).toEqual({
        perfectMatch: true,
        correctColorInCorrectPlace: 4,
        correctColorInWrongPlace: 0,
      });
    });
  });

  describe('partial matches', () => {
    it.each([
      {
        /**
         * One correct color in correct place
         */
        correctRow: [Color.BLACK, Color.GREEN, Color.BLUE, Color.RED] as Row,
        guess: [Color.BLACK, Color.WHITE, Color.YELLOW, Color.BROWN] as Row,
        expectedResult: {
          perfectMatch: false,
          correctColorInCorrectPlace: 1,
          correctColorInWrongPlace: 0,
        },
      },
      {
        /**
         * One correct color in wrong place
         */
        correctRow: [Color.BLACK, Color.GREEN, Color.BLUE, Color.RED] as Row,
        guess: [Color.WHITE, Color.BLACK, Color.YELLOW, Color.BROWN] as Row,
        expectedResult: {
          perfectMatch: false,
          correctColorInCorrectPlace: 0,
          correctColorInWrongPlace: 1,
        },
      },
      {
        /**
         * One correct color in correct place, one correct color in wrong place
         */
        correctRow: [Color.BLACK, Color.GREEN, Color.BLUE, Color.RED] as Row,
        guess: [Color.BLACK, Color.WHITE, Color.RED, Color.YELLOW] as Row,
        expectedResult: {
          perfectMatch: false,
          correctColorInCorrectPlace: 1,
          correctColorInWrongPlace: 1,
        },
      },
    ])(
      'one correct color in correct place',
      ({ correctRow, guess, expectedResult }) => {
        const result = gradeGuess(guess, correctRow);
        expect(result).toEqual(expectedResult);
      },
    );
  });

  describe('no match', () => {
    it('returns no match when no colors match', () => {
      const guess: Row = [Color.BLACK, Color.GREEN, Color.BLUE, Color.RED];
      const solution: Row = [
        Color.YELLOW,
        Color.WHITE,
        Color.BROWN,
        Color.ORANGE,
      ];

      const result = gradeGuess(guess, solution);

      expect(result).toEqual({
        perfectMatch: false,
        correctColorInCorrectPlace: 0,
        correctColorInWrongPlace: 0,
      });
    });
  });
});
