import React from 'react';
import { render, screen } from '@testing-library/react';
import { createTheme, adaptV4Theme, ThemeProvider } from '@mui/material';
import Typography from '@mui/material/Typography';
import Page from './Page';
import { StyleVariables } from '../../styles/variables';
import theme from '../../styles/theme';

describe('Page', () => {
  test('it renders with default theme', () => {
    render(
      <ThemeProvider theme={theme}>
        <Page>
          <Typography variant="h1">Hello World</Typography>
        </Page>
      </ThemeProvider>
    );

    expect(screen.getByText(/Hello World/)).toBeInTheDocument();
  });

  test('it renders with given theme', () => {
    const customTheme = createTheme({
      palette: {
        mode: 'dark',
        primary: {
          main: StyleVariables.colors.blue,
          contrastText: StyleVariables.colors.darkGrey,
        },
      },
    });

    render(
      <ThemeProvider theme={theme}>
        <Page theme={customTheme}>
          <Typography variant="h1">Hello World</Typography>
        </Page>
      </ThemeProvider>
    );

    expect(screen.getByText(/Hello World/)).toBeInTheDocument();
  });
});
