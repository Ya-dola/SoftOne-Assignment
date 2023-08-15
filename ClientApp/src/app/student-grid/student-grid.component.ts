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
  editingStudents: { [key: string]: Student } = {}; // Object to hold duplicate students for editing
  selectedImage: File | null = null;
  creatingStudent: boolean = false;
  // Sorting
  sortedStudents: Student[] = [];
  sortField: string = 'nic';
  sortDirection: 'asc' | 'desc' = 'asc';
  // Searching
  searchQuery: string = '';
  filteredStudents: Student[] = [];
  // Pagination
  currentPage: number = 1;
  pageSize: number = 4;
  totalRecords: number = 0;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.sortDirection = 'desc';
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

        // Apply search filter initially onto sortedStudents
        this.applySearchFilter();

        // Update the totalRecords
        this.totalRecords = this.filteredStudents.length;

        // Display First Page
        this.applyPagination();

        console.log('Students Fetched', response);
      },
      (error) => {
        console.error('Error fetching students:', error);
      },
    );
  }

  createNewStudent() {
    this.creatingStudent = true;
    this.resetFormNewStudent();
  }

  createStudent() {
    const formData = new FormData();

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
        this.resetComponentState(); // Reset the component's state
      },
      (error) => {
        console.error('Error creating student:', error);
      },
    );
  }

  cancelCreate() {
    this.creatingStudent = false;
    this.resetFormNewStudent();
  }

  resetFormNewStudent() {
    this.newStudent = new Student('', '', '', new Date(), '', '', '', '', ''); // Reset form fields
  }

  editStudent(student: Student) {
    student.showDetails = false;
    student.editing = true;
    student.dobString = this.formatDobString(student.dateOfBirth);
    this.createEditingStudent(student); // Create a duplicate of the student for editing
  }

  createEditingStudent(student: Student) {
    this.editingStudents[student.nic] = { ...student };
  }

  cancelEdit(student: Student) {
    student.editing = false;
    delete this.editingStudents[student.nic];
  }

  updateStudent(student: Student) {
    const editingStudent = this.editingStudents[student.nic]; // Use the duplicate student

    if (editingStudent) {
      const formData = new FormData();
      formData.append('nic', editingStudent.nic);
      formData.append('firstName', editingStudent.firstName);
      formData.append('lastName', editingStudent.lastName);
      formData.append('dobString', JSON.stringify(editingStudent.dobString));
      formData.append('email', editingStudent.email);
      formData.append('mobile', editingStudent.mobile);
      formData.append('address', editingStudent.address);

      if (this.selectedImage) {
        formData.append('profileImg', this.selectedImage);
      }

      this.http.post(`Student/${editingStudent.nic}`, formData).subscribe(
        () => {
          console.log('Student updated successfully');
          editingStudent.editing = false;
          this.selectedImage = null;
          delete this.editingStudents[student.nic];
          // this.resetComponentState(); // Reset the component's state
          window.location.reload(); // Reload Webpage to show Updated Images
        },
        (error) => {
          console.error('Error updating student:', error);
        },
      );
    }
  }

  resetComponentState() {
    this.newStudent = new Student('', '', '', new Date(), '', '', '', '', '');
    this.students = [];
    this.selectedImage = null;
    this.creatingStudent = false;
    this.sortDirection = 'desc';
    this.searchQuery = '';
    this.filteredStudents = [];
    this.sortedStudents = [];
    this.fetchStudents();
  }

  deleteStudent(student: Student) {
    student.showDetails = false;
    const confirmDelete = confirm(
      `Are you sure you want to delete Student: \n` +
        `Name: \"${student.firstName} ${student.lastName}\" \n` +
        `NIC: \'${student.nic}\' ?`,
    );
    if (!confirmDelete) {
      return;
    }

    this.http.delete(`Student/${student.nic}`).subscribe(
      () => {
        console.log('Student deleted successfully');
        this.resetComponentState(); // Reset the component's state
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

  sortStudents(field: string) {
    // Toggle sort direction if the same field is clicked again
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc'; // Default to ascending order for the selected field
    }

    // Sort filtered students based on the selected field and direction
    this.sortedStudents = [...this.filteredStudents].sort((a, b) => {
      // if (field === 'dateOfBirth') {
      //   const dateA = new Date(a[field]).getTime();
      //   const dateB = new Date(b[field]).getTime();
      //   return this.sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
      // } else {
      return this.sortDirection === 'asc'
        ? a[field].localeCompare(b[field])
        : b[field].localeCompare(a[field]);
      // }
    });

    this.filteredStudents = [...this.sortedStudents];

    this.applyPagination(); // Apply pagination after sorting
  }

  applySearchFilter() {
    if (this.searchQuery) {
      const lowerCaseSearchQuery = this.searchQuery.toLowerCase();
      this.filteredStudents = this.students.filter(
        (student) =>
          student.firstName.toLowerCase().includes(lowerCaseSearchQuery) ||
          student.lastName.toLowerCase().includes(lowerCaseSearchQuery) ||
          student.mobile.includes(this.searchQuery) ||
          student.email.toLowerCase().includes(lowerCaseSearchQuery) ||
          student.nic.toLowerCase().includes(lowerCaseSearchQuery),
      );
    } else {
      this.filteredStudents = [...this.students];
    }
    this.sortStudents(this.sortField);
  }

  searchStudents() {
    this.applySearchFilter();
    this.totalRecords = this.filteredStudents.length;
  }

  toggleDetails(student: Student) {
    student.showDetails = !student.showDetails;
  }

  applyPagination() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.sortedStudents = this.filteredStudents.slice(startIndex, endIndex);
  }

  nextPage() {
    if (this.currentPage < this.getTotalPages()) {
      this.currentPage++;
      this.applyPagination();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.applyPagination();
    }
  }

  getTotalPages(): number {
    return Math.ceil(this.totalRecords / this.pageSize);
  }

  getSortArrowClass(field: string): string {
    if (this.sortField === field) {
      return this.sortDirection === 'asc' ? 'up-arrow' : 'down-arrow';
    }
    return '';
  }
}
