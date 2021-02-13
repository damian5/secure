import React, { FunctionComponent } from 'react';
import { Field } from 'react-final-form';

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
}) => (
  <Field name={name}>
    {({ input, meta }) => (
      <div>
        {label && <label>{label}</label>}
        <div>
          <input
            {...input}
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
          <span>{meta.error || meta.submitError}</span>
        )}
      </div>
    )}
  </Field>
);

export default TextField;
