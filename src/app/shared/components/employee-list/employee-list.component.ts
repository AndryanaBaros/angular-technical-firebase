import { Component, OnInit,ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { NotificationService } from '../../notification.service';
import { DialogService } from '../../dialog-service.service';
import { EmployeeService } from '../../employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  constructor(private service: EmployeeService,
    private router: Router,
    private dialog: MatDialog,
    private notificationService : NotificationService,
    private dialogService : DialogService) { } 

  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['userName', 'firstName', 'lastName', 'email', 'birthDate', 'basicSallary', 'status', 'group', 'actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;
  
  ngOnInit() {
    this.service.getEmployees().subscribe(
      list => {
        let array = list.map(item => {
          return {
            $key: item.key,
            ...item.payload.val()
          };
        });
        this.listData = new MatTableDataSource(array);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
        // this.listData.filterPredicate = (data, filter) => {
        //   return this.displayedColumns.some(ele => {
        //     return ele != 'actions' && data[ele].toLowerCase().indexOf(filter) != -1;
        //   });
        // };
      });
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter(){
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  btnClick() {
    this.router.navigate(['/create']);
}

onCreate() {
  this.service.initializeFormGroup();
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  dialogConfig.width = "45%";
  dialogConfig.panelClass = 'dialog';
  this.dialog.open(AddEmployeeComponent,dialogConfig);
}

onEdit(row){
  this.service.populateForm(row);
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  dialogConfig.width = "45%";
  dialogConfig.panelClass = 'dialog';
  this.dialog.open(AddEmployeeComponent,dialogConfig);
}

onDelete($key){
  this.dialogService.openConfirmDialog('Are you sure to delete this record ?')
  .afterClosed().subscribe(res => {
    if(res){
      this.service.deleteEmployee($key);
      this.notificationService.warn('! Deleted successfully');
    }
  })
  ;
}

}