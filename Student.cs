namespace SoftOne_Assignment;

public class Student
{
    public Student(string? nic, string? firstName, string? lastName, DateTime dateOfBirth, string? email,
        string? mobile,
        string? address, byte[]? profileImg)
    {
        Nic = nic;
        FirstName = firstName;
        LastName = lastName;
        DateOfBirth = dateOfBirth;
        Email = email;
        Mobile = mobile;
        Address = address;
        ProfileImg = profileImg;
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
        // ProfileImg = dbValues[7].ToString();
    }

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

    public byte[]? ProfileImg { get; set; }

    public static DateTime ParseDateTime(string? input)
    {
        const string format = "dd/MM/yyyy h:mm:ss tt";
        try
        {
            DateTime parsedDateTime = DateTime.ParseExact(input, format, null);
            return parsedDateTime;
        }
        catch (Exception e)
        {
            throw new ArgumentException($"The date string '{input}' is not in the correct format.", e);
        }
    }
}
