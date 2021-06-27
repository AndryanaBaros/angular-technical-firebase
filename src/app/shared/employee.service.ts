import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { FormGroup, FormControl, Validators} from '@angular/forms'
import { group } from '@angular/animations';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { DatePipe } from '@angular/common';
// import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private firebase: AngularFireDatabase, private datePipe: DatePipe) { }

  employeeList: AngularFireList<any>;

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    userName: new FormControl('' ,[Validators.required, Validators.minLength(8)]),
    firstName: new FormControl('',Validators.required),
    lastName: new FormControl('',Validators.required),
    email: new FormControl('', Validators.email),
    birthDate: new FormControl('',Validators.required),
    basicSallary: new FormControl(''),
    status: new FormControl(''),
    group: new FormControl('0'),
  });

  initializeFormGroup(){
    this.form.setValue({
      $key: null,
      userName: '',
      firstName: '',
      lastName: '',
      email: '',
      birthDate: '',
      basicSallary: '',
      status: '',
      group: '',
    })
  }
  

  getEmployees() {
    this.employeeList = this.firebase.list('employees');
    return this.employeeList.snapshotChanges();
  }

  insertEmployee(employee){
    this.employeeList.push({
      userName: employee.userName,
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
      birthDate: employee.birthDate == "" ? "" : this.datePipe.transform(employee.birthDate, 'yyyy-MM-dd'),
      basicSallary: employee.basicSallary,
      status: employee.status,
      group: employee.group,
    })
  }
  updateEmployee(employee) {
    this.employeeList.update(employee.$key,{
      userName: employee.userName,
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
      birthDate: employee.birthDate == "" ? "" : this.datePipe.transform(employee.birthDate, 'yyyy-MM-dd'),
      basicSallary: employee.basicSallary,
      status: employee.status,
      group: employee.group,
    })
  }

  deleteEmployee($key: string) {
    this.employeeList.remove($key);
  }

  populateForm(employee) {
    this.form.setValue(employee);
  }

}