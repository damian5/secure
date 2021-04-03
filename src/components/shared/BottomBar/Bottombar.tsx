import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PasswordIcon from '@material-ui/icons/VpnKey';
// import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import SettingsIcon from '@material-ui/icons/Settings';

import { StyledBottomBarButton, BlurBackground } from './styles';

const BottomBar = () => {
  const location = useLocation();
  const pathname = location.pathname.replace('/', '');

  const [value, setValue] = useState<string>(pathname);

  useEffect(() => {
    setValue(pathname);
  }, [pathname]);

  const isTabSelected: (param: string) => boolean = (location) => location === value;

  return (
    <>
      <BlurBackground className="blur-div" />
      <BottomNavigation showLabels onChange={(_, newValue) => setValue(newValue )}>
        <StyledBottomBarButton
          test={isTabSelected('passwords').toString()}
          component={Link}
          to="/passwords"
          label="passwords"
          value="passwords"
          icon={<PasswordIcon />}
        />
        <StyledBottomBarButton
          test={isTabSelected('favorites').toString()}
          to="/favorites"
          component={Link}
          label="favorites"
          value="favorites"
          icon={<FavoriteIcon />}
        />
        {/* <StyledBottomBarButton
        component={Link}
        to="/myMoney"
        label="myMoney"
        value="myMoney"
        icon={<AccountBalanceIcon />}
        /> */}
        <StyledBottomBarButton
          test={isTabSelected('settings').toString()}
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