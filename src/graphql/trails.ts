import { gql } from "@apollo/client";

export const GET_ALL_TRAILS = gql`
  query GetAllTrails {
    allTrails {
      id,
      name,
      status,
      difficulty,
      groomed,
      accessedByLifts {
        id,
        name,
        status,
        capacity,
        night,
        elevationGain
      }
    }
  }
`;
