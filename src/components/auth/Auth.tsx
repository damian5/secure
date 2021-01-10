import React, { useEffect, useContext, useState } from 'react'
import { webAuthnSignin, webAuthnSignup } from 'helpers/webauth';
import { FingerPrintContext } from 'hooks/useFingerPrint';
import { useFirebaseAuth } from 'hooks/useFirebaseAuth';
import { useHistory } from 'react-router-dom';
import { AuthContext } from 'hooks/authContext';

const Auth = () => {
  const { useFingerPrint, error } = useContext(FingerPrintContext);
  const { isFirebaseReady, authenticated } = useContext(AuthContext);
  const [ securityNumber, setSecurityNumber ] = useState('')
  const [ didFingerprintFail, setDidFingerprintFail ] = useState(false)
  const [ passwordError, setPasswordError ] = useState('')
  const [ showPad, setShowPad] = useState(false)

  
  const { signOut } = useFirebaseAuth();
  const history = useHistory();


  console.log('render');
  const fakeSecurityNumber = 2323

  useEffect(() => {

    if(securityNumber.length === 4) {
      if(fakeSecurityNumber === Number(securityNumber)) {
        history.push('/passwords')
      } else {
        setPasswordError('wrong password')
      }
    } else if (securityNumber.length > 4) {
      setPasswordError('')
      setSecurityNumber('')
    } else {
      setPasswordError('')
    }
  }, [securityNumber])

  useEffect(() => {
    if(authenticated) {
      if(useFingerPrint === 'enable') {
        if(didFingerprintFail) {
          return;
        }
        const usersString = localStorage.getItem('users');
        if(usersString) {
        webAuthnSignin()
          .then(() => history.push('/passwords'))
          .catch(error => {
            setDidFingerprintFail(true)
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

  const triggerChange = (e: any) => {
    setSecurityNumber(e.target.value)
  }
  
  return (
    <div>
      <p>Fingerprint required or <p onClick={() => setShowPad(true)}>insert number</p></p>
      {showPad && <input type="number" name="test" value={securityNumber} onChange={(e) => triggerChange(e)}/>}
      <p>{passwordError}</p>
    </div>
  )
}

export default Auth;
