import { auth, persistentUserData } from 'helpers/firebaseConfig';
import { useFirebaseDB } from './useFirebaseDB';
import {keyFromPassword} from 'helpers/encryption';
import { useState, useEffect } from 'react';

interface useFirebaseAuthProps {
  createUser: (userName: string, email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  currentUser: () => firebase.User;
  signIn: (email: string, password: string) => Promise<firebase.auth.UserCredential | void>;
  isInitialized: () => Promise<unknown>;
  loading: boolean;
  error: string | null;
  authenticated: any;
  isFirebaseReady: any;
}

export const useFirebaseAuth = (): useFirebaseAuthProps => {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [ authenticated, setAuthenticated ] = useState(false);
  const [ isFirebaseReady, setFirebaseReady ] = useState(false);
  const { writeUserData } = useFirebaseDB();

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

  const createUser = async (userName: string, email: string, password: string) => {
    try {
      setLoading(true);
      await auth.createUserWithEmailAndPassword(email.trim(), password.trim());
      await writeUserData(auth.currentUser.uid, userName);

      return auth.currentUser.updateProfile({
        displayName: userName
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      await auth.setPersistence(persistentUserData)
      try {
        keyFromPassword(password);
        return await auth.signInWithEmailAndPassword(email, password).then(
          (response) => {return response}
        )
      } catch (error) {
        return setError(error.message);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  const signOut = async () => {
   
      try {
        await auth.signOut().then(() => {
          window.localStorage.setItem('fingerPrint', 'disable')
          window.localStorage.clear();
          window.location.reload()
        })
      } catch (error) {
        setError(error.message);
      }
  }

  const currentUser = () => auth.currentUser;

  const isInitialized = () => new Promise(resolve => {
    return auth.onAuthStateChanged(resolve)
  })

  return {
    createUser,
    signOut,
    currentUser,
    signIn,
    isInitialized,
    loading,
    error,
    authenticated,
    isFirebaseReady
  }
}
