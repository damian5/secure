import React from 'react';
import { Form } from 'react-final-form'
import { WrapForm } from '../styles';
import TextField from 'components/shared/TextField';
import { useFirebase } from 'hooks/useFirebase'
import { withRouter, Link, RouteComponentProps } from 'react-router-dom'
import * as Yup from 'yup';
import { validation as validationTexts } from 'constant/en.json';
import { validateFormValues } from 'helpers/formValidation';

const SignIn = (props: RouteComponentProps) => {
  // TO-DO: put this sleep in another file and build a loadin/fetching state
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

  const { signIn, currentUser } = useFirebase();
  const { required, invalidEmail } = validationTexts;

  const handleSignIn = async ({ email, password }: Record<any, string>) => {
    await signIn(email, password)
    await sleep(3000)
    if (currentUser())
    props.history.push('/passwords')
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
            type="email"
            name="email"
            label="Email"
          />
          <TextField
            type="password"
            name="password"
            label="Password"
          />
          <button disabled={submitting} type="submit">Submit</button>
          <label>New here? {<Link to='/signup'>create an account!</Link>}</label>
        </WrapForm>
      ))}}
    />
  )
}

export default withRouter(SignIn);