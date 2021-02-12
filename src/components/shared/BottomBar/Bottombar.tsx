import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PasswordIcon from '@material-ui/icons/VpnKey';
// import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import SettingsIcon from '@material-ui/icons/Settings';

const BottomBar = () => {
  const [value, setValue] = useState<string>('/passwords');
  return (
    <>
      <div className="blur-div" />
      <BottomNavigation value={value} showLabels onChange={(event, newValue) => {
        setValue(newValue);
      }}>
        <BottomNavigationAction
          component={Link}
          to="/passwords"
          label="passwords"
          value="passwords"
          icon={<PasswordIcon />}
        />
        <BottomNavigationAction
          to="/favorites"
          component={Link}
          label="favorites"
          value="favorites"
          icon={<FavoriteIcon />}
        />
        {/* <BottomNavigationAction
        component={Link}
        to="/myMoney"
        label="myMoney"
        value="myMoney"
        icon={<AccountBalanceIcon />}
        /> */}
        <BottomNavigationAction
          component={Link}
          to="/settings"
          label="settings"
          value="settings"
          icon={<SettingsIcon />}
        />
      </BottomNavigation>
    </>
  );
};

export default BottomBar;