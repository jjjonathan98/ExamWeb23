import React from "react";
import { IMAGE_URL } from "../../services/ImageService";

// The DriversItem component is used to display a driver. It receives the driver data as props and displays it in a card.
const DriversItem = ({ id, name, age, nationality, image }) => {
  return (
    <article className="col-12 col-sm-6 col-md-4 col-lg-3">
      <div className="card h-100 bg-warning">
        <img className="card-img-top" src={`${IMAGE_URL}${image}`} alt="" />
        <div className="card-body">
          <h3
            className="card-title text-center"
            style={{ fontSize: name.length > 20 ? "1rem" : "1.5rem " }}
          >
            {name}
          </h3>
          <p className="card-text">Id: {id}</p>
          <p className="card-text">Age: {age}</p>
          <p className="card-text">Nationality: {nationality}</p>
        </div>
      </div>
    </article>
  );
};

export default DriversItem;
