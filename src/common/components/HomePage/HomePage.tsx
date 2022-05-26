import React, { useCallback, useState } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import { Container } from '@mui/material';
import Text from '../Text';
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
      <Container>
        <Text as="h1" className={classes.title}>
          Welcome to React App
        </Text>
        <PetOwnerDropdown onChange={handlePetOwnerChange} />
        <PetList ownerId={ownerId} />
      </Container>
    </Page>
  );
}
