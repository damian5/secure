import React from 'react';
import { Form, Field } from 'react-final-form'
import { useFirebase } from 'hooks/useFirebase'
import { withRouter, Link, RouteComponentProps } from 'react-router-dom'

const SignIn = (props: RouteComponentProps) => {

  const { signIn } = useFirebase();

  const handleSignIn = async (values) => {
    const { email, password } = values
    await signIn(email, password)
    props.history.push('/passwords')
  }

  return(
    <Form
      onSubmit={(values) => handleSignIn(values)}
      // validate={validate}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <h2>Sign In</h2>
          <div>
            <label>Email</label>
            <Field name="email" component="input" type="email" placeholder="Email" />
          </div>
          <div>
            <label>Password</label>
            <Field name="password" component="input" type="password" placeholder="Password" />
          </div>
          <button type="submit">Submit</button>
          <label>New here? {<Link to='/signup'>create an account!</Link>}</label>
        </form>
      )}
    />
  )
}

export default withRouter(SignIn);