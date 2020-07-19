import React, { useContext } from "react";
import { ThemeContext } from 'hooks/useTheme';
import { useFirebase } from 'hooks/useFirebase';
import { withRouter, RouteComponentProps } from 'react-router-dom';

const Settings = (props: RouteComponentProps) => {
  const { themeMode, setNewTheme } = useContext(ThemeContext);
  const { signOut } = useFirebase()

  const handleSignOut = async () => {
    await signOut();
    props.history.push('/signin')
  }

  return(
    <>
      <h1>Settings</h1>
      <p>theme: {themeMode}</p>
      <button onClick={() => setNewTheme()}>switch theme</button>
      <button onClick={() => handleSignOut()}>Sign out</button>
    </>

  )
};

export default withRouter(Settings);