import { useState } from 'react';
import { styled } from 'styled-components';
import { createRandomRow } from '../../common/createRandomRow';
import { gradeGuess } from '../../common/grading';
import { renderRow } from '../../common/renderer';
import { MAX_GUESSES, getAvailableColors } from '../../common/rules';
import { Color, Row } from '../../common/types';
import { assertUnreachable } from '../../common/utils';
import { Footer } from './Footer';
import { Guesses } from './Guesses';
import { Menu } from './Menu';
import { StyledButton, StyledMenuButton } from './StyledReusableComponents';
import { GameStatus } from './types';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  justify-content: space-between;
`;

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 0 0.4rem;
  box-sizing: border-box;
`;

const Header = styled.header`
  width: 100vw;
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
  background-color: #f6f6f7;
  box-shadow: 0 0 0.2rem 0.1rem #ccc;
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
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [availableColors, setAvailableColors] = useState<Color[]>(
    getAvailableColors(),
  );
  const [rowToGuess, setRowToGuess] = useState<Row>(
    createRandomRow(availableColors),
  );
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
    setRowToGuess(createRandomRow(availableColors));
    setGuesses([]);
    setGameStatus(GameStatus.IN_PROGRESS);
  };

  const saveSettings = (numberOfColors: number) => {
    setAvailableColors(getAvailableColors(numberOfColors));
    resetGame();
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
            <StyledButton onClick={() => setGameStatus(GameStatus.LOST)}>
              Give up
            </StyledButton>
          </GameStatusContainer>
        );

      case GameStatus.WON:
        return (
          <GameStatusContainer>
            <p>🥳 You won! 🥳</p>
            <StyledButton onClick={resetGame}>Play again</StyledButton>
          </GameStatusContainer>
        );

      case GameStatus.LOST:
        return (
          <GameStatusContainer>
            <p>😢 You lost! 😢</p>
            <p>The correct row was {renderRow(rowToGuess)}</p>
            <StyledButton onClick={resetGame}>Play again</StyledButton>
          </GameStatusContainer>
        );

      default:
        return assertUnreachable(gameStatus);
    }
  };

  return (
    <Wrapper>
      <GameContainer>
        <Header>
          <h1>🧐 Mastermind 🧐</h1>
          <StyledMenuButton onClick={() => setMenuOpen(true)}>
            ⚙️
          </StyledMenuButton>
        </Header>
        <Emoji>{renderEmoji()}</Emoji>
        <Guesses
          availableColors={availableColors}
          guesses={guesses}
          rowToGuess={rowToGuess}
          saveGuess={saveGuess}
          gameStatus={gameStatus}
        />
        {renderGameStatus()}
      </GameContainer>
      <Footer />
      <Menu
        menuOpen={menuOpen}
        closeMenu={() => setMenuOpen(false)}
        saveSettings={saveSettings}
      />
    </Wrapper>
  );
};
