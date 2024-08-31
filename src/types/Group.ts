import { Difficulty } from "./Difficulty";
import { Trail } from "./Trail";

export interface GroupType {
  id: string;
  name: string;
  size: number;
  difficulty: Difficulty | '';
  groomStatus: string;
  elevationGain: number;
  numberOfRecommendedTrails: number;
  recommendedTrails: Trail[];
}
