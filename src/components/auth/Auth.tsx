import React, { useEffect, useContext, useState, useCallback, FC } from 'react';
import { webAuthnSignin, webAuthnSignup } from 'helpers/webauth';
import { FingerPrintContext } from 'hooks/useFingerPrint';
import { useFirebaseAuth } from 'hooks/useFirebaseAuth';
import { useHistory } from 'react-router-dom';
import { AuthContext } from 'hooks/authContext';
import { PinCodeContext } from 'hooks/usePinCode';

const Auth: FC = () => {
  const { useFingerPrint } = useContext(FingerPrintContext);
  const { isFirebaseReady, authenticated } = useContext(AuthContext);
  const [securityNumber, setSecurityNumber] = useState('');
  const [didFingerprintFail, setDidFingerprintFail] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [showPad, setShowPad] = useState(false);
  const { pinCode } = useContext(PinCodeContext);

  const { signOut } = useFirebaseAuth();
  const history = useHistory();

  const isFingerPrintEnable = useFingerPrint === 'enable';

  useEffect(() => {
    if (securityNumber.length === 4) {
      if (securityNumber === pinCode) {
        history.push('/passwords');
      } else {
        setPasswordError('wrong password');
      }
    } else if (securityNumber.length > 4) {
      setPasswordError('');
      setSecurityNumber('');
    } else {
      setPasswordError('');
    }
  }, [securityNumber]);

  useEffect(() => {
    if (authenticated) {
      if (pinCode) {
        if (isFingerPrintEnable) {
          if (didFingerprintFail) {
            return;
          }
          const usersString = localStorage.getItem('users');
          if (usersString) {
            webAuthnSignin()
              .then(() => history.push('/passwords'))
              .catch((error) => {
                setDidFingerprintFail(true);
                console.log(error);
              });
          } else {
            webAuthnSignup('random')
              .then(() => history.replace('/passwords'))
              .catch((error) => {
                console.log(error);
              });
          }
        } else {
          return;
        }
      } else {
        history.push('/passwords');
      }
    }
  }, [history, authenticated, useFingerPrint, isFirebaseReady, signOut]);

  const triggerChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSecurityNumber(e.target.value);
  }, [setSecurityNumber]
  );

  const renderComponent = () => {
    if (isFingerPrintEnable) {
      return (
        <div>
          <div>
            Fingerprint required or{' '}
            <p onClick={() => setShowPad(true)}>insert number</p>
          </div>
          {showPad && (
            <input
              type="tel"
              name="test"
              value={securityNumber}
              onChange={(e) => triggerChange(e)}
            />
          )}
          <p>{passwordError}</p>
        </div>
      );
    } else if (pinCode) {
      return (
        <div>
          <p>Insert pin</p>
          <input
            type="tel"
            name="test"
            value={securityNumber}
            onChange={(e) => triggerChange(e)}
          />
          <p>{passwordError}</p>
        </div>
      );
    }
    return null;
  };

  return renderComponent();
};

export default Auth;
