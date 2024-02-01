import { Component, OnInit, ViewChild,AfterViewInit } from '@angular/core';
import { DoctorService } from 'src/app/services/doctor.service';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { Doctor } from 'src/app/interfaces/doctor';
import { MatDialog } from '@angular/material/dialog';
import { DoctorDialogComponent } from 'src/app/components/doctor-dialog/doctor-dialog.component';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss']
})
export class DoctorComponent implements OnInit,AfterViewInit {
  dataSource = new MatTableDataSource<Doctor>([]);
  doctors:Doctor[] = [];
  displayedColumns: string[] = ['image','name','email','phone','address','city','qualification','department', 'options'];
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private doctorService: DoctorService, public dialog: MatDialog,private snackBar: MatSnackBar) { }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  ngOnInit(): void {
    this.doctorService.getDoctors().subscribe(data => {
      this.doctors = data;
      this.dataSource = new MatTableDataSource<Doctor>(this.doctors);
      this.dataSource.paginator = this.paginator;
    });
  }

  editDoctor(id: number): void {
    // Get the doctor to be edited
    const doctorToEdit = this.doctors.find(doctor => doctor.id === id);
  
    // Open the dialog
    const dialogRef = this.dialog.open(DoctorDialogComponent, {
      width: '350px',
      data: doctorToEdit
    });
  
    // Handle the result when the dialog is closed
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.doctorService.editDoctor(id, result).subscribe(updatedDoctor => {
          // Update the doctor in the doctors array
          const index = this.doctors.findIndex(doctor => doctor.id === id);
          this.doctors[index] = updatedDoctor;
          this.dataSource.data = this.doctors;
        });
        this.snackBar.open('Item edited', '', { duration: 2000 });
      }
    });
    // Show the snackbar
  
  }

  deleteDoctor(id: number): void {
    this.doctorService.deleteDoctor(id).subscribe(() => {
      // Remove the doctor from the doctors array
      this.doctors = this.doctors.filter(doctor => doctor.id !== id);
      // Update the dataSource.data
      this.dataSource.data = this.doctors;
      this.snackBar.open('Item deleted', '', { duration: 2000 });
    });
  }

  applyFilter(event:Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
}

  printDoctors(): void {
    window.print();
  }
}

