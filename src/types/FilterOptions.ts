export interface TrailFilterOptions {
  difficulty: string[]
  groomed: {
    groomed: boolean;
    ungroomed: boolean;
  };
  elevationGain: number;
}
