import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material';
import theme from '../../styles/theme';
import Drawer from './Drawer';

describe('Navigation/Drawer', () => {
  test('it should render', () => {
    render(
      <ThemeProvider theme={theme}>
        <Drawer
          drawerIsOpen
          drawerContent={
            <React.Fragment>
              <a href="#" data-testid="testLink">
                Documents
              </a>
            </React.Fragment>
          }
        />
      </ThemeProvider>
    );

    const testLink = screen.getByTestId('testLink');
    expect(testLink.textContent).toEqual('Documents');
  });

  test('it should render with closed drawer', () => {
    render(
      <ThemeProvider theme={theme}>
        <Drawer
          drawerIsOpen={false}
          drawerContent={
            <React.Fragment>
              <a href="#" data-testid="testLink">
                Documents
              </a>
            </React.Fragment>
          }
        />
      </ThemeProvider>
    );

    const testLink = screen.getByTestId('testLink');
    expect(testLink.textContent).toEqual('Documents');
  });
});
