// import { Inject, Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Student } from './student';
//
// @Injectable({
//   providedIn: 'root',
// })
// export class StudentService {
//   constructor(private http: HttpClient) {}
//
//   getStudents(@Inject('BASE_URL') baseurl: string) {
//     return this.http.get<Student[]>(baseurl + '/api/students').subscribe(
//       (result) => {
//         this.students = result;
//       },
//       (error) => console.error(error),
//     );
//   }
// }
