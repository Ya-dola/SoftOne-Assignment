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
                var values = new object[reader.FieldCount];
                var fieldCount = reader.GetValues(values);
                students.Add(new Student(values));

                // Console.WriteLine($"ProfileImg: {values[7]}");
            }
        }

        return students;
    })
    .WithName("GetStudents")
    .WithOpenApi();

app.MapPost("/Student/{nicSelected}", (Student student, string nicSelected) =>
    {
        using var conn = new SqlConnection(connectionString);
        conn.Open();

        var command = new SqlCommand(
            "UPDATE students SET firstName=@firstName, lastName=@lastName, dateOfBirth=@dateOfBirth, email=@email, mobile=@mobile, address=@address, profileImg=@profileImg WHERE nic=@nic",
            conn);

        command.Parameters.AddWithValue("@nic", nicSelected);
        command.Parameters.AddWithValue("@firstName", student.FirstName);
        command.Parameters.AddWithValue("@lastName", student.LastName);
        command.Parameters.AddWithValue("@dateOfBirth", student.DateOfBirth);
        command.Parameters.AddWithValue("@email", student.Email);
        command.Parameters.AddWithValue("@mobile", student.Mobile);
        command.Parameters.AddWithValue("@address", student.Address);
        command.Parameters.AddWithValue("@profileImg", student.ProfileImg);

        using SqlDataReader reader = command.ExecuteReader();
    })
    .WithName("UpdateStudent")
    .WithOpenApi();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

app.Run();
