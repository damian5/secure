import React from 'react';
import { Form, Field } from 'react-final-form'
import { useFirebase } from 'hooks/useFirebase';
import { withRouter, RouteComponentProps } from 'react-router-dom'

const SignUp = (props: RouteComponentProps) => {

  const { createUser } = useFirebase();

  const handleCreateUser = async (values: Record<string, string>) => {
    const {userName, email, password} = values
    await createUser(userName, email, password)
    props.history.push('/passwords')
  }

  return(
    <Form
      onSubmit={(values) => handleCreateUser(values)}
      // validate={validate}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <h2>Sign Up</h2>
          <div>
            <label>name</label>
            <Field name="userName" component="input" type="text" placeholder="First Name" />
          </div>
          <div>
            <label>Email</label>
            <Field name="email" component="input" type="email" placeholder="Email" />
          </div>
          <div>
            <label>Password</label>
            <Field name="password" component="input" type="password" placeholder="Password" />
          </div>
          <button type="submit">Submit</button>
        </form>
      )}
    />
  )
}

export default withRouter(SignUp);