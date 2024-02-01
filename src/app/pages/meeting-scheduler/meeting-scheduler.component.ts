import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CalendarEvent } from 'angular-calendar';
import { MatDialog } from '@angular/material/dialog';

interface Meeting {
  doctor: string;
  patient: string;
  date: Date;
}

@Component({
  selector: 'app-meeting-scheduler',
  templateUrl: './meeting-scheduler.component.html',
})
export class MeetingSchedulerComponent implements OnInit {
  meetingForm!: FormGroup;
  meetings: Meeting[] = [];
  displayedColumns: string[] = ['doctor', 'patient', 'date'];
  events: CalendarEvent[] = [];
  viewDate: Date = new Date();

  
  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    console.log('Clicked day', date);
    // Here you can open a dialog or form to schedule a new meeting
  }

  eventClicked(event: CalendarEvent): void {
    console.log('Clicked event', event);
    // Here you can open a dialog or form to view or edit the clicked meeting
  }
  constructor(private formBuilder: FormBuilder, private dialog: MatDialog) { }

  ngOnInit() {
    this.meetingForm = this.formBuilder.group({
      doctor: ['', Validators.required],
      patient: ['', Validators.required],
      date: ['', Validators.required]
    });
  }

  scheduleMeeting() {
    if (this.meetingForm.valid) {
      const meeting: Meeting = this.meetingForm.value;
      this.meetings.push(meeting);

      // Add the meeting as a calendar event
      this.events.push({
        start: new Date(meeting.date),
        title: `Meeting with Dr. ${meeting.doctor} and ${meeting.patient}`
      });

      this.meetingForm.reset();
    }
  }

}
