import React from 'react';
import { useField } from 'bonde-components';
import SelectField from '../../../components/SelectField';

const SelectFieldCondition = ({ children, parent, ...props }: any) => {
  const { input } = useField(parent);

  return (
    <SelectField  {...props}>
      {children(input.value)}
    </SelectField>
  );
}

export default SelectFieldCondition;