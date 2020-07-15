import React from 'react';
import { render } from '@testing-library/react';

const renderBasic = (ui: JSX.Element) => render(<>{ui}</>);

export default {
  renderBasic,
};
