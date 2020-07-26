import React from 'react';
import { Field } from 'react-final-form';

interface TextFieldProps {
  label?: string;
  type: string;
  name: string;
  placeholder?: string;
  showError?: boolean;
  copyFeature?: any;
  showCopy?: any;
  icon?: any;
}

const TextField = ({
  label,
  placeholder,
  type,
  name,
  showError,
  copyFeature,
  showCopy,
  icon
}: TextFieldProps) => (
  <Field name={name}>
    {({ input, meta }) => (
      <div>
        {console.log(showCopy)
        }
        {label && <label>{label}</label>}
        <div>
          <input {...input} type={type} placeholder={placeholder} />
          {showCopy && <button type="button" onClick={() => copyFeature()}>copy</button>}
          {icon && icon}
        </div>
        {showError && (meta.error || meta.submitError) &&
          meta.touched && <span>{meta.error || meta.submitError}</span>}
      </div>
    )}
  </Field>
)

export default TextField;