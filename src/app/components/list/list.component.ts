import { Component, OnInit } from '@angular/core';
import { Student } from '../generic.model';
import { Subscription } from 'rxjs';
import { GenericService } from '../generic.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  students: Student[] = [];
  private studentsSub: Subscription;
  constructor(public genericService: GenericService) { }

  ngOnInit() {
    this.genericService.getStudents();
    this.studentsSub = this.genericService.getStudentUpdateListener()
      .subscribe((students: Student[]) => {
        this.students = students;
    });
  }

  getGrade(test, task) {
    if(test && task ) {
      return (parseInt(test)+parseInt(task)) / 2;
    } else {
      return "el estudiante le falta nota de deberes o examen";
    }
  }
}
