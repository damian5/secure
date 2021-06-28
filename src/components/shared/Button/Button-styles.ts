import styled from 'styled-components';

interface ButtonProps {
  backgroundColor: string
  borderColor: string
  withBorder: boolean;
  textColor: string;
}

export const StyledButton = styled.button<ButtonProps>`
  border: 1px solid ${({ theme }) => theme.commonProps.button.borderColor};
  border-radius: 10px;
  background: ${({ theme, backgroundColor }) => backgroundColor ? backgroundColor : theme.commonProps.button.primaryBackgroundColor};
  min-width: 140px;
  font-weight: 700;
  font-size: 16px;
  padding: ${({ theme }) => theme.commonProps.spacer[7]}px 0;
  outline: none;
  color: ${({ theme, textColor }) => textColor ? textColor : theme.commonProps.button.color};
  cursor: pointer;
  transition: background-color 300ms ease-in-out;

  &:hover {
    transition: background-color 300ms ease-in-out;
    background-color: ${({theme}) => theme.commonProps.color.primary};
    color: ${({theme}) => theme.commonProps.button.activeColor};
  }

`;