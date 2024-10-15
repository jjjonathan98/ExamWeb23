import { useEffect, useState } from "react";
import TeamsService from "../../services/TeamsService";
import "bootstrap/dist/css/bootstrap.min.css";
import UserFeedback from "../shared/UserFeedback";

/*  AddTeams use a similar structure as AddDrivers, 
    but it doesn't use context to create the new team.
    Instead, it uses the TeamsService directly to create the new team.
    This is a good approach for small applications, but for larger applications,
    it's better to use context for global state management.
*/

// Add new team to the database.
const AddTeams = () => {
  const [team, setTeam] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [driver1, setDriver1] = useState("");
  const [driver2, setDriver2] = useState("");
  const [image, setImage] = useState(null);
  const [userFeedback, setUserFeedback] = useState("");

  // sets the corresponding state with the current value of the input field
  const handleChange = (e) => {
    const team = e.currentTarget.name;

    switch (team) {
      case "team":
        setTeam(e.currentTarget.value);
        break;
      case "manufacturer":
        setManufacturer(e.currentTarget.value);
        break;
      case "driver1":
        setDriver1(e.currentTarget.value);
        break;
      case "driver2":
        setDriver2(e.currentTarget.value);
        break;
      case "image":
        setImage(e.currentTarget.files[0]);
        break;
    }
  };

  // If all fields are filled, save the new team to the database
  const saveTeam = () => {
    if (!team || !manufacturer || !driver1 || !driver2 || !image) {
      setUserFeedback(
        "All the fields, including image are required to register a new team!"
      );

      setTimeout(() => setUserFeedback(""), 4000); // removes the feedback message after 4 seconds
      return;
    }

    const newTeams = {
      team: team,
      manufacturer: manufacturer,
      driver1: driver1,
      driver2: driver2,
      image: image.name,
    };

    // Calls the postTeams function from TeamsService to save the new team to the database
    TeamsService.postTeams(newTeams, image);
    console.log(newTeams, image);
  };

  return (
    <section className="container p-3 d-flex justify-content-center">
      <div className="card bg-dark p-3" style={{ maxWidth: "400px" }}>
        <div className="mb-3">
          <label htmlFor="team" className="form-label text-light">
            Team
          </label>
          <input
            name="team"
            onChange={handleChange}
            type="text"
            className="form-control"
            placeholder="Enter name of new team"
            value={team}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="manufacturer" className="form-label text-light">
            Manufacturer
          </label>
          <input
            name="manufacturer"
            onChange={handleChange}
            type="text"
            className="form-control"
            placeholder="Enter manufacturer for the team"
            value={manufacturer}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="driver1" className="form-label text-light">
            Driver 1
          </label>
          <input
            name="driver1"
            onChange={handleChange}
            type="text"
            className="form-control"
            placeholder="Enter first driver of new team"
            value={driver1}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="driver2" className="form-label text-light">
            Driver 2
          </label>
          <input
            name="driver2"
            onChange={handleChange}
            type="text"
            className="form-control"
            placeholder="Enter second driver of new team"
            value={driver2}
          />
        </div>
        <hr />
        <div className="mb-3">
          <label htmlFor="image" className="form-label text-light">
            Image
          </label>
          <input
            name="image"
            onChange={handleChange}
            type="file"
            className="form-control-file btn btn-outline-primary"
            style={{ width: "100%" }}
          />
        </div>
        <button
          type="button"
          className="btn btn-primary mb-3"
          onClick={saveTeam}
        >
          Add Team
        </button>
        <UserFeedback
          message={userFeedback}
          type={
            userFeedback.toLowerCase().includes("required")
              ? "error"
              : "success"
          }
        />
      </div>
    </section>
  );
};

export default AddTeams;
