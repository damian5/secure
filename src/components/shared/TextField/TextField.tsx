import React from 'react';
import { Field } from 'react-final-form';

interface TextFieldProps {
  label?: string;
  type: string;
  name: string;
  placeholder?: string;
}

const TextField = ({
  label,
  placeholder,
  type,
  name
}: TextFieldProps) => (
  <Field name={name}>
    {({ input, meta }) => (
      <div>
        {label && <label>{label}</label>}
        <input {...input} type={type} placeholder={placeholder} />
        {(meta.error || meta.submitError) &&
          meta.touched && <span>{meta.error || meta.submitError}</span>}
      </div>
    )}
  </Field>
)

export default TextField;