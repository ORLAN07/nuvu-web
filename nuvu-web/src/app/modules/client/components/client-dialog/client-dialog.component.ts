import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {LoginDialogComponent} from '../../../login/components/login-dialog/login-dialog.component';

@Component({
  selector: 'app-client-dialog',
  templateUrl: './client-dialog.component.html',
  styleUrls: ['./client-dialog.component.css']
})
export class ClientDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<LoginDialogComponent>) {}

  ngOnInit(): void {
  }

  onClose(): void {
    this.dialogRef.close();
  }

}
