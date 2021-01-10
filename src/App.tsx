import React, { useEffect, useContext } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import BottomBar from 'components/shared/BottomBar';
import Sites from "./components/Sites";
import Settings  from "./components/Settings";
import Favorites from 'components/Favorites'
import { SignUp, SignIn, Auth } from 'components/auth'
import ManageSite from 'components/ManageSite';
import Loader from 'components/shared/Loader';
import { AuthContext } from 'hooks/authContext';

const wrapWithNav = (component: JSX.Element) => (
  <>
    {component}
    <BottomBar />
  </>
);

const App = () => {
  const history = useHistory();
  const { isFirebaseReady, authenticated } = useContext(AuthContext)

  useEffect(() => {
    let mounted: boolean = true;
    if(mounted) {
      if(authenticated) {
        history.push('/auth');
      } else {
        history.push('/signin');
      }
    }
    return () => { mounted = false }
  }, [history, authenticated, isFirebaseReady]);

  return !!isFirebaseReady ? (
    <Switch>
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/signin" component={SignIn} />
      <Route exact path="/passwords" render={() => wrapWithNav(<Sites />)} />
      <Route exact path="/manage-site" render={() => wrapWithNav(<ManageSite />)} />
      <Route exact path="/favorites" render={() => wrapWithNav(<Favorites />)} />
      <Route exact path="/settings" render={() => wrapWithNav(<Settings />)} />
      <Route exact path="/auth" component={Auth} />
      <Route render={() => <div>Page not found</div>} />
    </Switch>
) : <Loader />
};

export default App;