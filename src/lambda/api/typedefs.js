const { gql } = require("apollo-server-lambda");

module.exports = gql`
  type Location {
    latitude: Float
    longitude: Float
    displayName: String
  }

  type Trip {
    _id: ID
    userId: ID
    origin: Location
    destination: Location
    timestamp: Int
    distance: Int
    path: String
  }

  type UserProfile {
    userId: ID
    name: String
    city: Location
    country: String
  }

  type UserName {
    userId: ID
    name: String
  }

  type LeaderboardEntry {
    userId: ID
    distance: Int
  }

  type Statistics {
    trips: Int
    distance: Int
  }

  type Query {
    reloadFixtures: String
    hello: String
    lastTrips: [Trip]
    userNames: [UserName]
    leaderboard: [LeaderboardEntry]
    statistics: Statistics
    userProfile(userId: ID!): UserProfile
    userTrips(userId: ID!): [Trip]
    userStatistics(userId: ID!): Statistics
  }

  input LocationInput {
    latitude: Float
    longitude: Float
    displayName: String
  }

  input TripInput {
    origin: LocationInput
    destination: LocationInput
    timestamp: Int
    path: String
  }

  type Mutation {
    addTrip(trip: TripInput!): Trip
    registerUser: Boolean
    deleteTrip(id: ID!): ID
  }
`;
