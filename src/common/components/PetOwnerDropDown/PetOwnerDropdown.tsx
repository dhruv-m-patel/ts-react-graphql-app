import React from 'react';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import {
  FormControl,
  Select,
  SelectChangeEvent,
  MenuItem,
  InputLabel,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

export const ALL_USERS = gql`
  query FetchAllUsers {
    users {
      id
      username
    }
  }
`;

const useStyles = makeStyles(() => ({
  formControl: {
    width: '100%',
    marginBottom: '2rem',
    '& .MuiInputBase-root': {
      backgroundColor: 'transparent',
    },
  },
}));

interface PetOwnerDropdownProps {
  onChange: (event: SelectChangeEvent) => void;
}

export default function PetOwnerDropdown({
  onChange,
}: PetOwnerDropdownProps): JSX.Element {
  const classes = useStyles();

  const { data } = useQuery(ALL_USERS);

  return (
    <FormControl variant="filled" className={classes.formControl}>
      <InputLabel>Filter by Pet Owner</InputLabel>
      <Select onChange={onChange}>
        <MenuItem value={-1}>Anyone</MenuItem>
        {!!data?.users &&
          data.users.map(({ id, username }) => (
            <MenuItem key={id} value={id}>
              {username}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
}
