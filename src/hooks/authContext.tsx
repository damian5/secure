import React, { createContext, useState, useEffect } from "react";
import { auth } from 'helpers/firebaseConfig';

interface AuthContextProps {
  isFirebaseReady: boolean;
  authenticated: boolean;
  currentUser: firebase.User | null;
}

export const AuthContext = createContext({} as AuthContextProps);

const AuthContextProvider: React.FC = ({ children }) => {
  const [ authenticated, setAuthenticated ] = useState<boolean>(false);
  const [ isFirebaseReady, setFirebaseReady ] = useState<boolean>(false);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      auth.onAuthStateChanged(((user) => {
      if (user) {
        setAuthenticated(true);
      } else {
        if (mounted) {
          setAuthenticated(false);
        }
      }
      setFirebaseReady(true);
    }))}
    return () => {
      mounted = false;
    }
  }, []);

  const currentUser = auth.currentUser;

  return (
    <AuthContext.Provider value={{ currentUser, isFirebaseReady, authenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;