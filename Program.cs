using System.Data;
using ImageMagick;
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

var connectionString = app.Configuration.GetConnectionString("AZURE_SQL_CONNECTIONSTRING")!;

app.MapGet("/Student", () =>
    {
        var students = new List<Student>();

        using var conn = new SqlConnection(connectionString);
        conn.Open();

        var command = new SqlCommand("SELECT * FROM students", conn);
        using SqlDataReader reader = command.ExecuteReader();

        if (!reader.HasRows) return students;
        while (reader.Read())
        {
            var values = new object[reader.FieldCount];
            var fieldCount = reader.GetValues(values);
            students.Add(new Student(values));
        }

        return students;
    })
    .WithName("GetStudents")
    .WithOpenApi();

app.MapGet("/Student/GetProfileImage/{nic}", async (HttpContext context, string nic) =>
    {
        await using var conn = new SqlConnection(connectionString);
        conn.Open();

        var command = new SqlCommand(
            "SELECT ProfileImg FROM students WHERE NIC=@nic", conn);
        command.Parameters.AddWithValue("@nic", nic);

        await using SqlDataReader reader = command.ExecuteReader();

        if (reader.Read())
        {
            if (!reader.IsDBNull(reader.GetOrdinal("ProfileImg")))
            {
                byte[] imageData = (byte[])reader["ProfileImg"];

                // Determine the content type using Magick.NET - Allows for Various Img Types
                using var image = new MagickImage(imageData);
                string contentType = "image/" + image.Format.ToString().ToLower();
                context.Response.ContentType = contentType;

                await context.Response.Body.WriteAsync(imageData, 0, imageData.Length);
            }
            else
            {
                context.Response.StatusCode = 404; // Profile image not found
            }
        }
        else
        {
            context.Response.StatusCode = 404; // Student not found
        }
    })
    .WithName("GetProfileImage")
    .WithOpenApi();

app.MapPost("/Student/{nicSelected}", async (HttpContext context, string nicSelected) =>
    {
        var profileImg = context.Request.Form.Files["profileImg"];

        await using var conn = new SqlConnection(connectionString);
        conn.Open();

        var commandText = "UPDATE students " +
                          "SET firstName=@firstName, lastName=@lastName, " +
                          "dateOfBirth=@dateOfBirth, email=@email, mobile=@mobile, " +
                          "address=@address";

        if (profileImg != null) commandText += ", profileImg=@profileImg";

        commandText += " WHERE nic=@nic";

        var command = new SqlCommand(commandText, conn);

        command.Parameters.AddWithValue("@nic", nicSelected);
        command.Parameters.AddWithValue("@firstName",
            context.Request.Form["firstName"].ToString());
        command.Parameters.AddWithValue("@lastName",
            context.Request.Form["lastName"].ToString());
        command.Parameters.AddWithValue("@dateOfBirth",
            Student.StringToDate(context.Request.Form["dobString"].ToString()));
        command.Parameters.AddWithValue("@email",
            context.Request.Form["email"].ToString());
        command.Parameters.AddWithValue("@mobile",
            context.Request.Form["mobile"].ToString());
        command.Parameters.AddWithValue("@address",
            context.Request.Form["address"].ToString());

        if (profileImg != null)
        {
            using MemoryStream memoryStream = new MemoryStream();
            await profileImg.CopyToAsync(memoryStream);
            byte[] imageData = memoryStream.ToArray();

            // Update the database record with imageData
            SqlParameter profileImgParam = new SqlParameter("@profileImg", SqlDbType.VarBinary, -1)
            {
                Value = imageData
            };
            command.Parameters.Add(profileImgParam);
        }

        await using SqlDataReader reader = command.ExecuteReader();
    })
    .WithName("UpdateStudent")
    .WithOpenApi();

app.MapDelete("/Student/{nic}", async (HttpContext context, string nic) =>
    {
        await using var conn = new SqlConnection(connectionString);
        conn.Open();

        var command = new SqlCommand(
            "DELETE FROM students WHERE NIC=@nic",
            conn);
        command.Parameters.AddWithValue("@nic", nic);

        var rowsAffected = command.ExecuteNonQuery();
        context.Response.StatusCode = rowsAffected > 0
            ? 204 // No content
            : 404; // Student not found
    })
    .WithName("DeleteStudent")
    .WithOpenApi();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

app.Run();
