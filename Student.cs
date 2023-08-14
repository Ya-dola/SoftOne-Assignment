using System.Globalization;

namespace SoftOne_Assignment;

public class Student
{
    public Student(string? nic, string? firstName, string? lastName, DateTime dateOfBirth, string? email,
        string? mobile, string? address)
    {
        Nic = nic;
        FirstName = firstName;
        LastName = lastName;
        DateOfBirth = dateOfBirth;
        Email = email;
        Mobile = mobile;
        Address = address;
    }

    public Student(Object[] dbValues)
    {
        Nic = dbValues[0].ToString();
        FirstName = dbValues[1].ToString();
        LastName = dbValues[2].ToString();
        DateOfBirth = ParseDateTime(dbValues[3].ToString());
        Email = dbValues[4].ToString();
        Mobile = dbValues[5].ToString();
        Address = dbValues[6].ToString();
    }

    // NEEDED FOR POST TO WORK - DO NOT DELETE
    public Student()
    {
    }

    public string? Nic { get; set; }

    public string? FirstName { get; set; }

    public string? LastName { get; set; }

    public DateTime DateOfBirth { get; set; }

    public string? Email { get; set; }

    public string? Mobile { get; set; }

    public string? Address { get; set; }

    public static DateTime ParseDateTime(string? input)
    {
        const string format = "dd/MM/yyyy h:mm:ss tt";
        try
        {
            return DateTime.ParseExact(input, format, null);
        }
        catch (Exception e)
        {
            throw new ArgumentException($"The date string '{input}' is not in the correct format.", e);
        }
    }

    public static DateTime StringToDate(string? input)
    {
        try
        {
            return DateTime.ParseExact(input.Trim('"'), "yyyy-MM-dd", CultureInfo.InvariantCulture);
        }
        catch (Exception e)
        {
            throw new NullReferenceException($"The date string '{input}' is missing", e);
        }
    }
}
