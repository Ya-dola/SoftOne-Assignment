// using Microsoft.AspNetCore.Mvc;
//
// namespace SoftOne_Assignment.Controllers;
//
// [Route("api/[controller]")]
// [ApiController]
// public class StudentController : ControllerBase
// {
//     private readonly string _connectionString =
//         ConfigurationManager.ConnectionStrings["MyDbConnection"].ConnectionString;
//
//     [HttpGet]
//     public IActionResult GetData()
//     {
//         using (SqlConnection connection = new SqlConnection(_connectionString))
//         {
//             connection.Open();
//
//             string query = "SELECT * FROM YourTable";
//             using (SqlCommand command = new SqlCommand(query, connection))
//             {
//                 using (SqlDataReader reader = command.ExecuteReader())
//                 {
//                     DataTable dataTable = new DataTable();
//                     dataTable.Load(reader);
//                     return Ok(dataTable);
//                 }
//             }
//         }
//     }
// }


