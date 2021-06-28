import React from 'react';
import { Form } from 'react-final-form';
import { useFirebaseAuth } from 'hooks/useFirebaseAuth';
import { Link, withRouter } from 'react-router-dom'
import { WrapForm } from '../Auth-styles';
import TextField from 'components/shared/TextField';
import * as Yup from 'yup';
import { validation as validationTexts } from 'constant/en.json';
import { validateFormValues } from 'helpers/formValidation';

const SignUp = () => {

  const { createUser, loading, error } = useFirebaseAuth();
  const { required, invalidEmail, passwordMustMatch } = validationTexts;

  const handleCreateUser = ({userName, email, password}: Record<any, string>) => {
    createUser(userName, email, password)
  }

  const schema = Yup.object().shape({
    userName: Yup.string().required(required),
    email: Yup.string().required(required).email(invalidEmail),
    password: Yup.string().required(required),
    repeatPassword: Yup.string().oneOf([Yup.ref('password'), null], passwordMustMatch).required()
  })

  return(
    <Form
      onSubmit={(values) => handleCreateUser(values)}
      validate={validateFormValues(schema)}
      render={({ handleSubmit, submitting }) => (
        <WrapForm onSubmit={handleSubmit}>
          <h2>Sign Up</h2>
          <TextField
            marginBottom={30}
            showError
            type="text"
            name="userName"
            label="Name"
          />
          <TextField
            marginBottom={30}
            showError
            type="email"
            name="email"
            label="Email"
          />
          <TextField
            marginBottom={30}
            showError
            type="password"
            name="password"
            label="password"
          />
          <TextField
            marginBottom={30}
            showError
            type="password"
            name="repeatPassword"
            label="Repeat password"
          />
          <button disabled={submitting || loading} type="submit">Submit</button>
          <label>Already a member? {<Link to='/signin'>sign in!</Link>}</label>
          {error && <div>{error}</div>}
        </WrapForm>
      )}
    />
  )
}

export default withRouter(SignUp);