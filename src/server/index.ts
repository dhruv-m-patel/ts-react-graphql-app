import dotenv from 'dotenv';
import express from 'express';
import app from './app';
import { Promise as BluebirdPromise } from 'bluebird';

dotenv.config();
global.Promise = BluebirdPromise;

export interface AppStartupOptions {
  port: number;
  appName?: string;
  setup?: () => Promise<void>;
  callback?: () => void;
}

function runApp(app: express.Application, options: AppStartupOptions) {
  const { port, appName, setup = undefined, callback = undefined } = options;

  const startApp = () => {
    app.listen(port, () => {
      console.log(`${appName || 'App'} started on port ${port}`);
      if (callback && typeof callback === 'function') {
        callback();
      }
    });
  };

  if (setup && typeof setup === 'function') {
    setup().then(() => {
      startApp();
    });
  } else {
    startApp();
  }
}

const port: number = Number(process.env.STARTER_APP_PORT) || 3000;

runApp(app, { appName: 'Starter App', port });
