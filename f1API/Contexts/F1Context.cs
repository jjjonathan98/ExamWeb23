/*
  F1Context is the Entity Framework Core DbContext for the application.
  It defines the database context and provides access to the Drivers and Teams tables (entities) in the database.
  This class is used to query and save instances of Drivers and Teams in the database.
*/

namespace f1API.Contexts;

using f1API.Models;
using Microsoft.EntityFrameworkCore;

public class F1Context : DbContext
{
    public F1Context(DbContextOptions<F1Context> options):base(options){}

    public DbSet<Drivers> Drivers { get; set; }
    
    public DbSet<Teams> Teams { get; set; }
}

