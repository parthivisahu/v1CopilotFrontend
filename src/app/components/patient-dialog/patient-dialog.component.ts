import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Patient } from 'src/app/interfaces/patient';
import { PatientService } from 'src/app/services/patient.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-patient-dialog',
  template: `
    <h1 mat-dialog-title>Patient's Info</h1>
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
        <mat-label>Blood Group</mat-label>
        <input matInput [(ngModel)]="data.bloodGroup">
      </mat-form-field>
      <mat-form-field>
        <mat-label>Gender</mat-label>
        <input matInput [(ngModel)]="data.gender">
      </mat-form-field>
      <mat-form-field>
        <mat-label>Department</mat-label>
        <input matInput [(ngModel)]="data.injuryDepartment">
      </mat-form-field>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">Cancel</button>
      <button mat-button (click)="savePatient()" cdkFocusInitial>Save</button>
    </div>
  `,
  
  styleUrls: ['./patient-dialog.component.scss']
})
export class PatientDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<PatientDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Patient,
    private patientService: PatientService,
    private snackBar: MatSnackBar) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  savePatient(): void {
    this.patientService.addPatient(this.data).subscribe(() => {
      this.snackBar.open('Patient added', 'Close', {
        duration: 2000,
      });
      this.dialogRef.close(this.data);
    });
  }
}