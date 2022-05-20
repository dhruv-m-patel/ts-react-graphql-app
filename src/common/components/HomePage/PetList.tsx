import React from 'react';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core';

const SEARCH_PETS = gql`
  query SearchPets($ownerId: String) {
    pets(ownerId: $ownerId) {
      id
      name
      type
      owner {
        username
      }
    }
  }
`;

interface PetListProps {
  ownerId: number;
}

export default function PetList({ ownerId }: PetListProps): JSX.Element {
  const { data, loading, error } = useQuery(SEARCH_PETS, {
    variables: {
      ownerId: ownerId === -1 ? '' : ownerId.toString(),
    },
  });

  if (loading) {
    return <p>Loading pets data...</p>;
  }

  if (error) {
    return (
      <p style={{ color: 'red' }}>
        Error retrieving pets data: {JSON.stringify(error)}
      </p>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Pet Name</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Owner</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.pets.map((pet) => (
            <TableRow key={pet.id}>
              <TableCell>{pet.id}</TableCell>
              <TableCell>{pet.name}</TableCell>
              <TableCell>{pet.type}</TableCell>
              <TableCell>{pet.owner.username}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
