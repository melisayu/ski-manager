import { createContext, useContext } from "react";
import { Trail } from "../types/Trail";
import { TrailFilterOptions } from "../types/FilterOptions";
import { GroupType } from "../types/Group";

export interface GlobalState {
  isLoading: boolean;
  trails: Trail[];
  trailCount: number;
  trailFilterOptions: TrailFilterOptions;
  filteredTrails: Trail[];
  groups: GroupType[];
  groupCount: number;
  currentGroup: GroupType | undefined;
}

export type GlobalAction =
  | { type: 'SET_LOADING'; payload: boolean; }
  | { type: 'ADD_GROUP'; payload: GroupType; }
  | { type: 'EDIT_GROUP'; payload: GroupType; }
  | { type: 'REMOVE_GROUP'; payload: string; }
  | { type: 'SET_CURRENT_GROUP'; payload: string | undefined; }
  | { type: 'CLEAR_CURRENT_GROUP'; }
  | { type: 'SET_GROUP_COUNT'; payload: number; }
  | { type: 'SET_TRAILS'; payload: Trail[]; }
  | { type: 'SET_TRAIL_COUNT'; payload: number; }
  | { type: 'SET_TRAIL_FILTER'; payload: TrailFilterOptions; }
  | { type: 'RESET_TRAIL_FILTER'; };;

export const initialState: GlobalState = {
  isLoading: true,
  groups: [],
  // Uncomment group below to see dashboard with dummy data.
  // groups: [
  //   { id: '111', name: 'first group' , size: 3, difficulty: Difficulty.BEGINNER, numberOfRecommendedTrails: 0, recommendedTrails: []},
  //   { id: '112', name: 'second group' , size: 5, difficulty: Difficulty.INTERMEDIATE, numberOfRecommendedTrails: 0, recommendedTrails: []},
  //   { id: '113', name: 'third group' , size: 2, difficulty: Difficulty.EXPERT, numberOfRecommendedTrails: 0, recommendedTrails: []}
  // ],
  trailCount: 0,
  trailFilterOptions: {
    difficulty: [],
    groomed: {
      groomed: false,
      ungroomed: false,
    },
    elevationGain: 0,
  },
  filteredTrails: [],
  groupCount: 0,
  trails: [],
  currentGroup: undefined,
}

const GlobalStateContext = createContext<{
  state: GlobalState;
  dispatch: React.Dispatch<GlobalAction>
}>({
  state: initialState,
  dispatch: () => null,
});

export const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error('useGlobalState must be used within GlobalStateProvider.');
  }

  return context;
};

export default GlobalStateContext;
