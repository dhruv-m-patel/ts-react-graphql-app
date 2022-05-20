import React from 'react';
import { render, screen } from '@testing-library/react';
import HomePage from './HomePage';

describe('HomePage', () => {
  test('it should render', () => {
    render(<HomePage />);
    expect(screen.getByText(/Welcome to React App/)).toBeInTheDocument();
  });
});
