import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar'

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor( public snackBar: MatSnackBar) { }

  config: MatSnackBarConfig = {
    duration: 3000,
    horizontalPosition: 'right',
    verticalPosition: 'bottom'
  }

  success(msg) {
    this.config['panelClass'] = ['noticication', 'success']
    this.snackBar.open(msg, '', this.config)
  }

  warn(msg) {
    this.config['panelClass'] = ['notification', 'warn'];
    this.snackBar.open(msg, '', this.config);
  }

  error(msg) {
    this.config['panelClass'] = ['noticication', 'error']
    this.snackBar.open(msg, '', this.config)
  }
}
