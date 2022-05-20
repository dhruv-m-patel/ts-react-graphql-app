import React, { ChangeEvent, useCallback, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { gql, useQuery } from '@apollo/client';
import { StyleVariables } from '../../styles';
import Page from '../Page';
import PetOwnerDropdown from './PetOwnerDropdown';
import PetList from './PetList';

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
  const [ownerId, setOwnerId] = useState<number>(-1);

  const handlePetOwnerChange = useCallback(({ target }) => {
    setOwnerId(Number(target.value));
  }, []);

  return (
    <Page>
      <Typography variant="h1" className={classes.title}>
        Welcome to React App
      </Typography>
      <br />
      <br />
      <PetOwnerDropdown onChange={handlePetOwnerChange} />
      <br />
      <br />
      <PetList ownerId={ownerId} />
    </Page>
  );
}
