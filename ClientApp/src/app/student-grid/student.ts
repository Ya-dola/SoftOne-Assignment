export class Student {
  public nic: string;
  public firstName: string;
  public lastName: string;
  public dateOfBirth: Date;
  public dobString: string;
  public email: string;
  public mobile: string;
  public address: string;
  public profileImgUrl: string;
  public showDetails: boolean = false;

  constructor(
    nic: string,
    firstName: string,
    lastName: string,
    dateOfBirth: Date,
    dobString: string,
    email: string,
    mobile: string,
    address: string,
    profileImgUrl: string,
  ) {
    this.nic = nic;
    this.firstName = firstName;
    this.lastName = lastName;
    this.dateOfBirth = dateOfBirth;
    this.dobString = dobString;
    this.email = email;
    this.mobile = mobile;
    this.address = address;
    this.profileImgUrl = profileImgUrl;
  }

  // Add an index signature
  // Allow any property to be accessed using string keys
  [key: string]: any;
}
