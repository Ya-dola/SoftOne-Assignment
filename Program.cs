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

app.MapPost("/Student/{nicSelected}", async (HttpRequest request, string nicSelected) =>
    {
        await using var conn = new SqlConnection(connectionString);
        conn.Open();

        var command = new SqlCommand(
            "UPDATE students SET firstName=@firstName, lastName=@lastName, dateOfBirth=@dateOfBirth, email=@email, mobile=@mobile, address=@address, profileImg=@profileImg WHERE nic=@nic;",
            conn);

        command.Parameters.AddWithValue("@nic", nicSelected);
        command.Parameters.AddWithValue("@firstName", request.Form["firstName"]);
        command.Parameters.AddWithValue("@lastName", request.Form["lastName"]);
        command.Parameters.AddWithValue("@dateOfBirth", request.Form["dateOfBirth"]);
        command.Parameters.AddWithValue("@email", request.Form["email"]);
        command.Parameters.AddWithValue("@mobile", request.Form["mobile"]);
        command.Parameters.AddWithValue("@address", request.Form["address"]);

        var uploadedFile = request.Form.Files["profileImg"];
        if (uploadedFile is { Length: > 0 })
        {
            using var memoryStream = new MemoryStream();
            await uploadedFile.CopyToAsync(memoryStream);
            command.Parameters.AddWithValue("@profileImg", memoryStream.ToArray());
        }
        else
            command.Parameters.AddWithValue("@profileImg", DBNull.Value);

        await using SqlDataReader reader = command.ExecuteReader();
    })
    .WithName("UpdateStudent")
    .WithOpenApi();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

app.Run();
