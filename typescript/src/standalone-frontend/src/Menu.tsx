import { useState } from 'react';
import styled from 'styled-components';
import { DEFAULT_NUMBER_OF_COLORS } from '../../common/rules';
import {
  StyledButton,
  StyledMenuButton,
  StyledOption,
  StyledSelect,
  StyledSelectLabel,
} from './StyledReusableComponents';

const MenuWrapper = styled.div<{ $open: boolean }>`
  z-index: 9999;
  position: absolute;
  left: ${({ $open }) => ($open ? '0' : '-1rem')};
  width: ${({ $open }) => ($open ? '90vw' : '0')};
  height: 100vh;
  overflow: hidden;
  background-color: white;
  transition: width 0.5s ease-in-out;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  box-shadow: 0 0 0.4rem 0.2rem #ccc;
`;

const CloseMenuButton = styled(StyledMenuButton)`
  position: absolute;
  top: 1rem;
  right: 2rem;
  font-size: 3rem;
`;

const MenuContent = styled.div`
  width: 100%;
  position: absolute;
  top: 5rem;
  box-sizing: border-box;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
`;

const SaveButton = styled(StyledButton)`
  margin-top: 2rem;
`;

type MenuProps = {
  menuOpen: boolean;
  closeMenu: () => void;
  saveSettings: (number: number) => void;
};

export const Menu = ({ menuOpen, closeMenu, saveSettings }: MenuProps) => {
  const [numberOfColors, setNumberOfColors] = useState<number>(
    DEFAULT_NUMBER_OF_COLORS,
  );

  const onSaveButtonClick = () => {
    saveSettings(numberOfColors);
    closeMenu();
  };

  return (
    <MenuWrapper $open={menuOpen}>
      <CloseMenuButton onClick={closeMenu}>&times;</CloseMenuButton>

      <MenuContent>
        <h3>🛠️ Settings</h3>

        <StyledSelectLabel htmlFor="number-of-colors">
          Number of colors
        </StyledSelectLabel>
        <StyledSelect
          name="number-of-colors"
          value={numberOfColors}
          onChange={(event) =>
            setNumberOfColors(parseInt(event.target.value, 10))
          }
        >
          <StyledOption value={4}>4</StyledOption>
          <StyledOption value={5}>5</StyledOption>
          <StyledOption value={6}>6</StyledOption>
          <StyledOption value={7}>7</StyledOption>
          <StyledOption value={8}>8</StyledOption>
          <StyledOption value={9}>9</StyledOption>
          <StyledOption value={10}>10</StyledOption>
        </StyledSelect>

        {/* <StyledSelectLabel htmlFor="number-of-slots">
          Number of slots in a row
        </StyledSelectLabel>
        <StyledSelect name="number-of-slots">
          <StyledOption value="1">TODO:</StyledOption>
        </StyledSelect> */}

        {/* <StyledSelectLabel htmlFor="number-of-guesses">
          Number of guesses
        </StyledSelectLabel>
        <StyledSelect name="number-of-guesses">
          <StyledOption value="1">TODO:</StyledOption>
        </StyledSelect> */}

        <SaveButton onClick={onSaveButtonClick}>Save</SaveButton>
      </MenuContent>
    </MenuWrapper>
  );
};
