import React, { FunctionComponent } from 'react';
import { Field as FinalFormField } from 'react-final-form';
import { StyledInput, StyledField } from './TextField-styles';
import ErrorField from 'components/shared/ErrorField';

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  type: string;
  name: string;
  placeholder?: string;
  showError?: boolean;
  extraFeatureAction?: () => void;
  showExtraButton?: boolean;
  extraFeaureName?: string;
  maxLength?: number;
  icon?: any;
  marginBottom: number;
  isAuth?: boolean;
}

const TextField: FunctionComponent<TextFieldProps> = ({
  label,
  placeholder,
  type,
  name,
  showError,
  extraFeatureAction,
  showExtraButton,
  extraFeaureName,
  icon,
  maxLength,
  marginBottom,
  isAuth,
}) => (
  <FinalFormField name={name}>
    {({ input, meta }) => (
      <StyledField marginBottom={marginBottom} >
        {label && <label>{label}</label>}
        <div className="input-wrapper">
          <StyledInput
            {...input}
            isAuth={isAuth}
            maxLength={maxLength}
            type={type}
            placeholder={placeholder}
          />
          {showExtraButton && (
            <button type="button" onClick={() => extraFeatureAction()}>
              {extraFeaureName}
            </button>
          )}
          {icon && icon}
        </div>
        {showError && (meta.error || meta.submitError) && meta.touched && (
          <ErrorField errorMessage={meta.error || meta.submitError} />
        )}
      </StyledField>
    )}
  </FinalFormField>
);

export default TextField;
