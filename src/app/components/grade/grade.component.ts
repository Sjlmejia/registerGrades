import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { GenericService } from '../generic.service';

@Component({
  selector: 'app-grade',
  templateUrl: './grade.component.html',
  styleUrls: ['./grade.component.css']
})
export class GradeComponent implements OnInit {
  private id: string;
  form: FormGroup;
  constructor(public route: ActivatedRoute, public genericService: GenericService) { }

  ngOnInit() {
    this.form = new FormGroup({
      task: new FormControl(null, {
        validators: [Validators.required]
      }),
      test: new FormControl(null, {
        validators: [Validators.required]
      }),
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = paramMap.get('id');
    });
  }
  onSaveGrade() {
    console.log('se guardo attend');
    if (this.form.invalid) {
      return;
    }
    this.genericService.addGrade(this.form.value.task, this.form.value.test, this.id);

    this.form.reset();
  }

}
