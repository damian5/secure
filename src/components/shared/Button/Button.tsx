import React, { FunctionComponent } from 'react';
import { StyledButton } from './Button-styles';
import { CircularProgress } from '@material-ui/core';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onChange?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  type: "submit" | "reset" | "button";
  description: string;
  mainColor?: string;
  textColor?: string;
  borderColor?: string;
  withBorder?: boolean;
  disabled: boolean;
  isLoading: boolean;
}

const Button: FunctionComponent<ButtonProps> = ({
  mainColor,
  textColor,
  borderColor,
  onChange,
  description,
  disabled,
  type,
  isLoading,
  withBorder
}) => (
  <StyledButton
    disabled={disabled}
    type={type}
    onClick={onChange}
    withBorder={withBorder}
    backgroundColor={mainColor}
    textColor={textColor}
    borderColor={borderColor}
  >
    {isLoading ? <CircularProgress size={20} color='primary'/> : description}
  </StyledButton>
);

Button.defaultProps = {
  onChange: () => {},
  mainColor: undefined,
  textColor: undefined,
  borderColor: undefined,
  withBorder: false,
}

export default Button;
