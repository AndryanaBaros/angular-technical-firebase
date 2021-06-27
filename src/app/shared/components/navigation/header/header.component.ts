import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() isLogout = new EventEmitter<void>()

  @Output() public sidenavToggle = new EventEmitter();
  constructor(public auth: AngularFireAuth, public router: Router) { }

  ngOnInit(): void {
  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }

  onLogout(){
    this.auth.signOut().then(() => this.router.navigate(['login']));
  }
}
