import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { DoctorComponent } from './pages/doctor/doctor.component';
import { PatientComponent } from './pages/patient/patient.component';
import { VideoConferencingComponent } from './pages/video-conferencing/video-conferencing.component';
import { MeetingSchedulerComponent } from './pages/meeting-scheduler/meeting-scheduler.component';
import { BookAppointmentComponent } from './pages/book-appointment/book-appointment.component';
import { PatientDetailsComponent } from './pages/patient-details/patient-details.component';
import { SignupComponent } from './components/signup/signup.component';
import { PaymentComponent } from './pages/payment/payment.component';


const routes: Routes = [
  { path: '',   redirectTo: '/login', pathMatch: 'full'},
  {path:'signup', component: SignupComponent},
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'doctor', component: DoctorComponent },
  { path: 'patient', component: PatientComponent},
  { path : 'video-conferencing', component: VideoConferencingComponent},
  { path: 'meet-scheduler', component: MeetingSchedulerComponent},
  { path: 'book-appointment', component: BookAppointmentComponent },
  { path: 'patient-details/:id', component: PatientDetailsComponent },
  {path:'payment', component: PaymentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }