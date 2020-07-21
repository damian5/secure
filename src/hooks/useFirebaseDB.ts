import { db, auth, firestore } from 'helpers/firebaseConfig';
import { UserData, Site } from 'interfaces/dataAPI';
import { v4 as uuidv4 } from 'uuid';
interface useFirebaseAuthProps {
  writeUserData: (id: string, data: string) => any;
  addNewItem: (siteName: string, userName: string, password: string) => void;
  getItems: () => firebase.firestore.DocumentData;
  removeItem: (siteId: string) => void;
}

export const useFirebaseDB = (): useFirebaseAuthProps => {

  const writeUserData = (id: string, userName: string) => {
    db.collection("users").doc(id).set({
      userName: userName,
      sites: [],
      money: 0
    } as UserData).then(() => {
      console.log('user entry created');
    });
  }

  const addNewItem = (siteName: string, userName: string, password: string) => {
    const dbRef = db.collection("users").doc(auth.currentUser.uid);

    dbRef.update({
      sites: firestore.FieldValue.arrayUnion({
        id: uuidv4(),
        siteName: siteName,
        userName: userName,
        password: password
      })
    });
  }
 // TO-DO: change item for site
  const removeItem = async (siteId: string) => {
    const userData = await getItems()
    const sites: Site[] = userData.sites
    db.collection('users').doc(auth.currentUser.uid).update({
      sites: sites.filter(site => site.id !== siteId)
    })
  }

  const getItems = async () => {
    const result = db.collection("users").doc(auth.currentUser.uid).get()
    return (await result).data() as UserData
  }

  return { writeUserData, addNewItem, getItems, removeItem }
}
