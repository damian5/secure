import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import Routes from 'routes'
import { useFirebaseAuth } from 'hooks/useFirebaseAuth';

const App = () => {
  const { isFirebaseReady, authenticated } = useFirebaseAuth();
  const history = useHistory();

  useEffect(() => {
    let mounted: boolean = true;
    if(mounted) {
      if(isFirebaseReady)
      if(authenticated) {
        history.replace('/auth')
      } else {
        history.replace('/signin')
      }
    }

    return () => {mounted = false}
  }, [authenticated, history, isFirebaseReady]);

  return <Routes/>;
};

export default App;