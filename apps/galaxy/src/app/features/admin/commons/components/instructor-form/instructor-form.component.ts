import { Component, Output, EventEmitter, Input, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { InstructorRequest } from '@galaxy/commons/models';
import { Instructor } from '@galaxy/commons/models';

@Component({
  selector: 'app-instructor-form',
  templateUrl: './instructor-form.component.html',
  styleUrls: ['./instructor-form.component.scss']
})
export class InstructorFormComponent implements OnInit, OnChanges {

@Input() instructor : Instructor;
@Output() save: EventEmitter<InstructorRequest> = new EventEmitter<InstructorRequest>();
form: FormGroup;
private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


get nameField() {
  return this.form.get('name') as FormControl;
}

get nameErrors() {
  if (this.nameField.hasError('required')) {
    return 'Este campo es requerido';
  }
  return '';
}

  constructor( private fb: FormBuilder ) {

    this.form = this.fb.group({
      fullName: ['',Validators.required],
      mail:    ['', [Validators.required, Validators.pattern(this.emailPattern)]]
    })
  }

  ngOnInit(): void {
    console.log(this.instructor);
  }

  ngOnChanges(changes: SimpleChanges){

    if(changes.instructor?.currentValue){
      this.updateFormValues(changes.instructor.currentValue)
    }
  }

  updateFormValues(instructor: Instructor){
    this.form.patchValue({
      fullName: instructor.fullName,
      mail: instructor.mail
    })
  }

  send(){
    if(this.form.valid){
      console.log(this.form.value)
      this.save.emit(this.form.value);
    }
  }

}
