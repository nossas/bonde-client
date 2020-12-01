import React from "react";
import { Individual } from "../types";
// export type Filters = {
//   [x: string]: { label: string; value: string | number } & string;
// };

export type Pagination = {
  rows: number;
  offset: number;
  page: number;
};

type Action =
  | { type: "page"; value: number }
  | { type: "rows"; value: number }
  | { type: "group"; value: { value: number; label: string } | null }
  | { type: "relationships"; value: any }
  | { type: "reset"; value?: any }
  | { type: "match"; value: { [x: string]: Individual } }
  | { type: "individuals"; value: any };

type Dispatch = (action: Action) => void;

type State = {
  relationships: any;
  individuals: any;
  selectedGroup?: { value: number; label: string } | null;
  match: {
    recipient: Individual;
    volunteer: Individual;
  };
} & Pagination;

const FilterStateContext = React.createContext<State | undefined>(undefined);
const FilterDispatchContext = React.createContext<Dispatch | undefined>(
  undefined
);

const initialFilters = {
  query: undefined,
  status: undefined,
  relationshipStatus: undefined,
  userStatus: undefined,
  agent: undefined,
  state: undefined,
  availability: undefined,
  // created_at: undefined,
};

const initialState = {
  rows: 10,
  offset: 10 * 0,
  page: 0,
  selectedGroup: undefined,
  relationships: initialFilters,
  individuals: initialFilters,
  match: {
    recipient: {},
    individuals: {},
  },
};

function filterReducer(state: State, action: Action) {
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
    case "group": {
      return {
        ...initialState,
        selectedGroup: action.value,
      };
    }
    case "relationships": {
      return {
        ...state,
        relationships: {
          ...state.relationships,
          ...action.value,
        },
      };
    }
    case "individuals": {
      return {
        ...state,
        individuals: {
          ...state.individuals,
          ...action.value,
        },
      };
    }
    case "reset": {
      return {
        ...initialState,
      };
    }
    case "match": {
      return {
        ...state,
        match: {
          ...state.match,
          ...action.value,
        },
      };
    }
    default: {
      throw new Error(`Unhandled action type`);
    }
  }
}

const FilterProvider = ({ children }: { children: any }): any => {
  const [state, dispatch] = React.useReducer(
    filterReducer,
    initialState as never
  );

  return (
    <FilterStateContext.Provider value={state}>
      <FilterDispatchContext.Provider value={dispatch}>
        {children}
      </FilterDispatchContext.Provider>
    </FilterStateContext.Provider>
  );
};

function useFilterState(): State {
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

const useFilter = (): [State, Dispatch] => [
  useFilterState(),
  useFilterDispatch(),
];

export { FilterProvider, useFilterState, useFilterDispatch, useFilter };
