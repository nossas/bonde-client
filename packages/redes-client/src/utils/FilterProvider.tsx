import React from "react";

export type Filters = {
  rows: number;
  offset: number;
  page: number;
  status: {
    _eq: string | undefined;
  };
  availability: {
    _eq: string | undefined;
  };
  order_by: {
    created_at: string;
  };
  state: {
    _eq: string | undefined;
  };
  created_at: {
    _eq: string | undefined;
  };
};

type Action =
  | { type: "page"; value: number }
  | { type: "rows"; value: number }
  | { type: "status"; value: string }
  | { type: "availability"; value: string }
  | { type: "state"; value: string }
  | { type: "created_at"; value: string }
  | { type: "reset"; value?: any };

type Dispatch = (action: Action) => void;

const FilterStateContext = React.createContext<Filters | undefined>(undefined);
const FilterDispatchContext = React.createContext<Dispatch | undefined>(
  undefined
);
function filterReducer(state: Filters, action: Action) {
  switch (action.type) {
    case "page": {
      const valid =
        typeof action.value !== "undefined" ? action.value : state.page;
      return {
        ...state,
        page: valid,
        offset: valid * state.rows,
      };
    }
    case "rows": {
      return {
        ...state,
        rows: action.value,
        offset: action.value * state.page,
      };
    }
    case "status": {
      const valid = action.value === "all" ? undefined : action.value;
      return {
        ...state,
        status: { _eq: valid },
      };
    }
    case "availability": {
      const valid = action.value === "all" ? undefined : action.value;
      return {
        ...state,
        availability: { _eq: valid },
      };
    }
    case "state": {
      const valid = action.value === "all" ? undefined : action.value;
      return {
        ...state,
        state: { _eq: valid },
      };
    }
    case "created_at": {
      const valid = action.value === "all" ? undefined : action.value;
      return {
        ...state,
        created_at: { _eq: valid },
      };
    }
    case "reset": {
      return {
        rows: 1000,
        offset: 1000 * 0,
        page: 0,
        status: { _eq: undefined },
        availability: { _eq: undefined },
        state: { _eq: undefined },
        created_at: { _eq: undefined },
        order_by: { created_at: "asc" },
      };
    }
    default: {
      throw new Error(`Unhandled action type`);
    }
  }
}

const FilterProvider = ({ children }: { children: any }): any => {
  const filtered = {
    rows: 1000,
    offset: 1000 * 0,
    page: 0,
    status: { _eq: undefined },
    availability: { _eq: undefined },
    state: { _eq: undefined },
    created_at: { _eq: undefined },
    order_by: { created_at: "asc" },
  };

  const [state, dispatch] = React.useReducer(filterReducer, filtered);

  return (
    <FilterStateContext.Provider value={state}>
      <FilterDispatchContext.Provider value={dispatch}>
        {children}
      </FilterDispatchContext.Provider>
    </FilterStateContext.Provider>
  );
};

function useFilterState(): Filters {
  const context = React.useContext(FilterStateContext);
  if (context === undefined) {
    throw new Error("useFilterState must be used within a FilterProvider");
  }
  return context;
}

function useFilterDispatch(): Dispatch {
  const context = React.useContext(FilterDispatchContext);
  if (context === undefined) {
    throw new Error("useFilterDispatch must be used within a FilterProvider");
  }
  return context;
}

const useFilter = (): [Filters, Dispatch] => [
  useFilterState(),
  useFilterDispatch(),
];

export { FilterProvider, useFilterState, useFilterDispatch, useFilter };
