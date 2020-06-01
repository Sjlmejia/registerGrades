import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Student, Grade } from './generic.model';

@Injectable({providedIn: 'root'})
export class GenericService {
  private students = [];
  private grades: Grade[] = [];
  private studentsUpdated = new Subject<Student[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getStudents() {
    this.http.get<{message: string, students: any}>(
      'http://localhost:3000/api/students')
      .pipe(map((studentsData) => {
        return studentsData.students.map(student => {
          return {
            id: student._id,
            firstName: student.firstName,
            lastName: student.lastName,
            test: student.test,
            task: student.task
          };
        });
      }))
      .subscribe(transformedStudents => {
        this.students = transformedStudents;
        this.studentsUpdated.next([...this.students]);
      });
  }

  getStudentUpdateListener() {
    return this.studentsUpdated.asObservable();
  }

  addStudent(firstName: string, lastName: string) {
    const studentData = {};
    studentData['firstName'] = firstName;
    studentData['lastName'] = lastName;

    this.http.post<{message: string, student: Student}>(
      'http://localhost:3000/api/students',
      studentData
      )
      .subscribe( res => {
        const student = {
          firstName,
          id: res.student.id,
          lastName};
        this.students.push(student);
        this.studentsUpdated.next([...this.students]);
        this.router.navigate(['/']);
      });
  }

  getStudent(id: string) {
    return this.http.get<{_id: string;
    firstName: string;
    lastName: string}>( 'http://localhost:3000/api/students/' + id );
  }

  addGrade( task: string, test: string, id: string) {
  const studentData = {
    id,
    task,
    test,
  };
  this.http.put('http://localhost:3000/api/students/' + id, studentData)
  .subscribe(res => {
    this.router.navigate(['/']);
  });
  }
}
