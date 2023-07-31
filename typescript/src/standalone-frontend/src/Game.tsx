import { useState } from 'react';
import { createRandomRow } from '../../common/createRandomRow';
import { gradeGuess } from '../../common/grading';
import { renderRow } from '../../common/renderer';
import { MAX_GUESSES } from '../../common/rules';
import { Row } from '../../common/types';
import { assertUnreachable } from '../../common/utils';
import { Guesses } from './Guesses';
import { GameStatus } from './types';

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

  const renderGameStatus = () => {
    switch (gameStatus) {
      case GameStatus.IN_PROGRESS:
        return (
          <div>
            <div>{MAX_GUESSES - guesses.length} guesses left</div>
            <button onClick={() => setGameStatus(GameStatus.LOST)}>
              Give up
            </button>
          </div>
        );

      case GameStatus.WON:
        return <div>🥳 You won! 🥳</div>;

      case GameStatus.LOST:
        return (
          <div>
            <div>😢 You lost! 😢</div>
            <div>The correct row was {renderRow(rowToGuess)}</div>
            <button onClick={resetGame}>Play again</button>
          </div>
        );

      default:
        return assertUnreachable(gameStatus);
    }
  };

  return (
    <div>
      <h1>Mastermind</h1>
      <Guesses
        guesses={guesses}
        rowToGuess={rowToGuess}
        saveGuess={saveGuess}
        gameStatus={gameStatus}
      />
      {renderGameStatus()}
    </div>
  );
};
