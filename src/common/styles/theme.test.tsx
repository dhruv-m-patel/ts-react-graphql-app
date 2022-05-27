import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from '@mui/styles';
import Typography from '@mui/material/Typography';
import { StyledEngineProvider } from '@mui/material/styles';
import { BasicTheme } from './theme';
import '@testing-library/jest-dom';

describe('theme', () => {
  test('it provides basic theme correctly', () => {
    const { container } = render(
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={BasicTheme}>
          <Typography variant="h1">Hello World</Typography>
        </ThemeProvider>
      </StyledEngineProvider>
    );
    expect(container).toMatchSnapshot();
  });
});
