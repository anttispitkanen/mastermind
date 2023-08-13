import { useState } from 'react';
import styled from 'styled-components';
import {
  DEFAULT_NUMBER_OF_COLORS,
  DEFAULT_ROW_LENGTH,
} from '../../common/rules';
import { Settings } from '../../common/types';
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
  saveSettings: (settings: Settings) => void;
};

export const Menu = ({ menuOpen, closeMenu, saveSettings }: MenuProps) => {
  const [numberOfColors, setNumberOfColors] = useState<number>(
    DEFAULT_NUMBER_OF_COLORS,
  );
  const NUMBER_OF_COLORS_OPTIONS = [4, 5, 6, 7, 8, 9, 10];

  const [rowLength, setRowLength] = useState<number>(DEFAULT_ROW_LENGTH);
  const ROW_LENGTH_OPTIONS = [3, 4, 5, 6];

  const onSaveButtonClick = () => {
    saveSettings({ numberOfColors, rowLength });
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
          {NUMBER_OF_COLORS_OPTIONS.map((number) => (
            <StyledOption key={number} value={number}>
              {number}
            </StyledOption>
          ))}
        </StyledSelect>

        <StyledSelectLabel htmlFor="row-length">Row length</StyledSelectLabel>
        <StyledSelect
          name="row-length"
          value={rowLength}
          onChange={(event) => setRowLength(parseInt(event.target.value, 10))}
        >
          {ROW_LENGTH_OPTIONS.map((number) => (
            <StyledOption key={number} value={number}>
              {number}
            </StyledOption>
          ))}
        </StyledSelect>

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
