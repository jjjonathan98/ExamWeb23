namespace f1API.Controllers;

using Microsoft.AspNetCore.Mvc;

/*
  API Controller for handling image upload and deletion from the server.
  It stores images in a specific folder in the wwwroot directory, and removes them when requested.
*/

[ApiController]
[Route("api/[controller]")]
public class ImageUploadController : ControllerBase
{
    private readonly IWebHostEnvironment environment;

    // Constructor for the ImageUploadController class, which initializes the IWebHostEnvironment instance to access the servers file system.
    public ImageUploadController(IWebHostEnvironment _environment)
    {
        environment = _environment;
    }

    // Handles the uploading of images to the server.
    [HttpPost]
    public IActionResult PostImage(IFormFile file)
    {
        try
        {
            string webRootPath = environment.WebRootPath;
            string absolutePath = Path.Combine(webRootPath, "images", file.FileName);

            // Copy the uploaded image to the specified folder in the wwwroot directory.
            using(var fileStream = new FileStream(absolutePath, FileMode.Create))
            {
                file.CopyTo(fileStream);
            } 

            return Ok(file.FileName);
        }
        catch
        {
            return StatusCode(500, "An error occured while processing your request");
        }
    }
    

    // Handles the deletion of images from the server by file name.
    [HttpDelete("{fileName}")]
    public IActionResult DeleteImage(string fileName)
    {
        try 
        {
            string webRootPath = environment.WebRootPath;
            string imagePath = Path.Combine(webRootPath, "images", fileName);

        // Check if the image exists in the specified folder and delete it if found.
        if (System.IO.File.Exists(imagePath))
        {
            System.IO.File.Delete(imagePath);
            return Ok($"Image {fileName} deleted successfully");
        }
        else
        {
            return NotFound($"Image {fileName} not found");
        }
    }
    catch 
    {
        return StatusCode(500, "An error occured while trying to delete the image");
    }
}
}