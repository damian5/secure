import React, { createContext, useState, useEffect } from "react";
import { useFirebaseAuth } from 'hooks/useFirebaseAuth'
import { webAuthnSignup } from "helpers/webauth";

interface FingerPrintContextProps {
  useFingerPrint: any;
  setFingerPrint: any;
  error: string;
}

export const FingerPrintContext = createContext({} as FingerPrintContextProps);


const FingerPrintContextProvider: React.FC = ({ children }) => {
  const { localStorage } = window;
  const { authenticated, currentUser } = useFirebaseAuth();
  const [ error, setError ] = useState();

  const [useFingerPrint, setUseFingerPrint] = useState(
    localStorage.getItem('fingerPrint') || 'disable'
  );
    

  useEffect(() => {
    localStorage.setItem('fingerPrint', useFingerPrint);
  }, [useFingerPrint, localStorage]);


  const setFingerPrint = () => {
    if(useFingerPrint === 'enable') {
      setUseFingerPrint('disable');
    } else {
      if(authenticated) {
        webAuthnSignup(currentUser().email).then(() => {
          setUseFingerPrint('enable')
        }).catch(err => setError(err))
      } else {
        setError('You are not authenticated')
      }
    }
  }

  return (
    <FingerPrintContext.Provider value={{ useFingerPrint, setFingerPrint, error }}>
      {children}
    </FingerPrintContext.Provider>
  );
};

export default FingerPrintContextProvider;