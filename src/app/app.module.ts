import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './shared/components/navigation/header/header.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SidenavComponent } from './shared/components/navigation/sidenav/sidenav.component';
import { MaterialModule } from './shared/material/material.module';
import { HomeComponent } from './home/home.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AddEmployeeComponent } from './shared/components/add-employee/add-employee.component';
import { EmployeeService } from './shared/employee.service';
import { EmployeeListComponent } from './shared/components/employee-list/employee-list.component';
import { AngularFirestoreModule} from '@angular/fire/firestore'
import { DatePipe } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatConfirmDialogComponent } from './shared/components/mat-confirm-dialog/mat-confirm-dialog.component';
import { LoginComponent } from './login/login.component';

import { AngularFireAuthModule } from "@angular/fire/auth"
import { AuthService } from './shared/auth/auth.service';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavComponent,
    HomeComponent,
    AddEmployeeComponent,
    EmployeeListComponent,
    MatConfirmDialogComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    MatDialogModule,
    // AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
  ],
  providers: [EmployeeService, DatePipe, AuthService],
  bootstrap: [AppComponent],
  entryComponents: [AddEmployeeComponent, MatConfirmDialogComponent],
})
export class AppModule { }
