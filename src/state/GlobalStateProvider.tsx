import React, { ReactNode, useEffect, useReducer } from "react";
import GlobalStateContext, { GlobalAction, GlobalState, initialState } from "./GlobalStateContext";
import { ApolloProvider, useQuery } from "@apollo/client";
import client from "../apolloClient";
import { GET_ALL_TRAILS } from "../graphql/trails";
import { filterTrails } from "../utils/utils";


const globalReducer = (state: GlobalState, action: GlobalAction): GlobalState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    // Groups
    case 'ADD_GROUP':
      return { ...state, groups: [...state.groups, action.payload ]};
    case 'EDIT_GROUP':
      const updatedGroups = state.groups.map(group => group.id === action.payload.id ? { ...group, ...action.payload } : group);
      return { ...state, groups: updatedGroups, currentGroup: action.payload};
    // TODO: Implement remove group.
    case 'REMOVE_GROUP':
      return { ...state, groups: state.groups.filter(group => group.id !== action.payload )};
    case 'SET_GROUP_COUNT':
      return { ...state, groupCount: action.payload };
    case 'SET_CURRENT_GROUP':
      // Clear current group if payload is undefined.
      if (!action.payload) return { ...state, currentGroup: undefined };
      // Assign current group.
      const group = state.groups.find((group) => group.id === action.payload);
      return { ...state, currentGroup: group || undefined };

    // Trails
    case 'SET_TRAILS':
      return {
        ...state,
        trails: action.payload,
        filteredTrails: filterTrails(action.payload,state.trailFilterOptions)
      };
    case 'SET_TRAIL_COUNT':
      return { ...state, trailCount: action.payload };
    case 'SET_TRAIL_FILTER':  // Invoked when there is change in filter panel.
      const filteredTrails = filterTrails(state.trails, action.payload);
      return { ...state, trailFilterOptions: action.payload, filteredTrails, trailCount: filteredTrails.length };
    case 'RESET_TRAIL_FILTER':
      return {
        ...state,
        trailFilterOptions: { difficulty: [], groomed: { groomed: false, ungroomed: false }, elevationGain: 0 },
        filteredTrails: state.trails,
        trailCount: state.trails.length,
      };
      default:
      return state;
  }
}

const GlobalStateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(globalReducer, initialState);
  const { loading, error, data: trailsData } = useQuery(GET_ALL_TRAILS);

  useEffect(() => {
    dispatch({ type: 'SET_LOADING', payload: loading });
  }, [loading]);

  useEffect(() => {
    if (trailsData) {
      dispatch({ type: 'SET_TRAILS', payload: trailsData.allTrails });
      dispatch({ type: 'SET_TRAIL_COUNT', payload: trailsData.allTrails.length });
    }
  }, [trailsData]);

  useEffect(() => {
    if (state.groups) {
      dispatch({ type: 'SET_GROUP_COUNT', payload: state.groups.length });
    }
  }, [state.groups]);

  if (error) return <p>Error: {error.message}</p>

  return (
    <ApolloProvider client={client}>
      <GlobalStateContext.Provider value={{ state, dispatch }}>
        {children}
      </GlobalStateContext.Provider>
    </ApolloProvider>
  )
};

export default GlobalStateProvider;
