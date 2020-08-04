import { auth, persistentUserData } from 'helpers/firebaseConfig';
import { useFirebaseDB } from './useFirebaseDB';
import {keyFromPassword} from 'helpers/encryption';
import { useState } from 'react';

interface useFirebaseAuthProps {
  createUser: (userName: string, email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<firebase.auth.UserCredential | void>;
  loading: boolean;
  error: string | null;
}

export const useFirebaseAuth = (): useFirebaseAuthProps => {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const { writeUserData } = useFirebaseDB();

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
        window.location.reload()
      })
    } catch (error) {
      setError(error.message);
    }
  }

  return {
    createUser,
    signOut,
    signIn,
    loading,
    error,
  }
}
