import React from 'react';
import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing'
import HomePage from './HomePage';
import { ALL_USERS } from './PetOwnerDropdown';
import db from '../../../graphql/server/db.json';
import { SEARCH_PETS } from './PetList';

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
            ownerId: -1
          },
        },
        result: {
          data: db.pets,
        },
      },
    ]
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <HomePage />
      </MockedProvider>
    );
    expect(screen.getByText(/Welcome to React App/)).toBeInTheDocument();
  });
});
