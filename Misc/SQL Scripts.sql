-- CREATE TABLE students
-- (
--     NIC         VARCHAR(12) PRIMARY KEY,
--     FirstName   VARCHAR(100),
--     LastName    VARCHAR(100),
--     DateOfBirth DATE,
--     Email       VARCHAR(150),
--     Mobile      VARCHAR(15),
--     Address     VARCHAR(255),
--     ProfileImg  VARBINARY(MAX)
-- );


-- INSERT INTO students (NIC, FirstName, LastName, DateOfBirth, Email, Mobile, Address, ProfileImg)
-- VALUES ('123456789012', 'Ya', 'Dola', '2000-01-15', 'dola@example.com', '1234567890', '123 Main St', NULL),
--        ('234567890123', 'Nami', 'Swan', '1999-05-03', 'nami@example.com', '9876543210', '456 Elm St', NULL),
--        ('345678901234', 'Nico', 'Robin', '2001-02-28', 'robin@example.com', '5678901234', '789 Oak St', NULL);


-- Select * from students;

-- UPDATE students
-- SET firstName   = @firstName,
--     lastName    = @lastName,
--     dateOfBirth = @dateOfBirth,
--     email       = @email,
--     mobile      = @mobile,
--     address     = @address,
--     profileImg  = @profileImg
-- WHERE nic = @nic;

