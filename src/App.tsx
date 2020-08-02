import React, { useEffect } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import StyledApp from 'style/styledApp';
import BottomBar from 'components/shared/BottomBar';
import Sites from "./components/Sites";
import Settings  from "./components/Settings";
import { SignUp, SignIn, Auth } from 'components/auth'
import { useFirebaseAuth } from 'hooks/useFirebaseAuth';
import ManageSite from 'components/Sites/ManageSite';
import Loader from 'components/shared/Loader';
import MainContainerLayout from 'components/layout/MainContainer';

const wrapWithNav = (component: JSX.Element) => (
  <StyledApp>
    <MainContainerLayout>
      {component}
    </MainContainerLayout>
    <BottomBar />
  </StyledApp>
);

const App = () => {
  const { isFirebaseReady, authenticated } = useFirebaseAuth();
  const history = useHistory();

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
      <Route exact path="/settings" render={() => wrapWithNav(<Settings />)} />
      <Route exact path="/auth" component={Auth} />
      <Route render={() => <div>Page not found</div>} />
    </Switch>
) : <Loader />
};

export default App;