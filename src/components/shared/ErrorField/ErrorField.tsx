import React, { FC } from 'react';
import { StyledErrorField } from './ErrorField-styles';

const ErrorField: FC<{errorMessage: string}> = ({errorMessage}) => (
  <StyledErrorField>{errorMessage}</StyledErrorField>
);

export default ErrorField;
