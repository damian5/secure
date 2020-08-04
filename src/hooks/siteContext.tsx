import React, { createContext, useState, useEffect, useContext } from "react";
import { db } from 'helpers/firebaseConfig';
import { Site } from "interfaces/dataAPI";
import { decrypt } from "helpers/encryption";
import { AuthContext } from "./authContext";

interface SiteContextProps {
  sites: Site[],
  siteError: string | null,
  loading: boolean
}

export const SiteContext = createContext({} as SiteContextProps);

const SiteContextProvider: React.FC = ({ children }) => {
  const [ sites, setSites ] = useState<Site[]>([]);
  const [ siteError, setError ] = useState<string | null>(null);
  const [ loading, setLoading ] = useState<boolean>(true);

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
      setLoading(true)
      if(currentUser) {
        const unsubscribe = db.collection("users").doc(currentUser.uid).onSnapshot(doc => {
          const sites = doc.data().sites as Site[];
          const sitesWithDecryptedPass = sites.map((site): Site => {
            return {
              ...site,
              password: decrypt(site.password.toString())
            };
          });
          setLoading(false)
          setSites(sitesWithDecryptedPass)
        })
        return () => { unsubscribe() }
      } else {
        return setError("You don't have permissions to access to this data")
      }
 
  }, [currentUser]);


  return (
    <SiteContext.Provider value={{ sites, siteError , loading}}>
      {children}
    </SiteContext.Provider>
  );
};

export default SiteContextProvider;