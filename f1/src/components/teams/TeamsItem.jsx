import React from "react";
import { IMAGE_URL } from "../../services/ImageService";

// The TeamsItem component is used to display a team. It receives the team data as props and displays it in a card.
const TeamsItem = ({ id, manufacturer, team, image, driver1, driver2 }) => {
  return (
    <article className="col-12 col-sm-6 col-md-4 col-lg-3">
      <div className="card h-100 bg-warning">
        <img className="card-img-top" src={`${IMAGE_URL}${image}`} alt="" />
        <div className="card-body">
          <h5 className="card-title" style={{ fontSize: "2rem" }}>
            {team}
          </h5>
          <p className="card-text">Manufacturer: {manufacturer}</p>
          <p className="card-text">Driver 1: {driver1}</p>
          <p className="card-text">Driver 2: {driver2}</p>
          <p className="card-text mb-2" style={{ fontSize: "1rem" }}>
            Team-Id: {id}
          </p>
        </div>
      </div>
    </article>
  );
};

export default TeamsItem;
