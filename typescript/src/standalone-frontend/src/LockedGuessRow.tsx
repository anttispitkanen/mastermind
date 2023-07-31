import { gradeGuess } from '../../common/grading';
import { renderColor } from '../../common/renderer';
import { Row } from '../../common/types';

type LockedGuessRowProps = {
  guess: Row;
  guessIndex: number;
  rowToGuess: Row;
};

export const LockedGuessRow = ({
  guess,
  guessIndex,
  rowToGuess,
}: LockedGuessRowProps) => {
  const gradedGuess = gradeGuess(guess, rowToGuess);

  return (
    <tr>
      <td>{guessIndex + 1}</td>
      <>
        {guess.map((color, index) => (
          <td key={index}>{renderColor(color)}</td>
        ))}
      </>
      <td>
        {gradedGuess.correctColorInCorrectPlace} -{' '}
        {gradedGuess.correctColorInWrongPlace}
      </td>
    </tr>
  );
};
