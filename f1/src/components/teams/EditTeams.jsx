import { useContext, useState } from "react";
import { TeamsContext } from "../../contexts/TeamsContext";

// The EditTeams component is used to edit a team. It uses the TeamsContext to get the getById and editTeams functions.
const EditTeams = () => {
  const { getById, editTeams } = useContext(TeamsContext);

  const [id, setId] = useState("");
  const [teamsToUpdate, setTeamsToUpdate] = useState({ team: "" });

  // Function to handle the change of the input fields. It updates the teamsToUpdate state based on the input field name.
  const handleChange = (e) => {
    switch (e.currentTarget.name) {
      case "id":
        setId(e.currentTarget.value);
        break;
      case "team":
        setTeamsToUpdate({ ...teamsToUpdate, team: e.currentTarget.value });
        console.log("Går inn i team");
        break;
      case "manufacturer":
        setTeamsToUpdate({
          ...teamsToUpdate,
          manufacturer: e.currentTarget.value,
        });
        console.log("Går inn i manufacturer");
        break;
      case "driver1":
        setTeamsToUpdate({ ...teamsToUpdate, driver1: e.currentTarget.value });
        console.log("Går inn i driver1");
        break;
      case "driver2":
        setTeamsToUpdate({ ...teamsToUpdate, driver2: e.currentTarget.value });
        console.log("Går inn i driver2");
        break;
      case "image":
        setTeamsToUpdate({ ...teamsToUpdate, image: e.currentTarget.value });
        console.log("Går inn i image");
        break;
    }
  };

  // Function to get the team by ID from the context.
  const getByIdFromContext = async () => {
    const teamsFromContext = await getById(id);
    setTeamsToUpdate(teamsFromContext);
    console.log(teamsFromContext);
  };

  const saveChanges = () => {
    editTeams(teamsToUpdate);
  };

  return (
    <section className="container p-3 d-flex justify-content-center">
      <div className="card bg-danger p-3" style={{ maxWidth: "400px" }}>
        <h3 className="mb-3 text-light">Edit team</h3>
        <div className="mb-3">
          <input
            onChange={handleChange}
            name="id"
            value={id}
            type="text"
            className="form-label mb-3 form-control"
            placeholder="Team-ID"
          />
          <input
            onClick={getByIdFromContext}
            type="button"
            value="Get by Team-ID"
            className="btn btn-warning"
          />
        </div>
        <br />
        <div className="mb-3">
          <input
            onChange={handleChange}
            name="team"
            value={teamsToUpdate.name}
            type="text"
            className="form-control mb-3"
            placeholder="Team name"
          />

          <input
            onChange={handleChange}
            name="manufacturer"
            value={teamsToUpdate.name}
            type="text"
            className="form-control mb-3"
            placeholder="Manufacturer"
          />

          <input
            onChange={handleChange}
            name="driver1"
            value={teamsToUpdate.name}
            type="text"
            className="form-control mb-3"
            placeholder="Driver 1"
          />

          <input
            onChange={handleChange}
            name="driver2"
            value={teamsToUpdate.name}
            type="text"
            className="form-control mb-3"
            placeholder="Driver 2"
          />
        </div>
        <input
          onClick={saveChanges}
          type="button"
          value="Save changes"
          className="btn btn-success"
        />
      </div>
    </section>
  );
};

export default EditTeams;
