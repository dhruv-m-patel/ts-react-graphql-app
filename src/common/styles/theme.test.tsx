import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider, Theme, StyledEngineProvider } from '@mui/styles';
import Typography from '@mui/material/Typography';
import { BasicTheme } from './theme';
import '@testing-library/jest-dom';


declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}


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
