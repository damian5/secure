import styled from 'styled-components';

export const ModalWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  backdrop-filter: blur(5px);

  .children-container {
    @media (max-width: 500px) {
      flex: 1;
    }
    border-radius: 30px;
    background: white;
    min-width: 300px;
    width: 100%;
    max-width: 500px;
    border: 1px solid gray;
    padding: 15px 30px;
  }
`;