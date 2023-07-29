import { createRandomRow } from '../common/createRandomRow';
import { gradeGuess } from '../common/grading';
import { parseRow } from '../common/parser';
import { renderRow } from '../common/renderer';
import { GuessResult, Row } from '../common/types';
import { readInput, rl } from './io.cli';

const MAX_GUESSES = 10;

/**
 * Single round of the game:
 *  - Read the guess from the user
 *  - Parse the guess
 *  - Grade the guess
 *  - Print the result
 *  - If the guess was perfect match, end the game
 */
const singleRound = async (
  solutionRow: Row,
  guessNumber: number,
): Promise<{
  guessResult: GuessResult;
  guessedRow: Row;
}> => {
  while (true) {
    const guess = await readInput(`Guess ${guessNumber}/${MAX_GUESSES}?\n`);

    const parsedGuess = parseRow(guess);
    if (!parsedGuess.valid) {
      console.error('Invalid guess, try again! :DD');
      return singleRound(solutionRow, guessNumber);
    }

    const guessedRow = parsedGuess.row;
    const gradedGuess = gradeGuess(guessedRow, solutionRow);

    console.log(
      `${renderRow(guessedRow)} - ${gradedGuess.correctColorInCorrectPlace} - ${
        gradedGuess.correctColorInWrongPlace
      }\n`,
    );

    return {
      guessResult: gradedGuess,
      guessedRow,
    };
  }
};

const main = async () => {
  const solutionRow = createRandomRow();

  const guesses: Row[] = [];

  while (guesses.length <= MAX_GUESSES) {
    const guessNumber = guesses.length + 1;
    const results = await singleRound(solutionRow, guessNumber);

    const { guessResult, guessedRow } = results;

    guesses.push(guessedRow);

    if (guessResult.perfectMatch) {
      console.log(`Correct! You won in ${guesses.length} rounds!`);
      break;
    }

    if (guesses.length === MAX_GUESSES) {
      console.log('Game over! Solution was:');
      console.log(renderRow(solutionRow));
      break;
    }
  }

  rl.close();
};

main();
