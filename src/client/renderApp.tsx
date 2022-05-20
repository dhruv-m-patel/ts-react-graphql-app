import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import Router from '../common/router';
import client from '../graphql/client';

export default function RenderApp() {
  const supportsHistory = 'pushState' in window.history;
  const RootElement = document.getElementById('root') as HTMLElement;

  ReactDOM.hydrate(
    <ApolloProvider client={client}>
      <BrowserRouter forceRefresh={!supportsHistory}>
        <Router />
      </BrowserRouter>
    </ApolloProvider>,
    RootElement
  );
}
