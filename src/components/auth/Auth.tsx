import React, { useEffect, useContext } from 'react'
import { webAuthnSignin } from 'helpers/webauth';
import { FingerPrintContext } from 'hooks/useFingerPrint';
import { useFirebaseAuth } from 'hooks/useFirebaseAuth';
import { useHistory } from 'react-router-dom';

const Auth = () => {
  const { useFingerPrint } = useContext(FingerPrintContext);
  const { isFirebaseReady, authenticated, signOut } = useFirebaseAuth();
  const history = useHistory();

  useEffect(() => {
    if(authenticated) {
      if(useFingerPrint === 'enable') {
        webAuthnSignin()
          .then(() => history.push('/passwords'))
          .catch(error => {
            console.log(error);
          })
      } else {
        history.push('/passwords')
      }
    }
}, [history, authenticated, useFingerPrint, isFirebaseReady, signOut]);

  return (
    <div>
      Fingerprint required
    </div>
  )
}

export default Auth;
