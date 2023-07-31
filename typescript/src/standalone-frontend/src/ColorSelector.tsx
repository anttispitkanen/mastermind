import { renderColor } from '../../common/renderer';
import { Color } from '../../common/types';

type ColorSelectorProps = {
  color: Color;
  setColor: (color: Color) => void;
};

export const ColorSelector = ({ color, setColor }: ColorSelectorProps) => {
  return (
    <select
      name="color"
      value={color}
      onChange={(event) => setColor(event.target.value as Color)} // FIXME: Can this typecast be avoided?
    >
      {Object.values(Color).map((color) => (
        <option key={color} value={color}>
          {renderColor(color)}
        </option>
      ))}
    </select>
  );
};
