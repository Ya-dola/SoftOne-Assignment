import { Component, Inject, OnInit } from '@angular/core';
import { Student } from './student';
// import { StudentService } from './student.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-student-grid',
  templateUrl: './student-grid.component.html',
  styleUrls: ['./student-grid.component.css'],
})
export class StudentGridComponent implements OnInit {
  students: Student[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<Student[]>('Student').subscribe(
      (response) => {
        this.students = response;

        console.log(response);
      },
      (error) => {
        console.error('Error fetching students:', error);
      },
    );
  }

  // constructor(private studentService: StudentService) {}

  // ngOnInit() {
  //   this.students = this.studentService.getStudents();
  // }

  // getLocalStudents() {
  //   this.localStudents = [
  //     {
  //       firstName: 'Ya',
  //       lastName: 'Dola',
  //       mobile: '1234567890',
  //       email: 'ya_dola@example.com',
  //       nic: '123456789V',
  //     },
  //     {
  //       firstName: 'Jane',
  //       lastName: 'Doe',
  //       mobile: '9876543210',
  //       email: 'jane.doe@example.com',
  //       nic: '234567890W',
  //     },
  //   ];
  // }
}
