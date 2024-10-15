import { useEffect, useState, useContext } from "react";
import { DriversContext } from "../../contexts/DriversContext";
import DriversService from "../../services/DriversService";
import UserFeedback from "../shared/UserFeedback";
import "bootstrap/dist/css/bootstrap.min.css";

/*  drivers use a similar structure as teams, 
    but it uses context to create the new driver.
    Instead of using service directly, 
    it uses the createDrivers function from DriversContext.

    Global state management is a better approach than using services directly 
    for scalability and bigger solutions.
*/

// Add new drivers to the database.
const AddDrivers = () => {
  const { createDrivers } = useContext(DriversContext);

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [nationality, setNationality] = useState("");
  const [image, setImage] = useState(null);
  const [userFeedback, setUserFeedback] = useState("");

  const handleChange = (e) => {
    const name = e.currentTarget.name;

    switch (name) {
      case "name":
        setName(e.currentTarget.value);
        break;
      case "age":
        setAge(e.currentTarget.value);
        break;
      case "nationality":
        setNationality(e.currentTarget.value);
        break;
      case "image":
        setImage(e.currentTarget.files[0]);
        break;
    }
  };

  // If all fields are filled, save the new driver to the database
  const saveDriver = () => {
    if (!name || !age || !nationality || !image) {
      setUserFeedback(
        "All the fields, including image are required to register a new driver!"
      );

      setTimeout(() => setUserFeedback(""), 4000); // removes the feedback message after 4 seconds
      return;
    }

    const newDrivers = {
      name: name,
      age: age,
      nationality: nationality,
      image: image.name,
    };

    // Uses createDrivers function from DriversContext to save the new driver to the database and clear input fields
    createDrivers(newDrivers, image)
      .then(() => {
        setUserFeedback("Driver added successfully.");

        setName("");
        setAge("");
        setNationality("");
        setImage(null);

        setTimeout(() => setUserFeedback(""), 4000);
      })
      .catch((error) => {
        console.error(error);
        setUserFeedback("Failed to add driver.");
        setTimeout(() => setUserFeedback(""), 4000);
      });
  };

  return (
    <section className="container p-3 d-flex justify-content-center">
      <div className="card bg-dark p-3" style={{ maxWidth: "400px" }}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label text-light">
            Name
          </label>
          <input
            name="name"
            onChange={handleChange}
            type="text"
            className="form-control"
            placeholder="Enter name of new driver"
            value={name}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="age" className="form-label text-light">
            Age
          </label>
          <input
            name="age"
            onChange={handleChange}
            type="text"
            className="form-control"
            placeholder="Enter age of new driver"
            value={age}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="nationality" className="form-label text-light">
            Nationality
          </label>
          <input
            name="nationality"
            onChange={handleChange}
            type="text"
            className="form-control"
            placeholder="Enter nationality of new driver"
            value={nationality}
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
          onClick={saveDriver}
        >
          Add Driver
        </button>
        <UserFeedback
          message={userFeedback}
          type={
            userFeedback.includes("Failed") || userFeedback.includes("required")
              ? "error"
              : "success"
          }
        />
      </div>
    </section>
  );
};

export default AddDrivers;
