import { useState } from 'react';
import { styled } from 'styled-components';
import { createRandomRow } from '../../common/createRandomRow';
import { gradeGuess } from '../../common/grading';
import { renderRow } from '../../common/renderer';
import { MAX_GUESSES } from '../../common/rules';
import { Row } from '../../common/types';
import { assertUnreachable } from '../../common/utils';
import { Guesses } from './Guesses';
import { GameStatus } from './types';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Emoji = styled.span`
  font-size: 4rem;
`;

const GameStatusContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;
`;

export const Game = () => {
  const [rowToGuess, setRowToGuess] = useState<Row>(createRandomRow());
  const [guesses, setGuesses] = useState<Row[]>([]);
  const [gameStatus, setGameStatus] = useState<GameStatus>(
    GameStatus.IN_PROGRESS,
  );

  const saveGuess = (guess: Row) => {
    setGuesses((prevGuesses) => [...prevGuesses, guess]);

    const gradedGuess = gradeGuess(guess, rowToGuess);

    // Was the last guess correct?
    if (gradedGuess.perfectMatch) {
      setGameStatus(GameStatus.WON);
    }

    // Are there any guesses left?
    if (guesses.length + 1 >= MAX_GUESSES) {
      setGameStatus(GameStatus.LOST);
    }
  };

  const resetGame = () => {
    setRowToGuess(createRandomRow());
    setGuesses([]);
    setGameStatus(GameStatus.IN_PROGRESS);
  };

  const renderEmoji = () => {
    switch (gameStatus) {
      case GameStatus.IN_PROGRESS:
        if (guesses.length < 1) {
          return '🧐';
        }
        if (guesses.length < 3) {
          return '😊';
        }
        if (guesses.length < 5) {
          return '🙂';
        }
        if (guesses.length < 6) {
          return '🥲';
        }
        if (guesses.length < 7) {
          return '😐';
        }
        if (guesses.length < 8) {
          return '😬';
        }
        if (guesses.length < 9) {
          return '😰';
        }
        return '🫣';

      case GameStatus.WON:
        return '🥳';

      case GameStatus.LOST:
        return '😭';

      default:
        return assertUnreachable(gameStatus);
    }
  };

  const renderGameStatus = () => {
    switch (gameStatus) {
      case GameStatus.IN_PROGRESS:
        return (
          <GameStatusContainer>
            <p>{MAX_GUESSES - guesses.length} guesses left</p>
            <button onClick={() => setGameStatus(GameStatus.LOST)}>
              Give up
            </button>
          </GameStatusContainer>
        );

      case GameStatus.WON:
        return (
          <GameStatusContainer>
            <p>🥳 You won! 🥳</p>
            <button onClick={resetGame}>Play again</button>
          </GameStatusContainer>
        );

      case GameStatus.LOST:
        return (
          <GameStatusContainer>
            <p>😢 You lost! 😢</p>
            <p>The correct row was {renderRow(rowToGuess)}</p>
            <button onClick={resetGame}>Play again</button>
          </GameStatusContainer>
        );

      default:
        return assertUnreachable(gameStatus);
    }
  };

  return (
    <AppContainer>
      <h1>🧐 Mastermind 🧐</h1>
      <Emoji>{renderEmoji()}</Emoji>
      <Guesses
        guesses={guesses}
        rowToGuess={rowToGuess}
        saveGuess={saveGuess}
        gameStatus={gameStatus}
      />
      {renderGameStatus()}
    </AppContainer>
  );
};
