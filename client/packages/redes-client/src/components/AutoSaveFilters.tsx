import React, { useState } from "react";
import { FormSpy } from "bonde-components";
import { diff } from "deep-object-diff";

export default function AutoSaveFilters(props: {
  save: (e: any) => Promise<any>;
}): React.ReactElement {
  const [state, setState] = useState({});

  const onChange = (newValues: any) => {
    const difference = diff(state, newValues);
    if (Object.keys(difference).length) {
      // values have changed
      setState(newValues);
      props.save(difference);
    }
  };
  return (
    <FormSpy
      {...props}
      subscription={{ active: true, values: true }}
      onChange={(newValues) => onChange(newValues.values)}
    />
  );
}

AutoSaveFilters.displayName = "AutoSaveFilters";
