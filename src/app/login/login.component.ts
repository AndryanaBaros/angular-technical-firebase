import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../shared/auth/auth.service';
import { NgForm }   from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup

  error: { name: string, message: string } = { name: '', message: '' }; // for firbase error handle

  constructor(private fb: FormBuilder, private auth: AngularFireAuth, public router: Router, public notificationService: NotificationService) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
  }

  onLogin(){
    const {email, password} = this.loginForm.value
    this.auth.signInWithEmailAndPassword(email,password).then(() => this.router.navigate(['']))
    .catch(_error => {
      this.notificationService.error(this.error.message);
    //       this.error = _error
    //       this.router.navigate(['/login'])
    })
  }
  
}