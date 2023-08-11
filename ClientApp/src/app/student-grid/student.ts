export class Student {
  firstName: string;
  lastName: string;
  mobile: string;
  email: string;
  nic: string;

  constructor(
    firstName: string,
    lastName: string,
    mobile: string,
    email: string,
    nic: string,
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.mobile = mobile;
    this.email = email;
    this.nic = nic;
  }
}
