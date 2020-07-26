import React, { useEffect, useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import StyledApp from 'style/styledApp';
import BottomBar from 'components/shared/BottomBar';
import MainContanier from 'components/layout/MainContainer';
import Sites from "./components/Sites"
import Settings  from "./components/Settings";
// TO-DO: put both SignUp and SignIn into their index.ts
import {SignUp, SignIn} from 'components/auth'
import { useFirebaseAuth } from 'hooks/useFirebaseAuth';
import ManageSite from 'components/Sites/ManageSite';
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
  const { currentUser } = useFirebaseAuth()
  if (!currentUser()) {
    return <Redirect to="/signin"/>
  } else {
    return <Route exact path={path} render={() => children}/>
  }
}

const Routes = () => {

  const [isFirebaseInitialized, setFirebaseInitialized] = useState<any>(false);
  const { isInitialized } = useFirebaseAuth();

  useEffect(() => {
    isInitialized()
    .then(value => setFirebaseInitialized(value))
  }, [isInitialized])

  return isFirebaseInitialized !== false ? (
      <Switch>
        <Redirect exact push from="/" to="/passwords" />
        <Route exact path="/signup" render={() => <SignUp />} />
        <Route exact path="/signin" render={() => <SignIn />} />

        <PrivateRoute path="/passwords">{wrapWithNav(<Sites />)}</PrivateRoute>
        <PrivateRoute path="/settings">{wrapWithNav(<Settings />)}</PrivateRoute>
        <PrivateRoute path="/manage-site">{wrapWithNav(<ManageSite />)}</PrivateRoute>

        <Route render={() => <div>Page not found</div>} />
      </Switch>
  ) : <Loader />
};

export default Routes;
