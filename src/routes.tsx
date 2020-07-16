import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import StyledApp from 'style/styledApp';
import BottomBar from 'components/shared/BottomBar';
import MainContanier from 'components/layout/MainContainer';
import Passwords from "./components/Passwords"
import Settings  from "./components/Settings";


const wrapWithNav = (component: JSX.Element) => {
  return (
    <MainContanier>
      {component}
    </MainContanier>
  )
}

const Routes = () => {
  return (
    <StyledApp>
      <Switch>
        <Redirect exact push from="/" to="/passwords" />
        <Route exact path="/passwords" render={() => wrapWithNav(<Passwords />)} />
        <Route exact path="/settings" render={() => wrapWithNav(<Settings />)} />
        <Route render={() => <div>Page not found</div>} />
      </Switch>
      <BottomBar />
    </StyledApp>
  );
};

export default Routes;
