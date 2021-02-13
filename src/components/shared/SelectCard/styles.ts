import styled from "styled-components";
import { Theme } from 'interfaces/theme';
import { fnScale } from 'helpers/scale';

interface CardWrapperProps {
  readonly theme: Theme,
}

export const CardWrapper = styled.div<CardWrapperProps>`
  z-index: 3;
  width: 100%;
  min-height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  .background {
    background: ${({ theme }: CardWrapperProps) => theme.transparency.background};
    height: 100%;
    position: absolute;
    width: 100%;
    backdrop-filter: blur(5px);
    z-index: 2;
  }
  .card {
    overflow: scroll;
    background: white;
    max-height: ${fnScale(200)}px;
    width: inherit;
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 3;
    border: 1px solid green;
    border-radius: 19px;
  }
`