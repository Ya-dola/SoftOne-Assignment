export class Student {
  public nic: string;
  public firstName: string;
  public lastName: string;
  public dateOfBirth: Date;
  public email: string;
  public mobile: string;
  public address: string;
  public profileImg: Uint8Array;

  constructor(
    nic: string,
    firstName: string,
    lastName: string,
    dateOfBirth: Date,
    email: string,
    mobile: string,
    address: string,
    profileImg: Uint8Array,
  ) {
    this.nic = nic;
    this.firstName = firstName;
    this.lastName = lastName;
    this.dateOfBirth = dateOfBirth;
    this.email = email;
    this.mobile = mobile;
    this.address = address;
    this.profileImg = profileImg;
  }
}
