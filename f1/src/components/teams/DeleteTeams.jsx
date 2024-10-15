import { useState, useContext } from "react";
import { TeamsContext } from "../../contexts/TeamsContext";

// Handling of deleting a team the user inputs
const DeleteTeams = () => {
  const { deleteTeams } = useContext(TeamsContext);

  const [id, setId] = useState("");
  const [deleteStatus, setDeleteStatus] = useState("...");

  const handleChange = (e) => {
    setId(e.currentTarget.value);
  };

  const handleClick = async () => {
    try {
      const wentWell = await deleteTeams(id);
      if (wentWell === true) {
        setDeleteStatus("Team deleted!");
      } else {
        setDeleteStatus("Deletion failed...");
      }
      setTimeout(() => {
        setDeleteStatus("...");
      }, 2000);
    } catch (error) {
      setDeleteStatus("Deletion failed...");
    }
  };

  return (
    <section className="mb-3 container d-flex justify-content-center">
      <div className="card bg-dark p-3 m-5" style={{ maxWidth: "400px" }}>
        <h3 className="text-light m-2">Delete a team</h3>
        <div className="form-group m-2">
          <div className="d-flex justify-content-center">
            <input
              className="form-control form-control-sm narrower-input"
              id="id"
              name="id"
              value={id}
              onChange={handleChange}
              type="text"
              placeholder="Enter team ID"
            />
          </div>
          <small className="form-text m-2" style={{ color: "white" }}>
            {deleteStatus}
          </small>
        </div>
        <div className="justify-content-center">
          <button
            className="btn btn-danger narrow-button"
            onClick={handleClick}
          >
            Delete team
          </button>
        </div>
      </div>
    </section>
  );
};

export default DeleteTeams;
