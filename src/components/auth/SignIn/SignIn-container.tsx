import React, { useCallback, FC } from 'react';

import { useFirebaseAuth } from 'hooks/useFirebaseAuth';
import SignIn from './SignIn';
import { SignInValues } from 'interfaces/auth';

const SignInContainer: FC = () => {
  const { signIn, loading, error } = useFirebaseAuth();

  const handleSignIn = useCallback(({ email, password }: SignInValues) => {
    signIn(email, password);
  }, [signIn]);

  return (
    <SignIn
      loading={loading}
      error={error}
      handleSignIn={handleSignIn}
    />
  )
};

export default SignInContainer;
