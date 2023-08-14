// using System.IO;
// using Microsoft.AspNetCore.Mvc;
// using Microsoft.Extensions.Configuration;
//
// namespace SoftOne_Assignment.Controllers
// {
//     [Route("[controller]")]
//     [ApiController]
//     public class StudentController : ControllerBase
//     {
//         // private readonly IConfiguration _configuration;
//
//         // public StudentController(IConfiguration configuration)
//         // {
//         //     _configuration = configuration;
//         // }
//
//         [HttpGet("profileimage/{nic}")]
//         public IActionResult GetProfileImage(string nic)
//         {
//             // Construct the path to the processed image based on the provided NIC
//             var processedImagePath = $"path/to/processed/{nic}.jpg";
//
//             // Check if the processed image file exists
//             if (System.IO.File.Exists(processedImagePath))
//             {
//                 // Read the image file into a byte array
//                 var imageData = System.IO.File.ReadAllBytes(processedImagePath);
//
//                 // Return the image data with appropriate content type
//                 return File(imageData, "image/jpeg");
//             }
//             
//             Console.WriteLine("IN NOT");
//
//             // If the image doesn't exist, return a placeholder image or an error response
//             // Example: return File("path/to/placeholder.jpg", "image/jpeg");
//             return NotFound();
//         }
//     }
// }
