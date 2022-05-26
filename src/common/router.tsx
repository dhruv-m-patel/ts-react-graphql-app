import React from 'react';
import { Switch, Route } from 'react-router-dom';
import loadable from '@loadable/component';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { BasicTheme } from '../common/styles/theme';

export function createEmotionCache() {
  return createCache({ key: 'css' });
}

export default function Router() {
  const cache = createEmotionCache();
  return (
    <CacheProvider value={cache}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={BasicTheme}>
          <CssBaseline />
          <Switch>
            <Route
              exact
              path="/"
              component={loadable(() => import('./components/HomePage'))}
            />
          </Switch>
        </ThemeProvider>
      </StyledEngineProvider>
    </CacheProvider>
  );
}
