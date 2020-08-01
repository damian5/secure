import React, { useEffect, useContext } from 'react'
import { webAuthnSignin } from 'helpers/webauth';
import { FingerPrintContext } from 'hooks/useFingerPrint';
import { useFirebaseAuth } from 'hooks/useFirebaseAuth';
import { withRouter } from 'react-router-dom';

const Auth = (props) => {
  const { useFingerPrint } = useContext(FingerPrintContext);
  const { isFirebaseReady, authenticated } = useFirebaseAuth();
  // const history = useHistory();

  useEffect(() => {
    let mounted = true;
    (async () => {
      await isFirebaseReady;
      if(mounted) {
        if(isFirebaseReady) {
          if(authenticated) {
            if(useFingerPrint === 'enable') {
              webAuthnSignin().then(() => props.history.push('/passwords'))
            } else {
              props.history.push('/passwords')
            }
          } else {
            console.log('not auth???')
          }
        }
      }
    })()
    return() => {mounted = false}
  }, [props.history, authenticated, useFingerPrint, isFirebaseReady])
  
  return (
    <div>
      Enter ur fingerprint
    </div>
  )
}

export default withRouter(Auth);
