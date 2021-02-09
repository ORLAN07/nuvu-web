import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserModel} from '../../../../domains/login/model/user.model';
import {UserService} from '../../../../domains/login/services/user.service';
import {ObjectUserSecurityModel} from '../../../../domains/login/model/object-user-security.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              private userService: UserService) { }

  loginFormGroup: FormGroup = this.formBuilder.group({
    userName: [, Validators.required],
    password: [, Validators.required]
  });

  ngOnInit(): void {
  }

  onLogin(): void {
    const user: UserModel = new UserModel();
    user.userName = this.loginFormGroup.get('userName').value;
    user.password = this.loginFormGroup.get('password').value;
    this.userService.login(user).subscribe(
      (userSecurityModel: ObjectUserSecurityModel) => {
        console.log('user>>', userSecurityModel);
        localStorage.setItem('token', userSecurityModel.token);
      }
    );
  }

  onRegister(): void {
    const user: UserModel = new UserModel();
    user.userName = this.loginFormGroup.get('userName').value;
    user.password = this.loginFormGroup.get('password').value;
    this.userService.register(user).subscribe(
      (userResponse: UserModel) => {
        console.log('user>>', userResponse);
      }
    );
  }

}
