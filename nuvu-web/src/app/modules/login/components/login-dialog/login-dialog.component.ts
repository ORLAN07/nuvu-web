import {Component, Inject, Injectable, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

export interface DialogLoginData {
  isLogin: boolean;
}

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent implements OnInit {

  isLogin: boolean = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: DialogLoginData,
    public dialogRef: MatDialogRef<LoginDialogComponent>) {}

  ngOnInit(): void {
    this.isLogin = this.dialogData.isLogin;
  }

  onClose(): void {
    this.dialogRef.close();
  }

}
