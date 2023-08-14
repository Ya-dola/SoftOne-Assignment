export class Student {
  public nic: string;
  public firstName: string;
  public lastName: string;
  public dateOfBirth: Date;
  public email: string;
  public mobile: string;
  public address: string;
  public profileImg: File;
  public profileImgUrl: string;

  constructor(
    nic: string,
    firstName: string,
    lastName: string,
    dateOfBirth: Date,
    email: string,
    mobile: string,
    address: string,
    profileImg: File,
    profileImgUrl: string,
  ) {
    this.nic = nic;
    this.firstName = firstName;
    this.lastName = lastName;
    this.dateOfBirth = dateOfBirth;
    this.email = email;
    this.mobile = mobile;
    this.address = address;
    this.profileImg = profileImg;
    this.profileImgUrl = profileImgUrl;
  }
}
