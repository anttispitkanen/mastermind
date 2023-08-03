import { renderColor } from '../../common/renderer';
import { Color } from '../../common/types';
import { StyledOption, StyledSelect } from './StyledReusableComponents';

type ColorSelectorProps = {
  availableColors: readonly Color[];
  color: Color;
  setColor: (color: Color) => void;
};

export const ColorSelector = ({
  availableColors,
  color,
  setColor,
}: ColorSelectorProps) => {
  return (
    <StyledSelect
      name="color"
      value={color}
      onChange={(event) => setColor(event.target.value as Color)} // FIXME: Can this typecast be avoided?
    >
      {availableColors.map((color) => (
        <StyledOption key={color} value={color}>
          {renderColor(color)}
        </StyledOption>
      ))}
    </StyledSelect>
  );
};
