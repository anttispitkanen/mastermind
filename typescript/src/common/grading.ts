import { GuessResult, Row } from './types';

const arraysEqual = (a: unknown[], b: unknown[]): boolean => {
  if (a.length !== b.length) return false;

  return a.every((item, index) => item === b[index]);
};

export const gradeGuess = (guess: Row, solution: Row): GuessResult => {
  if (arraysEqual(guess, solution)) {
    return {
      perfectMatch: true,
      correctColorInCorrectPlace: 4,
      correctColorInWrongPlace: 0,
    };
  }

  // First check for correct color in correct place, and store potential matches
  const correctColorsInCorrectPlaceArr = guess.filter((color, index) => {
    return color === solution[index];
  });

  // Then check for correct color in wrong place, excluding the ones already found
  // as correct color in correct place
  const correctColorsInWrongPlaceArr = guess.filter((color) => {
    return (
      solution.includes(color) &&
      !correctColorsInCorrectPlaceArr.includes(color)
    );
  });

  return {
    perfectMatch: false,
    correctColorInCorrectPlace: correctColorsInCorrectPlaceArr.length,
    correctColorInWrongPlace: correctColorsInWrongPlaceArr.length,
  };
};
