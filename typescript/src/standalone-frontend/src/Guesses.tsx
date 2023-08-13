import styled from 'styled-components';
import { Color, GameStatus, Row } from '../../common/types';
import { LockedGuessRow } from './LockedGuessRow';
import { OpenGuessRow } from './OpenGuessRow';

const GuessesContainer = styled.div`
  margin: 1rem 0;
`;

const StyledTable = styled.table`
  border-collapse: collapse;
  border-spacing: 0;
`;

type GuessesProps = {
  availableColors: readonly Color[];
  rowLength: number;
  guesses: readonly Row[];
  rowToGuess: Row;
  saveGuess: (guess: Row) => void;
  gameStatus: GameStatus;
};

export const Guesses = ({
  availableColors,
  rowLength,
  guesses,
  rowToGuess,
  saveGuess,
  gameStatus,
}: GuessesProps) => {
  return (
    <GuessesContainer>
      <StyledTable>
        <thead>
          <tr>
            <th>#</th>
            {Array.from({ length: rowLength }, (_, index) => index + 1).map(
              (num) => (
                <th key={num}>{num}</th>
              ),
            )}
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
            <OpenGuessRow
              key={rowLength}
              availableColors={availableColors}
              rowLength={rowLength}
              guessIndex={guesses.length}
              saveGuess={saveGuess}
            />
          )}
        </tbody>
      </StyledTable>
    </GuessesContainer>
  );
};
