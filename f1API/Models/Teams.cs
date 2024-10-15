/*
  Model class for the Teams entity that implements the ITeams interface.
  This class maps to the Teams table in the database and defines the structure of a team.
*/

namespace f1API.Models;

using f1API.Interfaces;

public class Teams : ITeams
{
    public int Id { get; set; }
    public string? Manufacturer { get; set; }
    public string? Image { get; set; }
    public string? Team { get; set; }
    public string? Driver1 { get; set; }
    public string? Driver2 { get; set; }
}