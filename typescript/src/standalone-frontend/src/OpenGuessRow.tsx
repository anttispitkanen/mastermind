import { useState } from 'react';
import { validateRow } from '../../common/parser';
import { Color, Row } from '../../common/types';
import { ColorSelector } from './ColorSelector';
import { StyledTableCell, StyledTableRow } from './StyledReusableComponents';

type OpenGuessRowProps = {
  guessIndex: number;
  saveGuess: (guess: Row) => void;
};

export const OpenGuessRow = ({ guessIndex, saveGuess }: OpenGuessRowProps) => {
  const [guess, setGuess] = useState<Row>([
    Color.RED,
    Color.RED,
    Color.RED,
    Color.RED,
  ]);

  const setColor = (index: number) => (color: Color) => {
    setGuess(
      (prevGuess) => prevGuess.map((c, i) => (i === index ? color : c)) as Row, // TODO: can this typecast be avoided?
    );
  };

  const guessValid = validateRow(guess);

  return (
    <StyledTableRow>
      <StyledTableCell>{guessIndex + 1}</StyledTableCell>

      <>
        {guess.map((color, index) => (
          <StyledTableCell key={index}>
            <ColorSelector color={color} setColor={setColor(index)} />
          </StyledTableCell>
        ))}
      </>

      <StyledTableCell>
        <button disabled={!guessValid} onClick={() => saveGuess(guess)}>
          Guess
        </button>
      </StyledTableCell>
    </StyledTableRow>
  );
};
