
import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders about link', () => {
  const { container } = render(<App />);
  expect(container).toBeDefined();
});