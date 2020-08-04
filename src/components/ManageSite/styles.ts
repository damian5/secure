import styled from 'styled-components';

export const ManageSiteWrapper = styled.div`
  height: 100%;
  z-index: 10;
  background: white;
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  transition: 0.5s;
  .back-button {
    position: absolute;
    left: 0;
    top: 0;
  }
`