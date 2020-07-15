import React, { useContext } from "react";
import { ThemeContext } from 'hooks/useTheme';

const Settings: React.FC = () => {
  const { themeMode, setNewTheme } = useContext(ThemeContext);
  return(
    <>
      <h1>Settings</h1>
      <p>theme: {themeMode}</p>
      <button onClick={() => setNewTheme()}>switch theme</button>
    </>

  )
};

export default Settings;