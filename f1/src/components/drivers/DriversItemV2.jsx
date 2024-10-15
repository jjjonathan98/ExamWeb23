import React from "react";
import { IMAGE_URL } from "../../services/ImageService";

// This drivers item component displays a driver's name, image, id, age on a smaller card in the delete driver lsit.
const DriversItemV2 = ({ id, name, image }) => {
  return (
    <article className="col-6 col-sm-4 col-md-3 col-lg-2 pb-5">
      <div
        className="card h-100 bg-warning"
        style={{ transform: "scale(0.75)", margin: "0", padding: "0" }}
      >
        <img
          className="card-img-top"
          src={`${IMAGE_URL}${image}`}
          alt=""
          style={{ transform: "scale(1)", margin: "0", padding: "0" }}
        />
        <div
          className="card-body"
          style={{ transform: "scale(1)", margin: "0", padding: "0" }}
        >
          <h3 className="card-title text-center m-2">{name}</h3>
          <p className="card-text mb-2" style={{ fontSize: "1rem" }}>
            Id: {id}
          </p>
        </div>
      </div>
    </article>
  );
};

export default DriversItemV2;
