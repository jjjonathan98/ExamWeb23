import { useContext, useEffect, useState } from "react";
import TeamsItem from "./TeamsItem";
import { TeamsContext } from "../../contexts/TeamsContext";

// Teams list component displays all teams and a search input field to filter teams by team name.
const TeamsList = () => {
  const { teams } = useContext(TeamsContext);
  const [searchTeam, setSearchTeam] = useState("");

  const handleSearchTeam = (e) => {
    setSearchTeam(e.currentTarget.value.toLowerCase());
  };

  const getTeamsJSX = () => {
    const filteredTeams = teams.filter((teams) =>
      teams.team.toLowerCase().includes(searchTeam)
    );

    return filteredTeams.map((teams, i) => (
      <TeamsItem
        key={i}
        id={teams.id}
        manufacturer={teams.manufacturer}
        team={teams.team}
        image={teams.image}
        driver1={teams.driver1}
        driver2={teams.driver2}
      />
    ));
  };

  return (
    <section className="mb-5 mt-5 container">
      <div className="card bg-dark">
        <div className="card-body">
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by team name"
              onChange={handleSearchTeam}
            />
          </div>
          <h3 className="card-title text-light mb-4">Our teams</h3>
          <p className="text-light mb-3">Amount of teams: {teams.length}</p>
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-3">
            {getTeamsJSX()}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamsList;
