/*
  Interface to define the structure of the Team data used in the TeamsService.
  This interface ensures consistency when handling team data throughout the frontend.
*/
export interface ITeams {
  id?: number;
  manufacturer: string;
  team: string;
  image: string;
  driver1: string;
  driver2: string;
}
