namespace SoftOne_Assignment;

public class Student
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Mobile { get; set; }
    public string Email { get; set; }
    public string Nic { get; set; }

    public Student(string firstName, string lastName, string mobile, string email, string nic)
    {
        this.FirstName = firstName;
        this.LastName = lastName;
        this.Mobile = mobile;
        this.Email = email;
        this.Nic = nic;
    }
}
