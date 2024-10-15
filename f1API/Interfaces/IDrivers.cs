/*
  Description: Interface that defines the structure for the Drivers entity. 
  This interface outlines the properties that must be implemented for a Driver object, 
  such as Id, Name, Age, Nationality, and Image.
*/

namespace f1API.Interfaces;

public interface IDrivers
{
    int Id { get; set; }
    string? Name { get; set; }
    int? Age { get; set; }
    string? Nationality { get; set; }
    string? Image { get; set; }
}