namespace f1API.Controllers;

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using f1API.Contexts;
using f1API.Models;
using System.Net.Http;

/*
  API Controller for handling team-related operations, such as retrieving, adding, updating, and deleting teams.
  It also handles the deletion of associated images when a team is deleted, through the ImageUploadController.
*/

[ApiController]
[Route("api/[controller]")]
public class TeamsController : ControllerBase
{
    private readonly F1Context f1Context;
    private readonly HttpClient _httpClient;

    public TeamsController(F1Context _f1Context, HttpClient httpClient)
    {
        f1Context = _f1Context;
        _httpClient = httpClient;
    }

    // Retrieves all teams from the database and returns them as a list.
    [HttpGet]
    public async Task<ActionResult<List<Teams>>> Get()
    {
        try
        {
            List<Teams> teams = await f1Context.Teams.ToListAsync();
            return Ok(teams);  
        }
        catch
        {
            return StatusCode(500, "An error occured while processing your request to get the teams");
        }
    }

    // Retrieves a specific team by their id.
    [HttpGet("{id}")]
    public async Task<ActionResult<Teams>> Get(int id)
    {
        try
        {
            Teams? teams = await f1Context.Teams.FindAsync(id);
            if (teams != null)
            {
                return Ok(teams);
            }
            else 
            {
                return NotFound ($"No team with the id {id} found");
            }
        }
        catch
            {
                return StatusCode(500, "An error occured while processing your request");
            }
    }

    // Retrieves a specific team by their name.
    [HttpGet]
    [Route("[action]/{team}")]
    public async Task<ActionResult<Teams>> GetByTeam(string team)
    {
        try
        {
            var teams = await f1Context.Teams
                .Where(t => t.Team == team)
                .ToListAsync();
            
            if (teams.Count != 0)
            {
                return Ok(teams);
            }
            else
            {
                return NotFound($"No teams with the name '{team}' found");
            }
        }
        catch 
        {
            return StatusCode(500, "An error occured while processing your request");
        }
    }

    // Adds a new team.
    [HttpPost]
    public async Task<IActionResult> Post(Teams newTeams)
    {
        try
        {
            f1Context.Teams.Add(newTeams);
            await f1Context.SaveChangesAsync();

            return Ok($"Team with the id {newTeams.Team} has been updated");
        }
        catch
        {
            return StatusCode(500, "An error occured while processing your request to add a new team");
        }
    }


    // Updates an existing team.
     [HttpPut]
    public async Task<IActionResult> Put(Teams updatedTeams)
    {
        try
        {
            f1Context.Entry(updatedTeams).State = EntityState.Modified;
            await f1Context.SaveChangesAsync();

            return Ok($"The team {updatedTeams.Team} has been updated");
        }
        catch
        {
            return StatusCode(500, "An error occured while processing your request to update the team");
        }
    } 

    // Deletes a team and their associated image by their id.
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        try
        {
            Teams? teams = await f1Context.Teams.FindAsync(id);

            if (teams == null)
            {
               return NotFound($"No team with the id {id} found");
            }

            var baseUrl = $"{Request.Scheme}://{Request.Host}";
            var response = await _httpClient.DeleteAsync($"{baseUrl}/api/imageupload/{teams.Image}");

            if (!response.IsSuccessStatusCode)
            {
                return StatusCode(500, "Failed deleting team image");
            }

            f1Context.Teams.Remove(teams);
            await f1Context.SaveChangesAsync();

            return Ok($"Team with the id {teams.Team} has been deleted");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error deleting team: {ex.Message}");
            return StatusCode(500, $"Error occured: {ex.Message}");
        }
    }
}
