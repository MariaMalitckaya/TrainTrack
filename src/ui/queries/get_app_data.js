import { gql } from "apollo-boost";

export const GET_APP_DATA = gql`
  query GetAppData {
    userNames {
      userId
      name
    }
    leaderboard {
      userId
      distance
    }
    statistics {
      trips
      distance
    }
    lastTrips {
      origin {
        displayName
        latitude
        longitude
      }
      destination {
        displayName
        latitude
        longitude
      }
      timestamp
      distance
      path
    }
  }
`;
