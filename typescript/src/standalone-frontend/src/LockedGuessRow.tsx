import { gradeGuess } from '../../common/grading';
import { renderColor } from '../../common/renderer';
import { Row } from '../../common/types';
import { StyledTableCell, StyledTableRow } from './StyledReusableComponents';

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
    <StyledTableRow $correct={gradedGuess.perfectMatch}>
      <StyledTableCell>{guessIndex + 1}</StyledTableCell>
      <>
        {guess.map((color, index) => (
          <StyledTableCell key={index}>{renderColor(color)}</StyledTableCell>
        ))}
      </>
      <StyledTableCell>
        {gradedGuess.correctColorInCorrectPlace} -{' '}
        {gradedGuess.correctColorInWrongPlace}
      </StyledTableCell>
    </StyledTableRow>
  );
};
