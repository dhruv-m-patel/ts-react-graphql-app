import React from 'react';
import { NextFunction, Request, Response } from 'express';
import ReactDOMServer from 'react-dom/server';
import path from 'path';
import { StaticRouter } from 'react-router-dom';
import { ChunkExtractor } from '@loadable/server';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { getMarkupFromTree } from '@apollo/client/react/ssr';
import { SchemaLink } from '@apollo/client/link/schema';
import Router from '../../common/router';
import buildContext from '../../graphql/server/context';
import schema from '../../graphql/server/schema';

export default async function renderPage(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const contentType =
    req.headers['content-type'] || req.headers['Content-Type'];
  if (contentType && !contentType.includes('text/html')) {
    next();
  } else {
    const context: { url?: string } = {};
    if (context.url) {
      res.redirect(context.url);
      return;
    }

    const statsFile = path.join(
      process.cwd(),
      './build-static/loadable-stats.json'
    );
    const extractor = new ChunkExtractor({
      statsFile,
      entrypoints: ['client'],
      publicPath: '/',
    });

    const client = new ApolloClient({
      cache: new InMemoryCache(),
      ssrMode: true,
      link: new SchemaLink({ context: buildContext({ req }), schema }),
    });
    const graphState = client.extract();

    const app = ReactDOMServer.renderToString(
      <StaticRouter location={req.url} context={context}>
        <ApolloProvider client={client}>
          <Router />
        </ApolloProvider>
      </StaticRouter>
    );

    const ssrHtml = await getMarkupFromTree({
      tree: app,
      renderFunction: ReactDOMServer.renderToString,
    });

    res.send(`
      <!DOCTYPE html>
      <html lang="en-US">
        <head>
          <link href="/images/favicon.ico" rel="shortcut icon">
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" priority="1" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
          <title>Typescript React GraphQL App</title>
          ${extractor.getLinkTags()}
          <script type="text/javascript">
            window.__PRELOADED_STATE__ = ${JSON.stringify(graphState)};
          </script>
        </head>
        <body>
          <div id="root">${ssrHtml}</div>
          ${extractor.getScriptTags()}
        </body>
      </html>
    `);
  }
}
