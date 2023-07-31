import styled from 'styled-components';

export const StyledTableRow = styled.tr<{ correct?: boolean }>`
  height: 2rem;
  background-color: ${(props) =>
    props.correct ? 'rgba(75,181,67, 0.5)' : 'inherit'};
`;

export const StyledTableCell = styled.td`
  text-align: center;
  min-width: 2.6rem;
`;

export const StyledSelect = styled.select`
  min-height: 1.4rem;
`;
