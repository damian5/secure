import { db, auth, firestore } from 'helpers/firebaseConfig';
import { UserData, Site } from 'interfaces/dataAPI';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react'
import { encrypt, decrypt } from 'helpers/encryption';
interface useFirebaseAuthProps {
  writeUserData: (id: string, data: string) => any;
  addNewSite: (siteName: string, userName: string, password: string, siteUrl: string) => Promise<void>;
  removeSite: (siteId: string) => Promise<void>;
  editSite: (siteId: string, isFavorite: boolean, siteName?: string, userName?: string, password?: string, siteUrl?: string) => Promise<void>;
  getSitesById: (siteId: string) => Promise<void | Site>;
  loading: boolean;
  error: string | null;
}

export const useFirebaseDB = (): useFirebaseAuthProps => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null)

  const writeUserData = (id: string, userName: string) => {
    db.collection("users").doc(id).set({
      userName: userName,
      sites: [],
      money: 0
    } as UserData).then(() => {
      console.log('user entry created');
    });
  };

  const addNewSite = async (siteName: string, userName: string, password: string, siteUrl: string) => {
    try {
      setLoading(true);
      const dbRef = db.collection("users").doc(auth.currentUser.uid);
      await dbRef.update({
        sites: firestore.FieldValue.arrayUnion({
          id: uuidv4(),
          siteName: siteName,
          userName: userName,
          password: encrypt(password),
          url: siteUrl ? siteUrl : '',
          favorite: false,
          createdAt: new Date().toLocaleDateString(),
          modifiedAt: new Date().toLocaleDateString()
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

  const getSitesById = async (siteId: string) => {
    try {
      setLoading(true);
      const result = await db.collection("users").doc(auth.currentUser.uid).get();
      const sites = result.data().sites as Site[];
      const sitesWithDecryptedPass = sites.map((site): Site => {
        return {
          ...site,
          password: decrypt(site.password.toString())
        };
      });
      const site = sitesWithDecryptedPass.find(site => site.id === siteId)
      return site ? site : setError('Seems like the site does not exist or might have been deleted');
    } catch (error) {
      return setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  const editSite = async (
    siteId: string,
    isFavorite: boolean,
    siteName: string,
    userName: string,
    password: string,
    siteUrl: string,
  ) => {
    try {
      setLoading(true);
      const result = db.collection("users").doc(auth.currentUser.uid).get();
      const sites = (await result).data().sites as Site[];
      // This is not the most optimal thing, but Firebase does not support updates
      // on single array elements.
      const updatedSites = sites.map(site => {
        if(site.id === siteId ) {
          if(isFavorite) {
            return {
              ...site,
              favorite: !site.favorite
            }
          } else {
            return {
              ...site,
              password: encrypt(password),
              siteName: siteName,
              userName: userName,
              url: siteUrl,
              modifiedAt: new Date().toLocaleDateString()
            }
          }
        } else {
          return site
        }
    });
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
    removeSite,
    loading,
    getSitesById,
    editSite,
    error,
  };
}
