import React from 'react';

import MainContainerLayout from './style';

interface IMainContainerProps {
  children?: JSX.Element;
}

const MainContainer: React.FC<IMainContainerProps> = ({ children }) => {
  return <MainContainerLayout>{children}</MainContainerLayout>;
};

export default MainContainer;
