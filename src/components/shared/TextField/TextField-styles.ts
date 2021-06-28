import styled from 'styled-components';
import { colorsPalette } from 'constant/colors';

export const StyledField = styled.div<{marginBottom: number}>`
  margin-bottom: ${({ marginBottom }) => marginBottom}px;
  display: flex;
  flex-direction: column;
  width: 100%;
  .input-wrapper {
    margin-bottom: 5px;
    width: 100%;
  }
`

export const StyledInput = styled.input<{isAuth: boolean | null}>`
  border: none;
  border-bottom: 1px solid ${colorsPalette.white};
  width: 100%;
  background: transparent;
  padding: ${({ theme }) => theme.commonProps.spacer[3]}px;
  outline: none;
  font-size: ${({ theme }) => theme.commonProps.fontSize.default}px;
  color: ${({ theme, isAuth }) => isAuth ? colorsPalette.white : theme.input.color.primary};
  border-radius: 0;

  ::placeholder {
    color: ${({ theme, isAuth }) => isAuth ? colorsPalette.white : theme.input.color.primary};
    font-size: ${({ theme }) => theme.commonProps.fontSize.default}px;
  }
`;