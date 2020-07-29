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

const PrivateRoute = ({authenticated, children, path}) => {
  if (!authenticated) {
    return <Redirect to="/signin"/>
  } else {
    return <Route exact path={path} render={() => children}/>
  }
}

const Routes = () => {

  const { isFirebaseReady, authenticated } = useFirebaseAuth();

  return isFirebaseReady !== false ? (
      <Switch>
        <Redirect exact push from="/" to="/passwords" />
        <Route exact path="/signup" render={() => <SignUp />} />
        <Route exact path="/signin" render={() => <SignIn />} />
        
        <PrivateRoute
          authenticated={authenticated}
          path="/passwords"
        >
          {wrapWithNav(<Sites />)}
        </PrivateRoute>
        <PrivateRoute
          authenticated={authenticated}
          path="/settings"
        >
          {wrapWithNav(<Settings />)}
        </PrivateRoute>
        <PrivateRoute
          authenticated={authenticated}
          path="/manage-site"
        >
          {wrapWithNav(<ManageSite />)}
        </PrivateRoute>

        <Route render={() => <div>Page not found</div>} />
      </Switch>
  ) : <Loader />
};

export default Routes;
