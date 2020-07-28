import styled from "styled-components";

export const CardWrapper = styled.div`
  width: 100%;
  min-height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  .background {
    height: 100%;
    position: absolute;
    width: 100%;
    z-index: 2;
  }
  .card {
    background: white;
    min-height: 200px;
    width: inherit;
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 3;
    border: 1px solid green;
    border-radius: 19px;
  }
`