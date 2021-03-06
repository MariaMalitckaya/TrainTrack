import React from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import trainIcon from "../../static/trainIcon.png";
import { formatDistance, formatTimestamp } from "../format";
import {
  convertTripsToPaths,
  addTripsToMap,
  initializeMap
} from "../../MapHelpers";

const DELETE_TRIP = gql`
  mutation deleteTrip($id: ID!) {
    deleteTrip(id: $id)
  }
`;

const TripRow = ({
  _id,
  origin,
  destination,
  timestamp,
  distance,
  deleteTrip,
  refetch,
  refetchAppData,
  isMe
}) => (
  <div>
    <div className="px-2 d-inline-flex">
      <p className="px-2">{origin.displayName.slice(0, 20)}</p>
      <img src={trainIcon} alt="Train Icon" className="trip-icon my-auto" />
      <p className="my-auto px-2">{destination.displayName.slice(0, 20)}</p>
    </div>
    <div className="px-2 d-inline-flex">
      <p className="my-auto px-2">{formatTimestamp(timestamp)}</p>
      <p className="my-auto px-2">{formatDistance(distance)}</p>
      {isMe && (
        <button
          className="button-remove my-auto"
          type="button"
          onClick={async () => {
            await deleteTrip({ variables: { id: _id } });
            const { data } = await refetch();
            refetchAppData();
            initializeMap();
            addTripsToMap(convertTripsToPaths(data.userTrips));
          }}
        >
          <i className="fa fa-trash" />
        </button>
      )}
    </div>
    <hr className="mx-auto trip-divider" />
  </div>
);

export const Trips = ({ name, trips, refetch, refetchAppData, isMe }) => {
  const [deleteTrip] = useMutation(DELETE_TRIP);
  return (
    <div className="trip-card py-4">
      <h1>{`${name}’s trips`}</h1>
      <div>
        <hr className="mx-auto trip-divider" />
        {trips.map((trip, i) => (
          <TripRow
            {...trip}
            // eslint-disable-next-line react/no-array-index-key
            key={`${trip.timestamp}-${i}`}
            deleteTrip={deleteTrip}
            refetch={refetch}
            refetchAppData={refetchAppData}
            isMe={isMe}
          />
        ))}
      </div>
    </div>
  );
};
