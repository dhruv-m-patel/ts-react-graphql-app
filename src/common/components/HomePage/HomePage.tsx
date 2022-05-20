import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import axios, { AxiosResponse } from 'axios';
import { StyleVariables } from '../../styles';
import Page from '../Page';

const useStyles = makeStyles(() => ({
  title: {
    color: StyleVariables.colors.blue,
  },
  loadingMessage: {
    color: StyleVariables.colors.darkGrey,
  },
  error: {
    color: StyleVariables.colors.red,
  },
}));

export default function HomePage(): JSX.Element {
  const classes = useStyles();
  const [message, setMessage] = useState<string | undefined>();
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const getApiMessage = async () => {
      const response: AxiosResponse<{ message: string }> = await axios.get(
        '/api/message'
      );
      if (!axios.isAxiosError(response)) {
        setMessage(response.data.message);
      } else {
        setError('Error fetching message from api');
      }
      setIsFetching(false);
    };
    setIsFetching(true);
    getApiMessage();
  }, []);

  return (
    <Page>
      <Typography variant="h1" className={classes.title}>
        Welcome to React App
      </Typography>
      {isFetching && (
        <Typography variant="h5" className={classes.loadingMessage}>
          Fetching message from API
        </Typography>
      )}
      {error ? (
        <Typography variant="h5" className={classes.error}>
          {error}
        </Typography>
      ) : (
        <Typography variant="h5">{message}</Typography>
      )}
    </Page>
  );
}
