import { Component, OnInit } from '@angular/core';
import { Student } from './student';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-student-grid',
  templateUrl: './student-grid.component.html',
  styleUrls: ['./student-grid.component.css'],
})
export class StudentGridComponent implements OnInit {
  students: Student[] = [];
  editingStudent: Student | null = null;
  selectedImage: File | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchStudents();
  }

  fetchStudents() {
    this.http.get<Student[]>('Student').subscribe(
      (response) => {
        this.students = response;
        console.log('Students Fetched', response);
      },
      (error) => {
        console.error('Error fetching students:', error);
      },
    );
  }

  editStudent(student: Student) {
    // Enable editing mode and populate the editingStudent object
    this.editingStudent = { ...student };
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
        JSON.stringify(this.editingStudent.dateOfBirth),
      );
      formData.append('email', this.editingStudent.email);
      formData.append('mobile', this.editingStudent.mobile);
      formData.append('address', this.editingStudent.address);

      // Add the selected image to the FormData
      if (this.selectedImage) formData.append('profileImg', this.selectedImage);

      console.log(this.selectedImage);

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

  cancelEdit() {
    // Exit editing mode and revert changes
    this.editingStudent = null;
  }

  onFileSelected(event: any) {
    this.selectedImage = event.target.files[0];
  }
}
