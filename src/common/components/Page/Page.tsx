import React, { ReactChild, ReactFragment, ReactPortal } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import { Theme, Container } from '@mui/material';
import clsx from 'clsx';
import { StyleVariables } from '../../styles/variables';

interface PageProps {
  /** An optional className you can provide to override styles */
  className?: string;
  /** A custom theme to apply to your page. By default Basic theme is applied. */
  theme?: Theme;
  children: boolean | ReactChild | ReactFragment | ReactPortal;
}

const useStyles = makeStyles((theme: Theme) => ({
  page: {
    margin: '0 auto',
    padding: '1rem',
    fontFamily: StyleVariables.fonts.family.primary,
    fontSize: StyleVariables.fonts.size.regular,
    lineHeight: StyleVariables.fonts.lineHeight.regular,
    minHeight: '100vh',
    [theme.breakpoints.only('xs')]: {
      padding: '1rem 0',
    },
  },
}));

export default function Page({ className, children }: PageProps): JSX.Element {
  const classes = useStyles();

  return (
    <div className="page">
      <Container className={clsx(classes.page, className)} maxWidth={false}>
        {children}
      </Container>
    </div>
  );
}
