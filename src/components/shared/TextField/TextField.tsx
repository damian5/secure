import React from 'react';
import { Field } from 'react-final-form';

interface TextFieldProps {
  label?: string;
  type: string;
  name: string;
  placeholder?: string;
  showError?: boolean;
  extraFeatureAction?: () => void;
  showExtraButton?: boolean;
  extraFeaureName?: string;
  icon?: any;
}

const TextField = ({
  label,
  placeholder,
  type,
  name,
  showError,
  extraFeatureAction,
  showExtraButton,
  extraFeaureName,
  icon
}: TextFieldProps) => (
  <Field name={name}>
    {({ input, meta }) => (
      <div>
        {label && <label>{label}</label>}
        <div>
          <input {...input} type={type} placeholder={placeholder} />
          {showExtraButton && <button type="button" onClick={() => extraFeatureAction()}>{extraFeaureName}</button>}
          {icon && icon}
        </div>
        {showError && (meta.error || meta.submitError) &&
          meta.touched && <span>{meta.error || meta.submitError}</span>}
      </div>
    )}
  </Field>
)

export default TextField;