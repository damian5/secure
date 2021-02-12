import styled from 'styled-components';
import { Theme } from 'interfaces/theme';

interface TitleProps {
  readonly theme: Theme,
  readonly marginTop: number,
  readonly marginBottom: number,
  readonly color: string,
  readonly height: number,
};

export const DividerLine = styled.div<TitleProps>`
  margin-top: ${({ marginTop }: TitleProps) => marginTop ? marginTop : 0}px;
  margin-bottom: ${({ marginBottom }: TitleProps) => marginBottom ? marginBottom : 0}px;
  border-top: ${({ height }: TitleProps) => height ? height : 1}px solid;
  border-color: ${({ color, theme }: TitleProps) => color ? color : theme.colors.primary};
  height: 1px;
`