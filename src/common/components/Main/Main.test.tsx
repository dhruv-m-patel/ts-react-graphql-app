import React from 'react';
import { render, screen } from '@testing-library/react';
import Main from './Main';

describe('Main', () => {
  test('it should render content', () => {
    render(
      <Main>
        <h1>Hello</h1>
        <h3>Foo</h3>
      </Main>
    );

    expect(screen.getByText(/Hello/)).toBeInTheDocument();
    expect(screen.getByText(/Foo/)).toBeInTheDocument();
  });
});
