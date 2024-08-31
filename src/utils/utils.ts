import { TrailFilterOptions } from "../types/FilterOptions";
import { Trail } from "../types/Trail";

// Predicate function to match a trail with difficulty level.
const matchDifficulty = (trail: Trail, difficultyOptions: string[]) => {
  if (!difficultyOptions || difficultyOptions.length === 0) return true;
  return difficultyOptions.includes(trail.difficulty);
}

// Predicate function to match a trail with groom status.
const matchGroomed = (trail: Trail, groomOptions: { groomed: boolean, ungroomed: boolean }) => {
  const { groomed, ungroomed } = groomOptions;
  if (groomed === ungroomed) return true;
  return groomed ? trail.groomed : !trail.groomed;
}

// Predicate function to match a trail with elevation gain number.
const matchElevationGain = (trail: Trail, elevationGain: number) => {
  if (elevationGain <= 0) return true;
  return trail.accessedByLifts.some((accessed) => accessed.elevationGain >= elevationGain);
}

/**
 * Main filters function that filters an array of trails based on trail filter options:
 * difficulty, groom, and elevation gain.
 * @param trails = list of all trail objects.
 * @param options = object of filter options/criterias.
 * @returns {Trail[]}
 */
export const filterTrails = (trails: Trail[], options: TrailFilterOptions): Trail[] => {
  return trails.filter(trail =>
    matchDifficulty(trail, options.difficulty) &&
    matchGroomed(trail, options.groomed) &&
    matchElevationGain(trail, options.elevationGain)
  );
}

/**
 * Generates a random id.
 * @returns {string} of 7 characters.
 */
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 9)
}
