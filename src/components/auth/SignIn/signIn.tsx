import React, { useCallback } from 'react';
import { Form } from 'react-final-form'
import { WrapForm } from '../styles';
import TextField from 'components/shared/TextField';
import { useFirebaseAuth } from 'hooks/useFirebaseAuth'
import { withRouter, Link } from 'react-router-dom'
import * as Yup from 'yup';
import { validation as validationTexts } from 'constant/en.json';
import { validateFormValues } from 'helpers/formValidation';

const SignIn = (props: any) => {
  // const history = useHistory()
  const { signIn, loading, error } = useFirebaseAuth();
  const { required, invalidEmail } = validationTexts;

  const handleSignIn = useCallback(async ({ email, password }: Record<any, string>) => {
    await signIn(email, password).then((response) => {
      return response && props.history.replace('/passwords')
    });
  }, [signIn, props.history]);

  const schema = Yup.object().shape({
    email: Yup.string().required(required).email(invalidEmail),
    password: Yup.string().required(required)
  })

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
      ))}}
    />
  )
}

export default withRouter(SignIn);