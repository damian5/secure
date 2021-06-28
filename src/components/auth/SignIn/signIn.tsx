// Libraries
import React, { FC } from 'react';
import { Form } from 'react-final-form';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

// Helpers
import { validateFormValues } from 'helpers/formValidation';
import { validation as validationTexts, auth, button } from 'constant/en.json';
import { SignInValues } from 'interfaces/auth';
import { routes } from 'constant/routes';

// Components
import TextField from 'components/shared/TextField';
import Button from 'components/shared/Button';
import ErrorField from 'components/shared/ErrorField';
import AppIcon from 'assets/images/appIcon.svg';

// Styles
import { WrapForm } from '../Auth-styles';

interface SignInProps {
  loading: boolean;
  error: string | null;
  handleSignIn: (values: SignInValues) => void;
};

type HandleSubmitType = (event?: Partial<Pick<React.SyntheticEvent<Element, Event>, "preventDefault" | "stopPropagation">>) => Promise<any>

const SignIn: FC<SignInProps> = ({ loading, error, handleSignIn }) => {
  const { required, invalidEmail } = validationTexts;
  const { signIn, createAnAccount } = auth;

  const schema = Yup.object().shape({
    email: Yup.string().required(required).email(invalidEmail),
    password: Yup.string().required(required)
  });

  const renderForm = (handleSubmit: HandleSubmitType, submitting: boolean) => (
    <WrapForm onSubmit={handleSubmit}>
        <div className="app-icon-container">
          <img
            className="app-logo"
            alt="App Logo"
            src={AppIcon}
          />
          <h2 className="form-title" >{signIn}</h2>
        </div>
        <div className="form-container">
          <div className="input-container">
            <TextField
              isAuth
              marginBottom={40}
              showError
              placeholder="Email"
              type="email"
              name="email"
            />
            <TextField
              isAuth
              marginBottom={40}
              showError
              placeholder="Password"
              type="password"
              name="password"
            />
            {error && <ErrorField errorMessage={error}/>}
          </div>
          <Button
            description={button.logIn}
            type="submit"
            disabled={submitting || loading}
            isLoading={submitting || loading}
          />
          <p className="create-account-divider">-or-</p>
          <label>
            {<Link
              className="create-account-link"
              to={routes.signUp.path}
            >
              {createAnAccount}
            </Link>}
          </label>
        </div>
    </WrapForm>
  )

  return(
    <Form
      onSubmit={(values: SignInValues) => handleSignIn(values)}
      validate={validateFormValues(schema)}
      render={({ handleSubmit, submitting }) => renderForm(handleSubmit, submitting)
    }
    />
  );
};

export default SignIn;