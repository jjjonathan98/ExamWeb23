import { createContext, useState, useEffect } from "react";
import TeamsService from "../services/TeamsService";

// Create a context
export const TeamsContext = createContext(null);

// Create a provider component that will pass the teams context and functions down to all children
export const TeamsProvider = ({ children }) => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    getTeamsFromService();
  }, []);

  // Function to get all Teams from the API
  const getTeamsFromService = async () => {
    try {
      const teamsFromService = await TeamsService.getAll();
      setTeams(teamsFromService);
    } catch (error) {
      console.log(error);
    }
  };

  // Function to get a single team by ID
  const getById = async (id) => {
    const teamsToUpdate = await TeamsService.getById(id);
    return teamsToUpdate;
  };

  // Function to edit a team
  const editTeams = async (teamsToUpdate) => {
    await TeamsService.putTeams(teamsToUpdate);
    getTeamsFromService();
  };

  // Function to delete a team by ID
  const deleteTeams = async (id) => {
    try {
      const wentWell = await TeamsService.deleteTeams(id);
      return wentWell;
    } catch (error) {
      return error;
    }
  };

  // return the provider with the value of the state and functions
  return (
    <TeamsContext.Provider value={{ teams, getById, editTeams, deleteTeams }}>
      {children}
    </TeamsContext.Provider>
  );
};
