import { useCallback } from "react";
import { useGlobalState } from "../state/GlobalStateContext";

/**
 * Custom hook to handle changes in the trail filter panel.
 */
export const useTrailFilter = () => {
  const { state, dispatch } = useGlobalState();

  const handleDifficultyChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const newDifficulty = event.target.value;
    const updatedDifficulty = event.target.checked 
      ? [...(state?.trailFilterOptions?.difficulty || []), newDifficulty]
      : state?.trailFilterOptions.difficulty?.filter((dif: string) => dif !== newDifficulty) || []
    
    dispatch({
      type: 'SET_TRAIL_FILTER',
      payload: {
        ...state?.trailFilterOptions,
        difficulty: updatedDifficulty,
      }
    });
  }, [state?.trailFilterOptions, dispatch]);

  const handleGroomedChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;

    dispatch({
      type: 'SET_TRAIL_FILTER',
      payload: {
        ...state?.trailFilterOptions,
        groomed: {
          ...state?.trailFilterOptions.groomed,
          [value]: checked
        },
      },
    });
  }, [state?.trailFilterOptions, dispatch]);

  const handleElevationGainChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const elevationGain = Number(event.target.value);

    dispatch({
      type: 'SET_TRAIL_FILTER',
      payload: {
        ...state?.trailFilterOptions,
        elevationGain: elevationGain || 0,
      },
    });
  }, [state?.trailFilterOptions, dispatch]);

  return {
    handleDifficultyChange,
    handleGroomedChange,
    handleElevationGainChange
  }
}
