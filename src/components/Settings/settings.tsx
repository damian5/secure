import React, { useContext } from "react";
import { ThemeContext } from 'hooks/useTheme';
import { FingerPrintContext } from 'hooks/useFingerPrint';
import { useFirebaseAuth } from 'hooks/useFirebaseAuth';

const Settings = () => {
  const { themeMode, setNewTheme } = useContext(ThemeContext);
  const { useFingerPrint, setFingerPrint } = useContext(FingerPrintContext);
  const { signOut } = useFirebaseAuth()

  const handleSignOut = () => {
    signOut()
  }

  return(
    <>
      <h1>Settings</h1>
      <div>
        <p>theme: {themeMode}</p>
        <button onClick={() => setNewTheme()}>switch theme</button>
      </div>
      <div>
        <p>fingerPrint: {useFingerPrint}</p>
        <button onClick={() => setFingerPrint()}>switch Finger print</button>
      </div>
      <button onClick={() => handleSignOut()}>Sign out</button>
    </>

  )
};

export default Settings;