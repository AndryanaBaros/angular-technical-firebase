import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { NotificationService } from '../shared/notification.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm : FormGroup

  error: { name: string, message: string } = { name: '', message: '' }; // for firbase error handle

  constructor(private fb: FormBuilder, private auth: AngularFireAuth, private router : Router, public notificationService: NotificationService) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.min(6)])
    })
  }

  createUser(){
    const {email, password} = this.registerForm.value;
    this.auth.createUserWithEmailAndPassword(email, password).then(user => {
      this.router.navigate([''])
    })
    .catch(_error => {
      this.notificationService.error(this.error.message);
    //       this.error = _error
    //       this.router.navigate(['/login'])
    });
  }

}
