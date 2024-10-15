/*
Model class for the Drivers entity that implements the IDrivers interface.
This class maps to the Drivers table in the database and defines the structure of a driver.
*/

namespace f1API.Models;

using f1API.Interfaces;

public class Drivers : IDrivers
{
    public int Id { get; set; }
    public string? Name { get; set; }
    public int? Age { get; set; }
    public string? Nationality { get; set; }
    public string? Image { get; set; }
}
