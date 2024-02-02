import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component'; // Import RouterModule
import {MatSidenavModule} from '@angular/material/sidenav';
import { AppRoutingModule } from './app-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatTooltipModule} from '@angular/material/tooltip';
import { DoctorComponent } from './pages/doctor/doctor.component';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { DoctorDialogComponent } from './components/doctor-dialog/doctor-dialog.component'; // Import MatDialogModule
import { FormsModule } from '@angular/forms';
import {MatSnackBarModule }from '@angular/material/snack-bar';
import { PatientComponent } from './pages/patient/patient.component';
import { PatientDialogComponent } from './components/patient-dialog/patient-dialog.component';
import { BookAppointmentComponent } from './pages/book-appointment/book-appointment.component';
import { CommonModule } from '@angular/common';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MeetingSchedulerComponent } from './pages/meeting-scheduler/meeting-scheduler.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NavbarComponent } from './components/navbar/navbar.component';
import { VideoConferencingComponent } from './pages/video-conferencing/video-conferencing.component';
import { ContainerComponent } from './components/container/container.component';
import { PatientDetailsComponent } from './pages/patient-details/patient-details.component';
import { SignupComponent } from './signup/signup.component';
import { ScheduleModule, RecurrenceEditorModule } from '@syncfusion/ej2-angular-schedule';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { FullCalendarModule } from '@fullcalendar/angular';
import { MatSelectModule } from '@angular/material/select';
import { PaymentComponent } from './pages/payment/payment.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    DoctorComponent,
    DoctorDialogComponent,
    PatientComponent,
    PatientDialogComponent,
    BookAppointmentComponent,
    MeetingSchedulerComponent,
    NavbarComponent,
    VideoConferencingComponent,
    ContainerComponent,
    PatientDetailsComponent,
    SignupComponent,
    PaymentComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule,
    MatIconModule, 
    MatToolbarModule,
    MatSidenavModule,
    AppRoutingModule,
    FlexLayoutModule,
    MatTooltipModule,
    MatCardModule,
    MatTableModule,
    HttpClientModule,
    MatPaginatorModule,
    MatDialogModule,
    FormsModule,
    MatSnackBarModule,
    MatDialogModule,
    CommonModule,
    ClipboardModule,
    MatIconModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ScheduleModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    RecurrenceEditorModule,
    ButtonModule,
    FullCalendarModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,    
    MatSelectModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }