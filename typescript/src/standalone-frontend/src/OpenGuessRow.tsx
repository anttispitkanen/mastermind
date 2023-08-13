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
  rowLength: number;
  guessIndex: number;
  saveGuess: (guess: Row) => void;
};

const getEmptyGuess = (rowLength: number): Row =>
  Array.from({ length: rowLength }, () => Color.RED);

export const OpenGuessRow = ({
  availableColors,
  rowLength,
  guessIndex,
  saveGuess,
}: OpenGuessRowProps) => {
  // TODO: this should reset when the number of available colors changes
  const [guess, setGuess] = useState<Row>(getEmptyGuess(rowLength));

  const setColor = (index: number) => (color: Color) => {
    setGuess((prevGuess) => prevGuess.map((c, i) => (i === index ? color : c)));
  };

  const guessValid: boolean = validateRow(availableColors, rowLength)(guess);

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
