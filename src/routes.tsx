import React, { useEffect, useState, useContext } from 'react';
import { Switch, Route } from 'react-router-dom';
import StyledApp from 'style/styledApp';
import BottomBar from 'components/shared/BottomBar';
import MainContanier from 'components/layout/MainContainer';
import Sites from "./components/Sites"
import Settings  from "./components/Settings";
import { SignUp, SignIn, Auth } from 'components/auth'
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

const Routes = () => {
  const { isFirebaseReady } = useFirebaseAuth();

  return isFirebaseReady !== false ? (
      <Switch>
        <Route exact path="/signup" render={() => <SignUp />} />
        <Route exact path="/signin" render={() => <SignIn />} />
        <Route exact path="/passwords" render={() => wrapWithNav(<Sites />)} />
        <Route exact path="/manage-site" render={() => wrapWithNav(<ManageSite />)} />
        <Route exact path="/settings" render={() => wrapWithNav(<Settings />)} />
        <Route exact path="/auth" render={() => <Auth />} />
        <Route render={() => <div>Page not found</div>} />
      </Switch>
  ) : <Loader />
};

export default Routes;
