import React from 'react';
import { render, screen } from '@testing-library/react';
import { createTheme, adaptV4Theme } from '@mui/material';
import Typography from '@mui/material/Typography';
import Page from './Page';
import { StyleVariables } from '../../styles/variables';

describe('Page', () => {
  test('it renders with default theme', () => {
    render(
      <Page>
        <Typography variant="h1">Hello World</Typography>
      </Page>
    );

    expect(screen.getByText(/Hello World/)).toBeInTheDocument();
  });

  test('it renders with given theme', () => {
    const customTheme = createTheme(adaptV4Theme({
      palette: {
        mode: 'dark',
        primary: {
          main: StyleVariables.colors.blue,
          contrastText: StyleVariables.colors.darkGrey,
        },
      },
    }));

    render(
      <Page theme={customTheme}>
        <Typography variant="h1">Hello World</Typography>
      </Page>
    );

    expect(screen.getByText(/Hello World/)).toBeInTheDocument();
  });
});
