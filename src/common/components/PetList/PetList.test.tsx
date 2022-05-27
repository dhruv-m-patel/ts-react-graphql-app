import React from 'react';
import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { ThemeProvider } from '@mui/material';
import theme from '../../styles/theme';
import db from '../../../graphql/server/db.json';
import { SEARCH_PETS } from '../../components/PetList';
import PetList from './PetList';

describe('PetList', () => {
  test('it should render', async () => {
    const mocks = [
      {
        request: {
          query: SEARCH_PETS,
          variables: {
            ownerId: -1,
          },
        },
        result: {
          data: db.pets,
        },
      },
    ];
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ThemeProvider theme={theme}>
          <PetList ownerId={-1} />
        </ThemeProvider>
      </MockedProvider>
    );

    db.pets.forEach(async (pet) => {
      const petId = await screen.findByText(pet.id);
      expect(petId).toBeInTheDocument();
    });
  });
});
