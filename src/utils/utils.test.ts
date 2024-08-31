import { Difficulty } from "../types/Difficulty";
import { TrailFilterOptions } from "../types/FilterOptions";
import { Trail } from "../types/Trail";
import { filterTrails } from "./utils";

// Sample data
const trails: Trail[] = [
  {
    difficulty: Difficulty.BEGINNER,
    groomed: true,
    accessedByLifts: [{
      elevationGain: 300,
      id: "",
      status: "",
      capacity: 5,
      name: 'lift a'
    }],
    id: "1",
    name: "a"
  },
  {
    difficulty: Difficulty.BEGINNER,
    groomed: true,
    accessedByLifts: [{
      elevationGain: 700,
      id: "",
      status: "",
      capacity: 3,
      name: 'lift b'
    }],
    id: "2",
    name: "b"
  },
  {
    difficulty: Difficulty.INTERMEDIATE,
    groomed: false,
    accessedByLifts: [{
      elevationGain: 500,
      id: "",
      status: "",
      capacity: 8,
      name: 'lift c'
    }],
    id: "3",
    name: "c"
  },
  {
    difficulty: Difficulty.ADVANCED,
    groomed: true,
    accessedByLifts: [{
      elevationGain: 200,
      id: "",
      status: "",
      capacity: 5,
      name: 'lift d'
    }],
    id: "4",
    name: "d"
  },
  {
    difficulty: Difficulty.ADVANCED,
    groomed: true,
    accessedByLifts: [{
      elevationGain: 400,
      id: "",
      status: "",
      capacity: 3,
      name: 'lift e'
    }],
    id: "5",
    name: "e"
  },
  {
    difficulty: Difficulty.EXPERT,
    groomed: false,
    accessedByLifts: [{
      elevationGain: 600,
      id: "",
      status: "",
      capacity: 3,
      name: 'lift e'
    }],
    id: "6",
    name: "f"
  },
];

describe('filterTrails', () => {
  it('should filter trails by difficulty', () => {
    const options: TrailFilterOptions = {
      difficulty: ['beginner'],
      groomed: {
        groomed: false,
        ungroomed: false
      },
      elevationGain: 0
    };
    const result = filterTrails(trails, options);
    expect(result).toHaveLength(2);
    result.forEach((r) => expect(r.difficulty).toBe(Difficulty.BEGINNER));
  });

  it('should filter trails by groomed state', () => {
    const options: TrailFilterOptions = {
      groomed: {
        groomed: true,
        ungroomed: false
      },
      difficulty: [],
      elevationGain: 0
    };
    const result = filterTrails(trails, options);
    expect(result).toHaveLength(4);
    result.forEach((r) => expect(r.groomed).toBe(true));
  });

  it('should filter trails by elevation gain', () => {
    const options: TrailFilterOptions = {
      elevationGain: 400,
      difficulty: [],
      groomed: {
        groomed: false,
        ungroomed: false
      }
    };
    const result = filterTrails(trails, options);
    expect(result).toHaveLength(4);
    result.forEach((r) => r.accessedByLifts.forEach((lift) => expect(lift.elevationGain).toBeGreaterThanOrEqual(options.elevationGain)));
  });

  it('should handle empty options', () => {
    const options: TrailFilterOptions = {
      difficulty: [],
      groomed: {
        groomed: false,
        ungroomed: false
      },
      elevationGain: 0
    };
    const result = filterTrails(trails, options);
    expect(result).toEqual(trails);
  });

  it('should handle mixed options', () => {
    const options: TrailFilterOptions = {
      difficulty: ['beginner'],
      groomed: {
        groomed: true,
        ungroomed: false
      },
      elevationGain: 500 };
    const result = filterTrails(trails, options);
    expect(result).toHaveLength(1);
    result.forEach((r) => expect(r.difficulty).toBe(Difficulty.BEGINNER));
    result.forEach((r) => expect(r.groomed).toBe(true));
    result.forEach((r) => r.accessedByLifts.forEach((lift) => expect(lift.elevationGain).toBeGreaterThanOrEqual(options.elevationGain)));
  });
});
