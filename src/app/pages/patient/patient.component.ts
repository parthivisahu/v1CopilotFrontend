import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Patient } from 'src/app/interfaces/patient';
import { PatientService } from 'src/app/services/patient.service';
import { MatDialog } from '@angular/material/dialog';
import { PatientDialogComponent } from 'src/app/components/patient-dialog/patient-dialog.component';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'email', 'gender', 'phone', 'bloodGroup', 'age','injuryDepartment', 'options'];
  dataSource = new MatTableDataSource<Patient>([]);
  patients: Patient[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(public dialog: MatDialog, private patientService: PatientService, private snackBar: MatSnackBar, private router: Router, private route: ActivatedRoute, private http:HttpClient) { }

  ngOnInit(): void {
    this.patientService.getPatients().subscribe(data => {
      this.dataSource.data = data;
      
      const id = this.route.snapshot.paramMap.get('id');
      this.patientService.getPatients().subscribe(patient => this.patients = patient);
    
    });
  }


  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addPatient(): void {
    const dialogRef = this.dialog.open(PatientDialogComponent, {
      width: '350px',
      data: {
        id: 0,
        image: '',
        name: '',
        email: '',
        assignedDoctor: '',
        dob: new Date(),
        phoneNumber: '',
        bloodGroup: '',
        balanceDue: 0
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.patients.push(result);
      }
    });
  }

  editPatient(patient: Patient): void {
    const index = this.patients.findIndex(p => p.id === patient.id);
    if (index !== -1) {
      this.patients[index] = patient;
    }
  }

  viewPatientDetails(patient: { id: any; }) {
    this.router.navigate(['/patient-details', patient.id]);
  }

  deletePatient(id: string): void {
    const index = this.patients.findIndex(p => p.id === id);
    if (index !== -1) {
      this.patients.splice(index, 1);
    }
  }

  viewInvoice(patient: Patient): void {
    console.log(`Invoice for patient ${patient.id}`);
    // View the patient's invoice here
  }
  printPatients(): void {
    window.print();
  }
  
}