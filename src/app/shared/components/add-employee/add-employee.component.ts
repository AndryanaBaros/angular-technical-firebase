import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../employee.service';
import { NotificationService } from '../../notification.service';
import { Router } from '@angular/router';
import { MatDialogRef} from '@angular/material/dialog'

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {

  constructor(public service: EmployeeService, public notificationService: NotificationService, private router: Router, public dialogRef: MatDialogRef<AddEmployeeComponent>) { }

  Groups = [
    {id:1 , value: 'Group 1'},
    {id:2 , value: 'Group 2'},
    {id:3 , value: 'Group 3'}
  ]

  Status = [
    {id:1 , value: 'Permanent'},
    {id:2 , value: 'Contract'},
    
  ]

 
  ngOnInit(): void {
    this.service.getEmployees();
  }

  onClear(){
    this.service.form.reset();
    this.service.initializeFormGroup();
  }

  onSubmit(){
    if (this.service.form.valid){
      if(!this.service.form.get('$key')?.value)
      this.service.insertEmployee(this.service.form.value);
      else
      this.service.updateEmployee(this.service.form.value);
      this.service.form.reset();
      this.service.initializeFormGroup();
      this.notificationService.success('Submitted Successfully')
      this.router.navigate(['/list']);
      this.onClose();
    }
  }

  onClose() {
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.dialogRef.close();
  }

}
