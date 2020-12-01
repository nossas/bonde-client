import React from 'react';

type Row = {
  original: any
}

type Props = {
  row: Row
}

const Role = ({ row: { original } }: Props) =>
  <span>
    {original.role === 2 ? 'mobilizador(a)' : 'administrador(a)'}
  </span>
;

export default Role;
