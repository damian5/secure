import React from 'react';
import { Form } from 'react-final-form'
import { WrapForm } from '../styles';
import TextField from 'components/shared/TextField';
import { useFirebaseAuth } from 'hooks/useFirebaseAuth'
import { withRouter, Link, RouteComponentProps } from 'react-router-dom'
import * as Yup from 'yup';
import { validation as validationTexts } from 'constant/en.json';
import { validateFormValues } from 'helpers/formValidation';

const SignIn = (props: RouteComponentProps) => {

  const { signIn, loading } = useFirebaseAuth();
  const { required, invalidEmail } = validationTexts;

  const handleSignIn = async ({ email, password }: Record<any, string>) => {
    await signIn(email, password).then(() => {
      if (!loading)
      props.history.push('/passwords')
    })
  }

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
        </WrapForm>
      ))}}
    />
  )
}

export default withRouter(SignIn);