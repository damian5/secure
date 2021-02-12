import styled from 'styled-components';
import { fnScale } from 'helpers/scale';

export const Wrapper = styled.div`
  display: flex;
  padding: 20px 10px 0 10px;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  padding-bottom: 50px;
  flex: 1;
`

export const SitesWrapper = styled.div`
  @media (max-width: 933px) {
    display: flex;
    flex-direction: column;
  }
  flex: 1;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
`

export const StyledSite = styled.div`
  border: 1px solid gray;
  border-radius: ${fnScale(3)}px;
  box-shadow: gray;
  cursor: pointer;
  padding: 10px;
  :hover {
    box-shadow: 0px 6px 5px grey;
    transition: .2s;
  }

  .favorite-button {
    background: none;
    border: none;
    outline: none;
    cursor: pointer;
  }
`