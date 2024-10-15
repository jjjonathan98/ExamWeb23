import React, { useContext, useState, useEffect } from "react";
import { DriversContext } from "../../contexts/DriversContext";
import DriversService from "../../services/DriversService";
import UserFeedback from "../shared/UserFeedback";
import "bootstrap/dist/css/bootstrap.min.css";

// The EditDrivers component is used to edit a driver. It uses the DriversContext to get the getById and editDrivers functions.
const EditDrivers = () => {
  const { getById, editDrivers } = useContext(DriversContext);

  const [id, setId] = useState("");
  const [userFeedback, setUserFeedback] = useState("");
  const [driversToUpdate, setDriversToUpdate] = useState({
    name: "",
    age: "",
    nationality: "",
    image: null,
  });

  // useEffect hook that runs when the id changes. It calls the getByIdFromContext function.
  useEffect(() => {
    if (id) {
      getByIdFromContext();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDriversToUpdate((prevState) => ({ ...prevState, [name]: value }));
  };

  // Function to handle the image change. It uploads the image to the server and updates the image path in the driversToUpdate state.
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await DriversService.uploadImage(formData);
        const updatedImagePath = response.data;

        setDriversToUpdate((prevState) => ({
          ...prevState,
          image: updatedImagePath,
        }));
      } catch (error) {
        console.error("Failed to upload image:", error);
        setUserFeedback("Failed to upload image. Please try again.");
        setTimeout(() => setUserFeedback(""), 4000);
      }
    }
  };

  // Function to get the driver by ID from the context.
  const getByIdFromContext = async () => {
    try {
      const driver = await getById(id);
      if (driver) {
        setDriversToUpdate(driver);
      } else {
        setUserFeedback("No driver found with the given ID.");
        setTimeout(() => setUserFeedback(""), 4000);
      }
    } catch (error) {
      console.error("Error fetching driver:", error);
      setUserFeedback("Error fetching driver details.");
      setTimeout(() => setUserFeedback(""), 4000);
    }
  };

  // Function to save the changes made to the driver if certain conditions are met.
  const saveChanges = async () => {
    if (!id) {
      setUserFeedback("ID is required.");
      setTimeout(() => setUserFeedback(""), 4000);
      return; // stops the function if the ID is not filled
    }

    if (
      !driversToUpdate.name &&
      !driversToUpdate.age &&
      !driversToUpdate.nationality &&
      !driversToUpdate.image
    ) {
      setUserFeedback(
        "ID and atleast ONE of the fields, including image are required to be filled to edit a driver!"
      );

      setTimeout(() => setUserFeedback(""), 4000); // removes the feedback message aftre 3 seconds
      return;
    }
    try {
      await editDrivers(driversToUpdate);
      setUserFeedback("Driver edited successfully.");
      setTimeout(() => setUserFeedback(""), 4000);

      setDriversToUpdate({
        name: "",
        age: "",
        nationality: "",
        image: null,
      });
    } catch (error) {
      console.error("Failed to update driver:", error);
      setUserFeedback("Failed to update driver. Please try again.");
      setTimeout(() => setUserFeedback(""), 4000);
    }
  };

  return (
    <section className="container p-3 d-flex justify-content-center">
      <div className="card bg-danger p-3" style={{ maxWidth: "400px" }}>
        <h3 className="mb-3 text-light">Edit driver</h3>
        <div className="mb-3">
          <div className="mb-3">
            <label htmlFor="name" className="form-label text-light">
              Enter ID
            </label>
            <br />
            <input
              onChange={(e) => setId(e.target.value)}
              name="id"
              value={id}
              type="text"
              placeholder="Enter ID of driver to edit"
              className="form-label mb-3 form-control"
            />
          </div>
          <div>
            <label className="form-label text-light">Name</label>
            <input
              onChange={handleChange}
              name="name"
              value={driversToUpdate.name}
              type="text"
              placeholder="Name"
              className="form-control"
            />
          </div>
        </div>
        <div>
          <label className="text-light">Age</label>
          <input
            onChange={handleChange}
            name="age"
            value={driversToUpdate.age}
            type="text"
            placeholder="Age"
            className="form-control mb-3"
          />
        </div>
        <div>
          <label className="text-light">Nationality</label>
          <input
            onChange={handleChange}
            name="nationality"
            value={driversToUpdate.nationality}
            type="text"
            placeholder="Nationality"
            className="form-control mb-3"
          />
        </div>
        <div>
          <label className="text-light">Image</label>
          <input
            onChange={handleImageChange}
            name="image"
            type="file"
            className="form-control mb-3"
          />
        </div>
        <input
          onClick={saveChanges}
          type="button"
          value="Save changes"
          className="btn btn-success mb-2"
        />
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

export default EditDrivers;
