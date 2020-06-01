import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GenericService } from '../generic.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  form: FormGroup;
  constructor(public genericService: GenericService ) { }

  ngOnInit() {
    this.form = new FormGroup({
      firstName: new FormControl(null, {
        validators: [Validators.required]
      }),
      lastName: new FormControl(null, {
        validators: [Validators.required]
      }),
    });
  }
  onSaveStudent() {
    console.log('se guardo');
    if (this.form.invalid) {
      return;
    }
    this.genericService.addStudent(this.form.value.firstName, this.form.value.lastName);
    this.form.reset();
  }
}
