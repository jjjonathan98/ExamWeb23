namespace f1API.Controllers;

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using f1API.Contexts;
using f1API.Models;
using System.Net.Http;
using System.Threading.Tasks;

/*
  API Controller for handling driver-related operations, such as retrieving, adding, updating, and deleting drivers.
  It also handles the deletion of associated images when a driver is deleted, through the ImageUploadController.
*/

[ApiController]
[Route("api/[controller]")]
public class DriversController : ControllerBase
{
    private readonly F1Context f1Context;
    private readonly HttpClient _httpClient;

    // Constructor for the DriversController class, which initializes the F1Context(DbContext) and HttpClient instances.
    public DriversController(F1Context _f1Context, HttpClient httpClient )
    {
        f1Context = _f1Context;
        _httpClient = httpClient;
    }

    // Retrieves all drivers from the database and returns them as a list.
    [HttpGet]
    public async Task<ActionResult<List<Drivers>>> Get()
    {
        try
        {
            List<Drivers> drivers = await f1Context.Drivers.ToListAsync();
            return Ok(drivers);
        }
        catch 
        {
            return StatusCode(500, "An error occured while processing your request to get the drivers");
        } 
    }

    // Retrieves a specific driver by their id from the database.
    [HttpGet("{id}")]
    public async Task<ActionResult<Drivers>> Get(int id)
    {
        try
        {
            Drivers? drivers = await f1Context.Drivers.FindAsync(id);
            if (drivers != null)
            {
                return Ok(drivers);
            }
            else
            {
                return NotFound("No driver with this id found");
            }
        }
        catch
        {
            return StatusCode(500, "An error occured while processing your request");
        }
    }

    // Retrieves drivers by their nationality from the database.
    [HttpGet]
    [Route("[action]/{nationality}")]
    public async Task<ActionResult<Drivers>> GetByNationality(string nationality)
    {
        try
        {
            var drivers = await f1Context.Drivers
                .Where(d => d.Nationality == nationality)
                .ToListAsync();

            if (drivers.Count != 0)
            {
                return Ok(drivers);
            }
            else 
            {
                return NotFound($"No drivers with the nationality '{nationality}' found");
            }
        }
            catch
            {
                return StatusCode(500, "An error occured while processing your request");
            }
        
        }
    

    // Adds a new driver.
    [HttpPost]
    public async Task<IActionResult> Post(Drivers newDrivers)
    {
        try
        {
            f1Context.Drivers.Add(newDrivers);
            await f1Context.SaveChangesAsync();

            return Ok($"Driver {newDrivers.Name} added");
        }
        catch
        {
            return StatusCode(500, "An error occured while processing your request to add a new driver");
        }
    }


    // Updates an existing driver.
    [HttpPut]
    public async Task<IActionResult> Put(Drivers updatedDrivers)
    {
        try
        {
            f1Context.Entry(updatedDrivers).State = EntityState.Modified;
            await f1Context.SaveChangesAsync();
            return NoContent();
        }
        catch
        {
            return StatusCode(500,"An error occured while processing your request to update the driver");
        }
    }


    // Deletes a driver and their associated image by ther id.
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        try
        {
           Drivers? driver = await f1Context.Drivers.FindAsync(id);

            if (driver == null)
            {
                return NotFound($"No driver with id {id} found");
            }

            var baseUrl = $"{Request.Scheme}://{Request.Host}";
            var response = await _httpClient.DeleteAsync($"{baseUrl}/api/imageupload/{driver.Image}");

            if (!response.IsSuccessStatusCode)
            {
                return StatusCode(500, "Failed to delete image");
            }

            f1Context.Drivers.Remove(driver);
            await f1Context.SaveChangesAsync();

            return Ok($"Driver: {driver.Name} has been deleted");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error deleting driver: {ex.Message}");
            return StatusCode(500, $"Error occured: {ex.Message}");
        }
    }
}