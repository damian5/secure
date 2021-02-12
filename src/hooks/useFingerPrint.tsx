import React, { createContext, useState, useEffect, useContext } from 'react';
import { webAuthnSignup } from 'helpers/webauth';
import { AuthContext } from './authContext';
import { PinCodeContext } from 'hooks/usePinCode';

interface FingerPrintContextProps {
  useFingerPrint: string;
  setFingerPrint: () => void;
  error: string;
}

export const FingerPrintContext = createContext({} as FingerPrintContextProps);

const FingerPrintContextProvider: React.FC = ({ children }) => {
  const { localStorage } = window;
  const { pinCode } = useContext(PinCodeContext);
  const { currentUser, authenticated } = useContext(AuthContext);
  const [error, setError] = useState<string>('');

  const [useFingerPrint, setUseFingerPrint] = useState(
    localStorage.getItem('fingerPrint') || 'disable'
  );

  useEffect(() => {
    localStorage.setItem('fingerPrint', useFingerPrint);
  }, [useFingerPrint, localStorage]);

  const setFingerPrint = () => {
    if (!pinCode) {
      setError('you must set up fingerprint');
    } else {
      if (useFingerPrint === 'enable') {
        setUseFingerPrint('disable');
      } else {
        if (authenticated) {
          webAuthnSignup(currentUser.email)
            .then(() => {
              setUseFingerPrint('enable');
            })
            .catch((err) => setError(err));
        } else {
          setError('You are not authenticated');
        }
      }
    }
  };

  return (
    <FingerPrintContext.Provider
      value={{ useFingerPrint, setFingerPrint, error }}
    >
      {children}
    </FingerPrintContext.Provider>
  );
};

export default FingerPrintContextProvider;
