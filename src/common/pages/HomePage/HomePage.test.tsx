import React from 'react';
import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { ThemeProvider } from '@mui/material';
import theme from '../../styles/theme';
import db from '../../../graphql/server/db.json';
import { ALL_USERS } from '../../components/PetOwnerDropdown';
import { SEARCH_PETS } from '../../components/PetList';
import HomePage from './HomePage';

describe('HomePage', () => {
  test('it should render', () => {
    const mocks = [
      {
        request: {
          query: ALL_USERS,
          variables: {},
        },
        result: {
          data: db.users,
        },
      },
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
          <HomePage />
        </ThemeProvider>
      </MockedProvider>
    );
    expect(screen.getByText(/Welcome to React App/)).toBeInTheDocument();
  });
});
