using Microsoft.Data.SqlClient;
using SoftOne_Assignment;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddControllersWithViews();

var app = builder.Build();

// For production scenarios, consider keeping Swagger configurations behind the environment check
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseRouting();

string connectionString = app.Configuration.GetConnectionString("AZURE_SQL_CONNECTIONSTRING")!;

app.MapGet("/Student", () =>
    {
        var students = new List<Student>();

        using var conn = new SqlConnection(connectionString);
        conn.Open();

        var command = new SqlCommand("SELECT * FROM students", conn);
        using SqlDataReader reader = command.ExecuteReader();

        if (reader.HasRows)
        {
            while (reader.Read())
            {
                var values = new Object[reader.FieldCount];
                var fieldCount = reader.GetValues(values);
                students.Add(new Student(values));

                // Console.WriteLine($"ProfileImg: {values[7]}");
            }
        }

        return students;
    })
    .WithName("GetStudents")
    .WithOpenApi();

// app.MapPost("/Person", (Person person) =>
//     {
//         using var conn = new SqlConnection(connectionString);
//         conn.Open();
//
//         var command = new SqlCommand(
//             "INSERT INTO Persons (firstName, lastName) VALUES (@firstName, @lastName)",
//             conn);
//
//         command.Parameters.Clear();
//         command.Parameters.AddWithValue("@firstName", person.FirstName);
//         command.Parameters.AddWithValue("@lastName", person.LastName);
//
//         using SqlDataReader reader = command.ExecuteReader();
//     })
//     .WithName("CreatePerson")
//     .WithOpenApi();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

app.Run();
