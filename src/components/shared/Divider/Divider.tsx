import React, { memo } from 'react';
import { DividerLine } from './styles';

interface DividerProps {
  topSpace?: number,
  bottomSpace?: number,
  color?: string,
  height?: number,
};

const Divider = ({height, color, topSpace, bottomSpace}: DividerProps): JSX.Element => (
  <DividerLine height={height} color={color} marginTop={topSpace} marginBottom={bottomSpace} />
);

Divider.defaultProps = {
  topSpace: 0,
  bottomSpace: 0,
  color: undefined,
  height: undefined,
};

export default memo<DividerProps>(Divider);