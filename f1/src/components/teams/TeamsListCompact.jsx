import { useContext, useEffect } from "react";
import TeamsItemV2 from "./TeamsItemV2";
import { TeamsContext } from "../../contexts/TeamsContext";

// The TeamsListCompact component is used to display a list of teams in a compact format. It uses the TeamsItemV2 component to display each team.
const TeamsListCompact = () => {
  const { teams } = useContext(TeamsContext);

  const getTeamsJSX2 = () => {
    const teamsJSX2 = teams.map((_teams, i) => (
      <TeamsItemV2
        key={i}
        team={_teams.name}
        image={_teams.image}
        id={_teams.id}
      />
    ));
    return teamsJSX2;
  };

  return (
    <section className="card bg-dark p-3">
      <h3 className="text-light">Teams</h3>
      <div className="row row-cols-10">{getTeamsJSX2()}</div>
    </section>
  );
};

export default TeamsListCompact;
