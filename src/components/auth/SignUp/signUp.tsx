import React from 'react';
import { Form } from 'react-final-form'
import { useFirebase } from 'hooks/useFirebase';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom'
import { WrapForm } from '../styles';
import TextField from 'components/shared/TextField';
import * as Yup from 'yup';
import { validation as validationTexts } from 'constant/en.json';
import { validateFormValues } from 'helpers/formValidation';

const SignUp = (props: RouteComponentProps) => {

  const { createUser } = useFirebase();
  const { required, invalidEmail, passwordMustMatch } = validationTexts;

  const handleCreateUser = async (values: Record<string, string>) => {
    const { userName, email, password } = values
    await createUser(userName, email, password)
    props.history.push('/passwords')
  }

  const schema = Yup.object().shape({
    name: Yup.string().required(required),
    email: Yup.string().required(required).email(invalidEmail),
    password: Yup.string().required(required),
    repeatPassword: Yup.string().oneOf([Yup.ref('password'), null], passwordMustMatch)
  })

  return(
    <Form
      onSubmit={(values) => handleCreateUser(values)}
      validate={validateFormValues(schema)}
      render={({ handleSubmit }) => (
        <WrapForm onSubmit={handleSubmit}>
          <h2>Sign Up</h2>
          <TextField
            type="text"
            name="name"
            label="Name"
          />
          <TextField
            type="email"
            name="email"
            label="Email"
          />
          <TextField
            type="password"
            name="Password"
            label="password"
          />
          <TextField
            type="password"
            name="repeatPassword"
            label="Repeat password"
          />
          <button type="submit">Submit</button>
          <label>Already a member? {<Link to='/signin'>sign in!</Link>}</label>

        </WrapForm>
      )}
    />
  )
}

export default withRouter(SignUp);