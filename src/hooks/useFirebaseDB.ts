import { db, auth, firestore } from 'helpers/firebaseConfig';
import { UserData, Site } from 'interfaces/dataAPI';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react'
interface useFirebaseAuthProps {
  writeUserData: (id: string, data: string) => any;
  addNewSite: (siteName: string, userName: string, password: string) => Promise<void>;
  getUserData: () => firebase.firestore.DocumentData;
  removeSite: (siteId: string) => Promise<void>;
  loading: boolean;
}

export const useFirebaseDB = (): useFirebaseAuthProps => {
  const [loading, setLoading] = useState(false)

  const writeUserData = (id: string, userName: string) => {
    db.collection("users").doc(id).set({
      userName: userName,
      sites: [],
      money: 0
    } as UserData).then(() => {
      console.log('user entry created');
    });
  }

  const addNewSite = async (siteName: string, userName: string, password: string) => {
    try {
      setLoading(true);
      const dbRef = db.collection("users").doc(auth.currentUser.uid);
      await dbRef.update({
        sites: firestore.FieldValue.arrayUnion({
          id: uuidv4(),
          siteName: siteName,
          userName: userName,
          password: password
        })
      });
    } catch (error) {
      return error;
    } finally {
      setLoading(false);
    }
  }
 // TO-DO: change item for site
  const removeSite = async (siteId: string) => {
    try {
      setLoading(true);
      const userData = await getUserData();
      const sites: Site[] = userData.sites;
      await db.collection('users').doc(auth.currentUser.uid).update({
        sites: sites.filter(site => site.id !== siteId)
      });
    } catch (error) {
      return error;
    } finally {
      setLoading(false);
    }
  }

  const getUserData = async () => {
    setLoading(true);
    try {
      const result = db.collection("users").doc(auth.currentUser.uid).get();
      return (await result).data() as UserData;
    } catch (error) {
      return error;
    } finally {
      setLoading(false);
    }
  
  }

  return { writeUserData, addNewSite, getUserData, removeSite, loading }
}
