import styled from 'styled-components';

export const StyledTableRow = styled.tr<{ $correct: boolean }>`
  height: 2.4rem;
  background-color: ${(props) => (props.$correct ? '#d4edda' : 'inherit')};
`;

export const StyledTableCell = styled.td`
  text-align: center;
  min-width: 2.6rem;
`;

export const StyledSelect = styled.select`
  min-height: 1.4rem;
  font-size: 1rem;
`;

export const StyledOption = styled.option`
  min-height: 1.4rem;
  font-size: 1rem;
`;

export const StyledButton = styled.button`
  min-height: 1rem;
  font-size: 1rem;
`;
