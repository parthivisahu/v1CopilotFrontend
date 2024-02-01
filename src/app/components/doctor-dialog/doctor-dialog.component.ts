import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  image: string;
  name:string
  email: string;
  phone: string;
  address: string;
  city: string;
  qualification: string;
  department: string;
}

@Component({
  selector: 'app-doctor-dialog',
  template: `
    <h1 mat-dialog-title>Edit Doctor</h1>
    <div mat-dialog-content>
      <mat-form-field>
        <mat-label>Email</mat-label>
        <input matInput [(ngModel)]="data.email">
      </mat-form-field>
      <mat-form-field>
        <mat-label>Name</mat-label>
        <input matInput [(ngModel)]="data.name">
      </mat-form-field>
      <mat-form-field>
        <mat-label>Phone</mat-label>
        <input matInput [(ngModel)]="data.phone">
      </mat-form-field>
      <mat-form-field>
        <mat-label>Address</mat-label>
        <input matInput [(ngModel)]="data.address">
      </mat-form-field>
      <mat-form-field>
        <mat-label>City</mat-label>
        <input matInput [(ngModel)]="data.city">
      </mat-form-field>
      <mat-form-field>
        <mat-label>Qualification</mat-label>
        <input matInput [(ngModel)]="data.qualification">
      </mat-form-field>
      <mat-form-field>
        <mat-label>Department</mat-label>
        <input matInput [(ngModel)]="data.department">
      </mat-form-field>
      <!-- Add more fields for the other properties -->
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">Cancel</button>
      <button mat-button [mat-dialog-close]="data" cdkFocusInitial>Save</button>
    </div>
  `,
    styleUrls: ['./doctor-dialog.component.scss'],
})

export class DoctorDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DoctorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}