import { Component, OnInit } from '@angular/core';
import { Student } from './student';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-student-grid',
  templateUrl: './student-grid.component.html',
  styleUrls: ['./student-grid.component.css'],
})
export class StudentGridComponent implements OnInit {
  newStudent: Student = new Student('', '', '', new Date(), '', '', '', '', '');
  students: Student[] = [];
  editingStudent: Student | null = null;
  selectedImage: File | null = null;
  creatingStudent: boolean = false;
  // Add properties to track sorting
  sortedStudents: Student[] = [];
  sortField: string = 'nic'; // Default sorting field
  sortDirection: 'asc' | 'desc' = 'asc'; // Default sorting direction

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchStudents();
  }

  fetchStudents() {
    this.http.get<Student[]>('Student').subscribe(
      (response) => {
        this.students = response;

        // Add ProfileImg data URLs
        for (const student of this.students) {
          student.profileImgUrl = `Student/GetProfileImage/${student.nic}`;
        }

        // Initialize sortedStudents with students
        this.sortedStudents = [...this.students];

        console.log('Students Fetched', response);
      },
      (error) => {
        console.error('Error fetching students:', error);
      },
    );
  }

  createNewStudent() {
    // Show the create form
    this.creatingStudent = true;
    // Clear any previous data in the create form fields
    this.resetFormNewStudent();
  }

  createStudent() {
    const formData = new FormData();

    // Add new student data fields to the FormData
    formData.append('nic', this.newStudent.nic);
    formData.append('firstName', this.newStudent.firstName);
    formData.append('lastName', this.newStudent.lastName);
    formData.append('dobString', JSON.stringify(this.newStudent.dobString));
    formData.append('email', this.newStudent.email);
    formData.append('mobile', this.newStudent.mobile);
    formData.append('address', this.newStudent.address);

    // Add the selected image to the FormData
    if (this.selectedImage) {
      formData.append('profileImg', this.selectedImage);
    }

    // Make an HTTP POST request to create a new student
    this.http.post(`Student`, formData).subscribe(
      () => {
        console.log('Student created successfully');
        this.cancelCreate();
        this.fetchStudents(); // Refresh the student data
      },
      (error) => {
        console.error('Error creating student:', error);
      },
    );
  }

  cancelCreate() {
    // Hide the create form when canceled
    this.creatingStudent = false;
    // Clear any previous data in the create form fields
    this.resetFormNewStudent();
  }

  resetFormNewStudent() {
    // Clear the fields of the create form
    this.newStudent = new Student('', '', '', new Date(), '', '', '', '', ''); // Reset form fields
  }

  editStudent(student: Student) {
    // Enable editing mode and populate the editingStudent object
    this.editingStudent = { ...student };

    this.editingStudent.dobString = this.formatDobString(
      this.editingStudent.dateOfBirth,
    );
  }

  cancelEdit() {
    // Exit editing mode and revert changes
    this.editingStudent = null;
  }

  updateStudent() {
    if (this.editingStudent) {
      const formData = new FormData();

      // Add student data fields to the FormData
      formData.append('nic', this.editingStudent.nic);
      formData.append('firstName', this.editingStudent.firstName);
      formData.append('lastName', this.editingStudent.lastName);
      formData.append(
        'dobString',
        JSON.stringify(this.editingStudent.dobString),
      );
      formData.append('email', this.editingStudent.email);
      formData.append('mobile', this.editingStudent.mobile);
      formData.append('address', this.editingStudent.address);

      // Add the selected image to the FormData
      if (this.selectedImage) formData.append('profileImg', this.selectedImage);

      // Make an HTTP POST request for JSON data
      this.http
        .post(`Student/${this.editingStudent.nic}`, formData)
        .subscribe(() => {
          console.log('Student updated successfully');
          this.editingStudent = null; // Exit editing mode
          this.fetchStudents(); // Refresh the student data
        });
    }
  }

  deleteStudent(nic: string) {
    const confirmDelete = confirm(
      'Are you sure you want to delete this student?',
    );
    if (!confirmDelete) {
      return;
    }

    this.http.delete(`Student/${nic}`).subscribe(
      () => {
        console.log('Student deleted successfully');
        this.fetchStudents(); // Refresh the student data after deletion
      },
      (error) => {
        console.error('Error deleting student:', error);
      },
    );
  }

  formatDobString(dateString: Date): string {
    let date = new Date(dateString);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);

    return `${year}-${month}-${day}`;
  }

  onFileSelected(event: any) {
    this.selectedImage = event.target.files[0];
  }

  // Add sorting logic
  sortStudents(field: string) {
    // Toggle sort direction if the same field is clicked again
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc'; // Default to ascending order for the selected field
    }

    // Sort students based on the selected field and direction
    this.sortedStudents = [...this.students].sort((a, b) => {
      if (field === 'dateOfBirth') {
        const dateA = new Date(a[field]).getTime();
        const dateB = new Date(b[field]).getTime();
        return this.sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
      } else {
        return this.sortDirection === 'asc'
          ? a[field].localeCompare(b[field])
          : b[field].localeCompare(a[field]);
      }
    });
  }
}
