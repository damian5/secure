import React from 'react';
import * as styles from './styles'
import { CircularProgress } from '@material-ui/core';

const Loader = () => (
  <styles.LoaderWrapper>
    <CircularProgress/>
    <div>Loading</div>
  </styles.LoaderWrapper>
)

export default Loader;