/*
  Description: Interface that defines the structure for the Teams entity. 
  This interface outlines the properties that must be implemented for a Team object, 
  such as Id, Manufacturer, Team name, Driver1, and Driver2.
*/

namespace f1API.Interfaces;

public interface ITeams
{
    int Id { get; set; }
    string? Manufacturer { get; set; }
    string? Team { get; set; }
    string? Driver1 { get; set; }
    string? Driver2 { get; set; }

}