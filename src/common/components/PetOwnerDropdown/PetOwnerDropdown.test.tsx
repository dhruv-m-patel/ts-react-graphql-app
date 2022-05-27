import React from 'react';
import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { ThemeProvider } from '@mui/material';
import theme from '../../styles/theme';
import db from '../../../graphql/server/db.json';
import { ALL_USERS } from '../../components/PetOwnerDropdown';
import PetOwnerDropdown from './PetOwnerDropdown';

describe('PetOwnerDropdown', () => {
  test('it should render', async () => {
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
    ];
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ThemeProvider theme={theme}>
          <PetOwnerDropdown onChange={() => {}} />
        </ThemeProvider>
      </MockedProvider>
    );

    db.users.forEach(async (user) => {
      const ownerName = await screen.findByText(user.username);
      expect(ownerName).toBeInTheDocument();
    });
  });
});
