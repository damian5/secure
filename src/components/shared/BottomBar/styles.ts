import BottomNavigationAction, { BottomNavigationActionProps } from '@material-ui/core/BottomNavigationAction';
import styled from 'styled-components';

interface BottomBarProps extends BottomNavigationActionProps<any> {
  test: string;
}

export const StyledBottomBarButton = styled(BottomNavigationAction)<BottomBarProps>`
  color: ${({ theme, test }) => test === 'true' ? 'red' : theme.colors.primary};
`;

export const BlurBackground = styled.div`
  bottom: 0;
  position: fixed;
  height: 70px;
  background: ${({ theme }) => theme.transparency.background};
  width: 100%;
  backdrop-filter: blur(5px);
`;
