import React from 'react';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import {
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  makeStyles,
} from '@material-ui/core';

const ALL_USERS = gql`
  {
    users {
      id
      username
    }
  }
`;

const useStyles = makeStyles(() => ({
  formControl: {
    minWidth: '200px',
  },
}));

interface PetOwnerDropdownProps {
  onChange: (
    event: React.ChangeEvent<{
      value: unknown;
    }>
  ) => void;
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
