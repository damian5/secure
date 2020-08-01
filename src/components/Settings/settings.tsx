import React, { useContext } from "react";
import { ThemeContext } from 'hooks/useTheme';
import { FingerPrintContext } from 'hooks/useFingerPrint';

import { useFirebaseAuth } from 'hooks/useFirebaseAuth';
import { withRouter, RouteComponentProps } from 'react-router-dom';

const Settings = (props: RouteComponentProps) => {
  const { themeMode, setNewTheme } = useContext(ThemeContext);
  const { useFingerPrint, setFingerPrint } = useContext(FingerPrintContext);
  const { signOut } = useFirebaseAuth()

  const handleSignOut = async () => {
    await signOut();
    props.history.push('/signin')
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

export default withRouter(Settings);