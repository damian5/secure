import { db, auth, firestore } from 'helpers/firebaseConfig';
import { UserData, Site } from 'interfaces/dataAPI';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react'
import { encrypt, decrypt } from 'helpers/encryption';
interface useFirebaseAuthProps {
  writeUserData: (id: string, data: string) => any;
  addNewSite: (siteName: string, userName: string, password: string) => Promise<void>;
  getSites: () => firebase.firestore.DocumentData;
  removeSite: (siteId: string) => Promise<void>;
  editSite: (siteName: string, userName: string, password: string, siteId: string) => Promise<void>;
  loading: boolean;
}

export const useFirebaseDB = (): useFirebaseAuthProps => {
  const [loading, setLoading] = useState(false);

  const writeUserData = (id: string, userName: string) => {
    db.collection("users").doc(id).set({
      userName: userName,
      sites: [],
      money: 0
    } as UserData).then(() => {
      console.log('user entry created');
    });
  };

  const addNewSite = async (siteName: string, userName: string, password: string) => {
    try {
      setLoading(true);
      const dbRef = db.collection("users").doc(auth.currentUser.uid);
      await dbRef.update({
        sites: firestore.FieldValue.arrayUnion({
          id: uuidv4(),
          siteName: siteName,
          userName: userName,
          password: encrypt(password)
        })
      });
    } catch (error) {
      return error;
    } finally {
      setLoading(false);
    }
  };

  const removeSite = async (siteId: string) => {
    try {
      setLoading(true);
      const result = db.collection("users").doc(auth.currentUser.uid).get();
      const sites = (await result).data().sites as Site[];
      await db.collection('users').doc(auth.currentUser.uid).update({
        sites: sites.filter(site => site.id !== siteId)
      });
    } catch (error) {
      return error;
    } finally {
      setLoading(false);
    }
  };

  const getSites = async () => {
    try {
      setLoading(true);
      const result = db.collection("users").doc(auth.currentUser.uid).get();
      const sites = (await result).data().sites as Site[];
      const sitesWithDecryptedPass = sites.map(site => {
        return {
          ...site,
          password: decrypt(site.password.toString())
        };
      });
      return sitesWithDecryptedPass;
    } catch (error) {
      return error;
    } finally {
      setLoading(false);
    }
  }

  const editSite = async (
    siteName: string,
    userName: string,
    password: string,
    siteId: string
  ) => {
    try {
      setLoading(true);
      const result = db.collection("users").doc(auth.currentUser.uid).get();
      const sites = (await result).data().sites as Site[];
      // This is not the most optimal thing, but Firebase does not support updates
      // on single array elements.
      const updatedSites = sites.map(site => (
        site.id === siteId ? {
          ...site,
          password: encrypt(password),
          siteName: siteName,
          userName: userName
        } : site
      ));
      await db.collection('users').doc(auth.currentUser.uid).update({
        sites: updatedSites
      });
    } catch (error) {
      return error;
    } finally {
      setLoading(false);
    }
  };

  return {
    writeUserData,
    addNewSite,
    getSites,
    removeSite,
    loading,
    editSite
  };
}
