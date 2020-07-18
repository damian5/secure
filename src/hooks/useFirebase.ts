import React from 'react';
import { auth, persistentUserData } from 'helpers/firebaseConfig';

interface UseFirebaseProps {
  createUser: (userName: string, email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  currentUser: () => firebase.User;
  signIn: (email: string, password: string) => Promise<firebase.auth.UserCredential | void>
  isInitialized: () => Promise<unknown>
}

export const useFirebase = (): UseFirebaseProps => {

  const createUser = async (userName: string, email: string, password: string) => {
    try {
      await auth.createUserWithEmailAndPassword(email, password)
      return auth.currentUser.updateProfile({
        displayName: userName
      })
    } catch (error) {
      return alert(error.message)
    }
  }

  const signIn = async (email: string, password: string) => {
    auth.setPersistence(persistentUserData)
      .then(async () => {
        try {
          return await auth.signInWithEmailAndPassword(email, password)
        } catch (error) {
          return alert(error.message)
        }
      })
      .catch(error => {
        return alert(error.message)
      })
  }

  const signOut = () => auth.signOut();

  const currentUser = () => auth.currentUser;

  const isInitialized = () => new Promise(resolve => {
    return auth.onAuthStateChanged(resolve)
  })

  return { createUser, signOut, currentUser, signIn, isInitialized }
}