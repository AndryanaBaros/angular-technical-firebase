import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EmployeeListComponent } from './shared/components/employee-list/employee-list.component';
import { AddEmployeeComponent } from './shared/components/add-employee/add-employee.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './shared/auth/auth.guard';
import { RegisterComponent } from './register/register.component';
import { AngularFireAuthGuard,redirectLoggedInTo,redirectUnauthorizedTo  } from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
  {path: "login", component: LoginComponent},
  { path: "", component: HomeComponent , canActivate: [AngularFireAuthGuard],data: { authGuardPipe: redirectUnauthorizedToLogin}},
  { path: "register",  component: RegisterComponent}
  
  // { path: '', redirectTo: 'login', pathMatch: 'full' }

  // { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  // { path: 'login', component: LoginComponent },
  // { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
