import path from 'path';
import express, { Application, Request, Response, NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import enrouten from 'express-enrouten';
import morgan from 'morgan';
import session from 'express-session';
import cors from 'cors';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import 'fetch-everywhere';
import renderPage from './middleware/renderPage';
import { ResponseError } from './types';
import graphqlServer from '../graphql/server';

function finalErrorHandler(
  err: ResponseError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err) {
    if (!err.status) {
      console.error(err.message, err.stack);
    }
    res.status(err.status || 500).json({
      message: err.message,
    });
  } else {
    next();
  }
}

export interface AppOptions {
  paths: {
    routes: string;
    webpackConfig: string;
    staticDirectories?: Array<string>;
  };
  sessionSecret?: string;
  setup: (app: express.Application) => void;
}

function configureApp(options: AppOptions) {
  const {
    setup,
    paths: { routes, staticDirectories, webpackConfig },
    sessionSecret,
  } = options;

  const app: Application = express();
  app.disable('x-powered-by');
  app.use(cookieParser());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(compression());
  app.use(morgan('combined'));
  app.use(cors());

  // Enable sessions if session secret was provided by consumer
  if (sessionSecret) {
    app.use(
      session({
        secret: sessionSecret,
        saveUninitialized: true,
        resave: false,
        cookie: {
          httpOnly: true,
          maxAge: 60 * 60 * 10000, // Cookies will be valid for 1 hour
        },
      })
    );
  }

  if (staticDirectories?.length) {
    staticDirectories.forEach((path) => {
      app.use(express.static(path));
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const config = require(webpackConfig);
  if (process.env.NODE_ENV === 'development') {
    const compiler = webpack(config);
    app.use(
      webpackDevMiddleware(compiler, {
        stats: { colors: true },
        publicPath: config.output.publicPath,
      })
    );
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    app.use(webpackHotMiddleware(compiler));
  } else {
    // If running in non-development mode, expose the public path as static
    app.use(express.static(config.output.path));
  }

  // Support directory-based routing by default
  app.use(
    enrouten({
      directory: routes,
    })
  );

  // Allow consumer to run its own setup adding additional things for server app
  setup(app);

  // Add final error handler for api endpoints
  app.use(finalErrorHandler);

  return app;
}

const app: Application = configureApp({
  paths: {
    routes: path.resolve(__dirname, './routes'),
    webpackConfig: path.resolve(__dirname, '../../webpack.config.js'),
    staticDirectories: [path.resolve(__dirname, '../../static')],
  },
  setup: (webApp) => {
    webApp.use('*', renderPage);
  },
});

graphqlServer.applyMiddleware({
  app,
  path: '/graphql',
});

export default app;
