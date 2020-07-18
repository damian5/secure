import React, { useEffect, useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import StyledApp from 'style/styledApp';
import BottomBar from 'components/shared/BottomBar';
import MainContanier from 'components/layout/MainContainer';
import Passwords from "./components/Passwords"
import Settings  from "./components/Settings";
// TO-DO: put both SignUp and SignIn into their index.ts
import {SignUp, SignIn} from 'components/auth'
import { useFirebase } from 'hooks/useFirebase';
import Loader from 'components/shared/Loader';

const wrapWithNav = (component: JSX.Element) => {
  return (
    <StyledApp>
      <MainContanier>
        {component}
      </MainContanier>
      <BottomBar />
    </StyledApp>
  )
}

const PrivateRoute = ({children, path}) => {
  const { currentUser } = useFirebase()
  if (!currentUser()) {
    return <Redirect to="/signin"/>
  } else {
    return <Route exact path={path} render={() => children}/>
  }
}

const Routes = () => {

  const [isFirebaseInitialized, setFirebaseInitialized] = useState<any>(false);
  const { isInitialized } = useFirebase();

  useEffect(() => {
    isInitialized()
    .then(value => setFirebaseInitialized(value))
  }, [])

  return isFirebaseInitialized !== false ? (
      <Switch>
        <Redirect exact push from="/" to="/passwords" />
        <Route exact path="/signup" render={() => <SignUp />} />
        <Route exact path="/signin" render={() => <SignIn />} />

        <PrivateRoute path="/passwords">{wrapWithNav(<Passwords />)}</PrivateRoute>
        <PrivateRoute path="/settings">{wrapWithNav(<Settings />)}</PrivateRoute>
        <Route render={() => <div>Page not found</div>} />
      </Switch>
  ) : <Loader />
};

export default Routes;
