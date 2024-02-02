import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { FullCalendarComponent } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import { HttpClient } from '@angular/common/http';
import { DoctorService } from 'src/app/services/doctor.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-meeting-scheduler',
  templateUrl: './meeting-scheduler.component.html',
  styleUrls: ['./meeting-scheduler.component.scss']
})
export class MeetingSchedulerComponent implements OnInit {
  public form!: FormGroup;
  public calendarOptions: any;
  doctors: string[] = [];

  constructor(private http: HttpClient,private fb: FormBuilder, private doctorService: DoctorService, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.form = this.fb.group({
      doctor: '',
      patient: '',
      startTime: '',
      endTime: ''
    });

    this.doctorService.getDoctors().subscribe((doctors: string[]) => {  // Use the service to get the doctors' names
      this.doctors = doctors;
    });

    this.http.get<any[]>('https://localhost:44313/api/appointments').subscribe((appointments: any[]) => {
      this.calendarOptions.events = appointments.map(appointment => ({
        title: `Meeting with Dr. ${appointment.doctor} and patient ${appointment.patient}`,
        start: appointment.startTime,
        end: appointment.endTime,
        backgroundColor: appointment.doctor === 'Dr. Smith' ? 'green' : 'blue'
      }));
    }),

    this.calendarOptions = {
      plugins: [dayGridPlugin],
      initialView: 'dayGridMonth',
      events: [],
      eventContent: function(arg:any) {
        let html = `
          <div class='my-custom-event'>
            <div class='my-custom-event-title'>${arg.event.title}</div>
            <div class='my-custom-event-time'>${arg.timeText}</div>
          </div>
        `;
        return { html };
      },
      eventClick: (clickInfo:any) => {
        // You can handle the click event here
        // For example, you can show a confirmation dialog to delete the event
        if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
          this.deleteEvent(clickInfo.event.id);
          clickInfo.event.setProp('backgroundColor', 'red');
        }
      }
    };
  }
  addEvent(eventData: any) {
      return this.http.post('https://localhost:44313/api/appointments', eventData);
    }

  onSubmit() {
    const data = this.form.value;
    

    this.addEvent(this.form.value).subscribe(() => {
      this.snackBar.open('Event added successfully', 'Close', {
        duration: 2000,
      });

    this.http.post('https://localhost:44313/api/appointments', data).subscribe(() => {
      this.calendarOptions.events = [
        ...this.calendarOptions.events,
        {
          title: `Meeting with Dr. ${data.doctor} and patient ${data.patient}`,
          start: data.startTime,
          end: data.endTime,
          backgroundColor: data.doctor === 'Dr. Smith' ? 'green' : 'blue'
        }
        
      ];
      
      this.form.reset();
    });
    
  }
  );
  }
  updateEvent(id: string, updatedData: any) {
    const eventIndex = this.calendarOptions.events.findIndex((event: { id: string; })  => event.id === id);
    if (eventIndex > -1) {
      this.calendarOptions.events[eventIndex] = {
        ...this.calendarOptions.events[eventIndex],
        ...updatedData
      };
    }
  }
  
  // Delete an event
  deleteEvent(id: string) {
    const eventIndex = this.calendarOptions.events.findIndex((event: { id: string; }) => event.id === id);
    if (eventIndex > -1) {
      this.calendarOptions.events.splice(eventIndex, 1);
    }
  }
}