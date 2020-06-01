import { Component, OnInit } from '@angular/core';
import { Student } from '../generic.model';
import { Subscription } from 'rxjs';
import { GenericService } from '../generic.service';

@Component({
  selector: 'app-total-grade',
  templateUrl: './total-grade.component.html',
  styleUrls: ['./total-grade.component.css']
})
export class TotalGradeComponent implements OnInit {
  approved = [];
  reprobate = [];
  pendings = [];
  gradeAproved = 7;
  titleAproved = 'Lista de Aprovados';
  msgAproved = 'No hay estudiantes aprovados';
  titleReprobate = 'Lista de Reprobados';
  msgReprobate = 'No hay estudiantes reprobados';
  titlePending = 'Lista de Pendientes';
  msgPending = 'No hay estudiantes pendientes';
  private studentsSub: Subscription;
  constructor(public genericService: GenericService) { }

  ngOnInit() {
    this.genericService.getStudents();
    this.studentsSub = this.genericService.getStudentUpdateListener()
      .subscribe((students: Student[]) => {
        students.map(obj => {
          if(obj.test && obj.task) {
            const grade = ( parseInt(obj.test)+parseInt(obj.task)) / 2;
            if ( grade >= this.gradeAproved ) {
              this.approved.push(obj);
            } else {
              this.reprobate.push(obj)
            }
          } else {
            this.pendings.push(obj);
          }
        })
    });

  }

}
