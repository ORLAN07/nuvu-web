import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserModel} from '../../../../domains/login/model/user.model';
import {UserService} from '../../../../domains/login/services/user.service';
import {ObjectUserSecurityModel} from '../../../../domains/login/model/object-user-security.model';
import {Router} from '@angular/router';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {LoginDialogComponent} from '../login-dialog/login-dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private router: Router,
              public dialog: MatDialog) { }

  loginFormGroup: FormGroup = this.formBuilder.group({
    userName: [, Validators.required],
    password: [, Validators.required]
  });

  ngOnInit(): void {
    this.validateSession();
  }

  validateSession(): void {
    const token = localStorage.getItem('token');
    if (token === undefined) {
      this.router.navigate(['/login']);
    }
  }

  onLogin(): void {
    const user: UserModel = new UserModel();
    user.userName = this.loginFormGroup.get('userName').value;
    user.password = this.loginFormGroup.get('password').value;
    this.userService.login(user).subscribe(
      (userSecurityModel: ObjectUserSecurityModel) => {
        console.log('user>>', userSecurityModel);
        localStorage.setItem('token', userSecurityModel.token);
        if (userSecurityModel.token !== undefined) {
          this.router.navigate(['/client']);
        }
      }
    );
  }

  onRegister(): void {
    const user: UserModel = new UserModel();
    user.userName = this.loginFormGroup.get('userName').value;
    user.password = this.loginFormGroup.get('password').value;
    this.userService.register(user).subscribe(
      (userResponse: UserModel) => {
        if (userResponse === null || userResponse === undefined) {
          const dialogRef: MatDialogRef<LoginDialogComponent> = this.dialog.open(LoginDialogComponent);
        } else {

        }
        console.log('user>>', userResponse);
      }
    );
  }

}
