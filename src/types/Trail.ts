import { Difficulty } from "./Difficulty";
import { Lift } from "./Lift";

export interface Trail {
  id: string;
  name: string;
  difficulty: Difficulty;
  groomed: boolean;
  accessedByLifts: Lift[];
}
