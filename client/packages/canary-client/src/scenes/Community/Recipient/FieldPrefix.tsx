import React from 'react';

const FieldPrexiContext = React.createContext<string>('');

type Props = {
  prefix: string
  title?: string
  children?: any
}

export const FieldPrefix = ({ prefix, children }: Props) => (
  <FieldPrexiContext.Provider value={prefix}>
    {children}
  </FieldPrexiContext.Provider>
);

export const PrefixedField = ({ name, component: Field, ...props }: any) => (
  <FieldPrexiContext.Consumer>
    {(prefix: string) => <Field name={`${prefix}.${name}`} {...props} />}
  </FieldPrexiContext.Consumer>
);