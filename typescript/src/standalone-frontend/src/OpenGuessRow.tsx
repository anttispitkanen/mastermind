import { useState } from 'react';
import { validateRow } from '../../common/parser';
import { Color, Row } from '../../common/types';
import { ColorSelector } from './ColorSelector';
import {
  StyledButton,
  StyledTableCell,
  StyledTableRow,
} from './StyledReusableComponents';

type OpenGuessRowProps = {
  availableColors: readonly Color[];
  guessIndex: number;
  saveGuess: (guess: Row) => void;
};

export const OpenGuessRow = ({
  availableColors,
  guessIndex,
  saveGuess,
}: OpenGuessRowProps) => {
  const [guess, setGuess] = useState<Row>([
    Color.RED,
    Color.RED,
    Color.RED,
    Color.RED,
  ]);

  const setColor = (index: number) => (color: Color) => {
    setGuess((prevGuess) => prevGuess.map((c, i) => (i === index ? color : c)));
  };

  const guessValid: boolean = validateRow(availableColors)(guess);

  return (
    <StyledTableRow $correct={false}>
      <StyledTableCell>{guessIndex + 1}</StyledTableCell>

      <>
        {guess.map((color, index) => (
          <StyledTableCell key={index}>
            <ColorSelector
              availableColors={availableColors}
              color={color}
              setColor={setColor(index)}
            />
          </StyledTableCell>
        ))}
      </>

      <StyledTableCell>
        <StyledButton disabled={!guessValid} onClick={() => saveGuess(guess)}>
          Guess
        </StyledButton>
      </StyledTableCell>
    </StyledTableRow>
  );
};
