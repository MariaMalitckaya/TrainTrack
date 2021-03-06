import React from "react";
import { Link } from "react-router-dom";
import { formatDistance, getShortId } from "../format.js";
import { Row, Col } from "./Utilities.jsx";

export const Leaderboard = ({ data }) => {
  if (!data) return null;

  const userNames = new Map(data.userNames.map(v => [v.userId, v.name]));
  return (
    <div className="leaderboard p-4">
      <h3 className="text-center pt-0">Leaderboard</h3>
      <p className="text-center">Bringing our planet back on track</p>
      <div className="leaderboard-entries">
        {data.leaderboard.map(({ userId, distance }, i) => (
          <Row key={userId} className="my-2 justify-content-center">
            <Col className="col-1">{i + 1}.</Col>
            <Col className="col-6">
              <Link to={`/${getShortId(userId)}`}>
                {userNames.get(userId) || ""}
              </Link>
            </Col>
            <Col className="col-4">{formatDistance(distance)}</Col>
          </Row>
        ))}
      </div>
    </div>
  );
};
