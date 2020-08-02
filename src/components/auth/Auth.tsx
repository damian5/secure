import React, { useEffect, useContext } from 'react'
import { webAuthnSignin, webAuthnSignup } from 'helpers/webauth';
import { FingerPrintContext } from 'hooks/useFingerPrint';
import { useFirebaseAuth } from 'hooks/useFirebaseAuth';
import { useHistory } from 'react-router-dom';

const Auth = () => {
  const { useFingerPrint, error } = useContext(FingerPrintContext);
  const { isFirebaseReady, authenticated, signOut } = useFirebaseAuth();
  const history = useHistory();

  useEffect(() => {
    if(authenticated) {
      if(useFingerPrint === 'enable') {
        const usersString = localStorage.getItem('users');
        if(usersString) {
        webAuthnSignin()
          .then(() => history.push('/passwords'))
          .catch(error => {
            console.log(error);
          })
        } else {
          webAuthnSignup('random')
            .then(() => history.replace('/passwords'))
            .catch((error) => {console.log(error)})
        }
      } else {
        history.push('/passwords')
      }
    }
}, [history, authenticated, useFingerPrint, isFirebaseReady, signOut]);

  return (
    <div>
      {error ? 'error' : 'Fingerprint required'}
    </div>
  )
}

export default Auth;
