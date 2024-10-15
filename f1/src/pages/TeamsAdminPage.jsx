import TeamsList from "../components/teams/TeamsList";
import AddTeams from "../components/teams/AddTeams";
import EditTeams from "../components/teams/EditTeams";

// Page component for managing the teams, including adding, editing, and listing teams.
const TeamsAdminPage = () => {
  return (
    <>
      <AddTeams />
      <EditTeams />
      <TeamsList />
    </>
  );
};

export default TeamsAdminPage;
