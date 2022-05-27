import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import BasicTheme from '../../styles/theme';

export function createEmotionCache() {
  return createCache({ key: 'css' });
}

interface MainProps {
  children?: React.ReactNode | JSX.Element;
}

export default function Main({ children }: MainProps) {
  const cache = createEmotionCache();

  return (
    <CacheProvider value={cache}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={BasicTheme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </StyledEngineProvider>
    </CacheProvider>
  );
}
