import DeleteTeams from "../components/teams/DeleteTeams";
import TeamsListCompact from "../components/teams/TeamsListCompact";

// Page component for deleting teams and displaying a compact list of teams.
const DeleteTeamsPage = () => {
  return (
    <>
      <DeleteTeams />
      <TeamsListCompact />
    </>
  );
};

export default DeleteTeamsPage;
