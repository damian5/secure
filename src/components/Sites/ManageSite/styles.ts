import styled from 'styled-components';

export const ManageSiteWrapper = styled.div<{isOpen}>`
  height: 100%;
  z-index: 10;
  background: white;
  position: fixed;
  top: 0;
  bottom: 0;
  left: ${((props) => props.isOpen ? '0': '100%')};
  right: 0;
  width: 100%;
  transition: 0.5s;
`