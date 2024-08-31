import { useGlobalState } from "../state/GlobalStateContext";
import { FormDataType } from "../components/Form";
import { TrailFilterOptions } from "../types/FilterOptions";
import { filterTrails } from "../utils/utils";

/**
 * Custom hook to handle group form submission.
 */
export const useGroupForm = (actionType: 'ADD_GROUP' | 'EDIT_GROUP', onClose: () => void) => {
  const { state, dispatch } = useGlobalState();

  // Create filter options from submitted form data.
  const generateFilterOptions = (formData: FormDataType): TrailFilterOptions => ({
    difficulty: [formData.difficulty],
    groomed: {
      groomed: formData.groomStatus === "groomed",
      ungroomed: formData.groomStatus === "ungroomed"
    },
    elevationGain: formData.elevationGain
  });

  // Handle form submission.
  const handleFormSubmit = (formData: FormDataType) => {
    const filterOptions = generateFilterOptions(formData);
    const matchingTrails = filterTrails(state.trails, filterOptions);

    const payload = {
      ...formData,
      numberOfRecommendedTrails: matchingTrails.length,
      recommendedTrails: matchingTrails,
    };

    dispatch({
      type: actionType,
      payload
    });
    onClose(); // Close form modal after submission.
  }

  return { handleFormSubmit }
}
