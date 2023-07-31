import { Row } from '../../common/types';
import { LockedGuessRow } from './LockedGuessRow';
import { OpenGuessRow } from './OpenGuessRow';
import { GameStatus } from './types';

type GuessesProps = {
  guesses: readonly Row[];
  rowToGuess: Row;
  saveGuess: (guess: Row) => void;
  gameStatus: GameStatus;
};

export const Guesses = ({
  guesses,
  rowToGuess,
  saveGuess,
  gameStatus,
}: GuessesProps) => {
  return (
    <div>
      <h2>Guesses</h2>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>1</th>
            <th>2</th>
            <th>3</th>
            <th>4</th>
            <th>Result</th>
          </tr>
        </thead>

        <tbody>
          {guesses.map((guess, index) => (
            <LockedGuessRow
              key={index}
              guess={guess}
              guessIndex={index}
              rowToGuess={rowToGuess}
            />
          ))}

          {gameStatus === GameStatus.IN_PROGRESS && (
            <OpenGuessRow guessIndex={guesses.length} saveGuess={saveGuess} />
          )}
        </tbody>
      </table>
    </div>
  );
};
