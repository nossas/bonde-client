import React from 'react';

type Location = {
  pathname: string
}

type Props = {
  location: Location
}

const NotFound = ({ location }: Props) => (
  <h1>No match to {location.pathname}</h1>
);

export default NotFound;
