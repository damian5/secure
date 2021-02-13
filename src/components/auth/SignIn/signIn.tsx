import React, { useCallback } from 'react';
import { Form } from 'react-final-form';
import { WrapForm } from '../styles';
import TextField from 'components/shared/TextField';
import { useFirebaseAuth } from 'hooks/useFirebaseAuth';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { validation as validationTexts } from 'constant/en.json';
import { validateFormValues } from 'helpers/formValidation';

interface FormParams {
  email: string;
  password: string;
}

const SignIn = () => {
  const { signIn, loading, error } = useFirebaseAuth();
  const { required, invalidEmail } = validationTexts;

  const handleSignIn = useCallback(({ email, password }: FormParams) => {
    signIn(email, password);
  }, [signIn]);

  const schema = Yup.object().shape({
    email: Yup.string().required(required).email(invalidEmail),
    password: Yup.string().required(required)
  });

  return(
    <Form
      onSubmit={(values) => handleSignIn(values)}
      validate={validateFormValues(schema)}
      render={({ handleSubmit, submitting }) => {
        return ((
          <WrapForm onSubmit={handleSubmit}>
            <h2>Sign In</h2>
            <TextField
              showError
              type="email"
              name="email"
              label="Email"
            />
            <TextField
              showError
              type="password"
              name="password"
              label="Password"
            />
            <button disabled={submitting || loading} type="submit">Submit</button>
            <label>New here? {<Link to='/signup'>create an account!</Link>}</label>
            {error && <div>{error}</div>}
          </WrapForm>
        ));}}
    />
  );
};

export default SignIn;