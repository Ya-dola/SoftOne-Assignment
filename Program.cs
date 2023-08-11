using Microsoft.Data.SqlClient;

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

// try
// {
//     // Table would be created ahead of time in production
//     using var conn = new SqlConnection(connectionString);
//     conn.Open();
//
//     var command = new SqlCommand(
//         "CREATE TABLE Persons (ID int NOT NULL PRIMARY KEY IDENTITY, FirstName varchar(255), LastName varchar(255));",
//         conn);
//     using SqlDataReader reader = command.ExecuteReader();
// }
// catch (Exception e)
// {
//     // Table may already exist
//     Console.WriteLine(e.Message);
// }

app.MapGet("/Student", () =>
    {
        var rows = new List<string>();

        using var conn = new SqlConnection(connectionString);
        conn.Open();

        var command = new SqlCommand("SELECT * FROM students", conn);
        using SqlDataReader reader = command.ExecuteReader();

        if (reader.HasRows)
        {
            while (reader.Read())
            {
                rows.Add($"{reader.GetString(0)}, {reader.GetString(1)}, {reader.GetString(2)}");
            }
        }

        return rows;
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
