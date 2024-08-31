import { Difficulty } from "./Difficulty";

export interface Lift {
  id: string;
  name: string;
  elevationGain: number;
  status: string;
  capacity: number;
}
