import { useState, useContext } from "react";
import { DriversContext } from "../../contexts/DriversContext";
import UserFeedback from "../shared/UserFeedback";

// Handling of deleting a driver the user inputs
const DeleteDrivers = () => {
  const { deleteDrivers } = useContext(DriversContext);

  const [id, setId] = useState("");
  const [userFeedback, setUserFeedback] = useState("");

  const handleChange = (e) => {
    setId(e.currentTarget.value);
  };

  const handleClick = async () => {
    try {
      const deleteDriver = await deleteDrivers(id);
      if (deleteDriver !== null && deleteDriver != undefined) {
        setUserFeedback("Driver succsessfully deleted"); // If the driver is deleted, the user gets a success message
      }
    } catch (error) {
      setUserFeedback("Failed to delete driver", error);
    }
    setTimeout(() => setUserFeedback(""), 4000);
  };

  return (
    <section className="mb-3">
      <h3 className="text-light bg-dark bg-opacity-75 rounded w-25 d-block mx-auto">
        Delete a driver
      </h3>
      <div>
        <input
          onChange={handleChange}
          name="id"
          value={id}
          placeholder="ID of driver to delete"
          type="text"
        />
      </div>
      <input
        className="mt-2 text-dark"
        onClick={handleClick}
        type="button"
        value="Delete driver"
      />
      <UserFeedback
        message={userFeedback}
        type={
          userFeedback.toLowerCase().includes("Failed") ? "error" : "success"
        }
      />
    </section>
  );
};

export default DeleteDrivers;
